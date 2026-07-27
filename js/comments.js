/* ============================================================
   环球手札 — Comments Module (Supabase + localStorage cache)
   ============================================================ */

const CommentsModule = (() => {
  let currentRegionId = null;
  let currentRating = 0;
  let pendingImage = null;
  let supabase = null;
  let isAdmin = false;
  const CACHE_KEY = 'wj_comments_cache';
  const MAX_IMAGE_SIZE = 800;
  const ADMIN_PW = 'Aug31miku3939';

  // --- Admin ---

  function checkAdmin() { return sessionStorage.getItem('wj_admin') === '1'; }
  function setAdmin(v) {
    isAdmin = v;
    if (v) sessionStorage.setItem('wj_admin', '1');
    else sessionStorage.removeItem('wj_admin');
  }

  function initAdminUI() {
    isAdmin = checkAdmin();
    // Hidden trigger button
    const trigger = document.getElementById('admin-trigger');
    const modal = document.getElementById('admin-modal');
    const pwInput = document.getElementById('admin-password');
    const submitBtn = document.getElementById('admin-submit');
    const cancelBtn = document.getElementById('admin-cancel');
    const errorEl = document.getElementById('admin-error');

    if (!trigger || !modal) return;

    trigger.addEventListener('click', () => {
      if (isAdmin) { setAdmin(false); trigger.title = ''; return; }
      modal.classList.add('active');
      if (pwInput) { pwInput.value = ''; pwInput.focus(); }
      if (errorEl) errorEl.textContent = '';
    });

    if (cancelBtn) cancelBtn.addEventListener('click', () => modal.classList.remove('active'));
    if (submitBtn) submitBtn.addEventListener('click', () => {
      if (pwInput && pwInput.value === ADMIN_PW) {
        setAdmin(true);
        modal.classList.remove('active');
        trigger.title = '管理员模式已开启';
        trigger.style.opacity = '0.5';
        if (currentRegionId) render(currentRegionId);
      } else {
        if (errorEl) errorEl.textContent = '密码错误';
      }
    });

    // Enter key to submit
    if (pwInput) pwInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && submitBtn) submitBtn.click();
    });
  }

  async function deleteComment(regionId, index) {
    if (!isAdmin) return;
    const db = getDB();
    if (db) {
      try {
        const { data } = await db.from('comments').select('id').eq('region_id', regionId).order('created_at', { ascending: false });
        if (data && data[index]) {
          await db.from('comments').delete().eq('id', data[index].id);
        }
      } catch(e) { console.warn('Delete failed', e); }
    }
    // Also remove from local cache
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    if (cached[regionId]) { cached[regionId].splice(index, 1); localStorage.setItem(CACHE_KEY, JSON.stringify(cached)); }
  }

  // --- Init Supabase ---

  function getDB() {
    if (supabase) return supabase;
    if (!window.supabase || !window.supabase.createClient) return null;
    if (typeof SUPABASE_URL !== 'undefined' && SUPABASE_URL && typeof SUPABASE_KEY !== 'undefined' && SUPABASE_KEY) {
      try { supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY); } catch(e) { return null; }
    }
    return supabase;
  }

  // --- Storage ---

  // Fetch with timeout
  function fetchWithTimeout(promise, ms) {
    return Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms))]);
  }

  async function getAllComments() {
    const db = getDB();
    if (db) {
      try {
        const { data, error } = await fetchWithTimeout(
          db.from('comments').select('*').order('created_at', { ascending: false }),
          4000
        );
        if (!error && data) {
          const grouped = {};
          data.forEach(row => {
            if (!grouped[row.region_id]) grouped[row.region_id] = [];
            grouped[row.region_id].push({
              text: row.text, rating: row.rating, image: row.image,
              nickname: row.nickname || '', color: row.color, rotation: row.rotation,
              date: new Date(row.created_at).toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' })
            });
          });
          try { localStorage.setItem(CACHE_KEY, JSON.stringify(grouped)); } catch(e) {}
          return grouped;
        }
      } catch(e) { console.warn('Supabase read failed, using cache', e); }
    }
    try { return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}'); } catch(e) { return {}; }
  }

  async function getCommentsForRegion(regionId) {
    const all = await getAllComments();
    return all[regionId] || [];
  }

  async function saveComment(regionId, comment) {
    const db = getDB();
    if (db) {
      try {
        const { error } = await db.from('comments').insert({
          region_id: regionId,
          text: comment.text,
          rating: comment.rating,
          nickname: comment.nickname || '',
          image: comment.image || null,
          color: comment.color,
          rotation: comment.rotation,
          created_at: new Date().toISOString()
        });
        if (!error) return; // Success
      } catch(e) { console.warn('Supabase write failed, using localStorage', e); }
    }
    // Fallback to localStorage
    const all = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    if (!all[regionId]) all[regionId] = [];
    all[regionId].push(comment);
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(all)); } catch(e) {}
  }

  async function getCommentCount(regionId) {
    const comments = await getCommentsForRegion(regionId);
    return comments.length;
  }

  // --- Image compression ---

  function compressImage(dataUrl) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width <= MAX_IMAGE_SIZE && height <= MAX_IMAGE_SIZE) { resolve(dataUrl); return; }
        const ratio = Math.min(MAX_IMAGE_SIZE / width, MAX_IMAGE_SIZE / height);
        width = Math.round(width * ratio); height = Math.round(height * ratio);
        const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.6));
      };
      img.src = dataUrl;
    });
  }

  // --- Render ---

  async function render(regionId) {
    currentRegionId = regionId;
    const container = document.getElementById('notes-container');
    const emptyState = document.getElementById('empty-notes');
    if (!container) return;

    const comments = await getCommentsForRegion(regionId);
    container.innerHTML = '';

    if (comments.length === 0) {
      if (emptyState) emptyState.classList.remove('hidden');
    } else {
      if (emptyState) emptyState.classList.add('hidden');
      comments.forEach((c, i) => {
        container.appendChild(createNoteElement(c, i));
      });
    }
    resetInput();
  }

  function createNoteElement(comment, index) {
    const note = document.createElement('div');
    note.className = 'sticky-note';
    if (isAdmin) note.classList.add('admin-mode');
    note.style.background = comment.color || randomNoteColor();
    note.style.transform = `rotate(${comment.rotation || randomRotation()}deg)`;
    note.style.zIndex = index;

    // Delete button (admin only)
    const delBtn = document.createElement('button');
    delBtn.className = 'note-delete';
    delBtn.innerHTML = '✕';
    delBtn.title = '删除此留言';
    delBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (confirm('确定删除这条留言吗？此操作不可撤销。')) {
        await deleteComment(currentRegionId, index);
        render(currentRegionId);
      }
    });

    const pin = document.createElement('div'); pin.className = 'note-pushpin';
    const stars = document.createElement('div'); stars.className = 'note-stars';
    const r = comment.rating || 0;
    stars.innerHTML = '★'.repeat(r) + '☆'.repeat(5 - r);

    let imageEl = null;
    if (comment.image) {
      imageEl = document.createElement('img');
      imageEl.className = 'note-image'; imageEl.src = comment.image;
      imageEl.alt = '旅人照片'; imageEl.loading = 'lazy';
    }

    const text = document.createElement('div'); text.className = 'note-text'; text.textContent = comment.text;
    const footer = document.createElement('div'); footer.className = 'note-footer';
    const author = document.createElement('span'); author.className = 'note-author';
    author.textContent = '— ' + (comment.nickname || '匿名旅人');
    const date = document.createElement('span'); date.className = 'note-date'; date.textContent = comment.date || '';

    footer.appendChild(author); footer.appendChild(date);
    note.appendChild(delBtn);
    note.appendChild(pin); note.appendChild(stars);
    if (imageEl) note.appendChild(imageEl);
    note.appendChild(text); note.appendChild(footer);

    note.style.opacity = '0';
    note.style.transform = `rotate(${comment.rotation || 0}deg) translateY(-20px)`;
    setTimeout(() => {
      note.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      note.style.opacity = '1';
      note.style.transform = `rotate(${comment.rotation || randomRotation()}deg) translateY(0)`;
    }, 50 + index * 80);

    return note;
  }

  // --- Input Reset ---

  function resetInput() {
    currentRating = 0; pendingImage = null;
    const nn = document.getElementById('note-nickname'); if (nn) nn.value = '';
    const ta = document.getElementById('note-textarea'); if (ta) ta.value = '';
    const hint = document.getElementById('rating-hint'); if (hint) hint.textContent = '';
    const preview = document.getElementById('note-image-preview');
    const removeBtn = document.getElementById('note-image-remove');
    const fileInput = document.getElementById('note-image-input');
    if (preview) { preview.style.display = 'none'; preview.src = ''; }
    if (removeBtn) removeBtn.style.display = 'none';
    if (fileInput) fileInput.value = '';
    updateStarDisplay(0);
  }

  // --- Star Rating ---

  function updateStarDisplay(count) {
    const stars = document.querySelectorAll('#star-rating .star');
    stars.forEach(s => {
      const v = parseInt(s.dataset.star);
      const icon = s.querySelector('.icon');
      if (!icon) return;
      if (v <= count) {
        s.classList.add('active');
        icon.textContent = '★';
      } else {
        s.classList.remove('active');
        icon.textContent = '☆';
      }
    });
  }

  function initStarRating() {
    const sc = document.getElementById('star-rating'); if (!sc) return;
    const stars = sc.querySelectorAll('.star');

    stars.forEach(star => {
      star.addEventListener('mouseenter', () => {
        const v = parseInt(star.dataset.star);
        stars.forEach(s => {
          if (parseInt(s.dataset.star) <= v) s.classList.add('hover');
        });
      });
      star.addEventListener('mouseleave', () => {
        stars.forEach(s => s.classList.remove('hover'));
      });
      star.addEventListener('click', () => {
        currentRating = parseInt(star.dataset.star);
        try { SoundFX.starClick(); } catch(e) {}
        updateStarDisplay(currentRating);
        const hint = document.getElementById('rating-hint');
        if (hint) hint.textContent = '你给了 ' + currentRating + ' 颗星';
      });
    });
  }

  // --- Image Upload ---

  function initImageUpload() {
    const fi = document.getElementById('note-image-input');
    const preview = document.getElementById('note-image-preview');
    const removeBtn = document.getElementById('note-image-remove');
    if (!fi) return;

    fi.addEventListener('change', async () => {
      const file = fi.files[0]; if (!file) return;
      if (!file.type.startsWith('image/')) return alert('请选择图片文件');
      if (file.size > 2 * 1024 * 1024) return alert('图片不能超过 2MB');
      const reader = new FileReader();
      reader.onload = async (e) => {
        pendingImage = await compressImage(e.target.result);
        preview.src = pendingImage; preview.style.display = 'block'; removeBtn.style.display = 'flex';
      };
      reader.readAsDataURL(file);
    });

    removeBtn.addEventListener('click', () => {
      pendingImage = null; preview.style.display = 'none'; preview.src = ''; removeBtn.style.display = 'none'; fi.value = '';
    });
  }

  // --- Submit ---

  function initSubmit() {
    const btn = document.getElementById('btn-submit-note');
    const textarea = document.getElementById('note-textarea');
    if (!btn) return;

    btn.addEventListener('click', async () => {
      const text = textarea.value.trim();
      if (!text && !pendingImage) return;
      if (currentRating === 0) { document.getElementById('rating-hint').textContent = '请先给个评分吧～'; return; }

      const nickname = document.getElementById('note-nickname');
      const comment = {
        text: text || '', rating: currentRating,
        nickname: nickname ? nickname.value.trim() : '',
        color: randomNoteColor(), rotation: randomRotation(),
        date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' })
      };
      if (pendingImage) comment.image = pendingImage;

      await saveComment(currentRegionId, comment);
      SoundFX.pushpinTack(); SoundFX.stickerSlap();
      btn.style.transform = 'scale(0.95)';
      setTimeout(() => { btn.style.transform = ''; }, 150);
      setTimeout(() => render(currentRegionId), 300);
    });

    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); btn.click(); }
    });
  }

  function init() { initAdminUI(); initStarRating(); initImageUpload(); initSubmit(); }
  return { init, render, getCommentCount };
})();
