/* ============================================================
   环球手札 — Comments Module (Sticky Notes + Images)
   ============================================================ */

const CommentsModule = (() => {
  let currentRegionId = null;
  let currentRating = 0;
  let pendingImage = null; // base64 data URL
  const STORAGE_KEY = 'wj_comments';
  const MAX_IMAGE_SIZE = 800; // max width/height for stored images

  // --- Storage ---

  function getAllComments() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch { return {}; }
  }

  function getCommentsForRegion(regionId) {
    const all = getAllComments();
    return all[regionId] || [];
  }

  function saveComment(regionId, comment) {
    const all = getAllComments();
    if (!all[regionId]) all[regionId] = [];
    all[regionId].push(comment);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }

  function getCommentCount(regionId) {
    return getCommentsForRegion(regionId).length;
  }

  // --- Image compression ---

  function compressImage(dataUrl) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width <= MAX_IMAGE_SIZE && height <= MAX_IMAGE_SIZE) {
          resolve(dataUrl);
          return;
        }
        const ratio = Math.min(MAX_IMAGE_SIZE / width, MAX_IMAGE_SIZE / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.75));
      };
      img.src = dataUrl;
    });
  }

  // --- Render ---

  function render(regionId) {
    currentRegionId = regionId;
    const container = document.getElementById('notes-container');
    const emptyState = document.getElementById('empty-notes');
    if (!container) return;

    const comments = getCommentsForRegion(regionId);
    container.innerHTML = '';

    if (comments.length === 0) {
      if (emptyState) emptyState.classList.remove('hidden');
    } else {
      if (emptyState) emptyState.classList.add('hidden');
      comments.forEach((c, i) => {
        const note = createNoteElement(c, i);
        container.appendChild(note);
      });
    }

    resetInput();
  }

  function createNoteElement(comment, index) {
    const note = document.createElement('div');
    note.className = 'sticky-note';
    note.style.background = comment.color || randomNoteColor();
    note.style.transform = `rotate(${comment.rotation || randomRotation()}deg)`;
    note.style.zIndex = index;

    // Pushpin
    const pin = document.createElement('div');
    pin.className = 'note-pushpin';

    // Stars
    const stars = document.createElement('div');
    stars.className = 'note-stars';
    const fullStars = comment.rating || 0;
    stars.innerHTML = '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars);

    // Image (if present)
    let imageEl = null;
    if (comment.image) {
      imageEl = document.createElement('img');
      imageEl.className = 'note-image';
      imageEl.src = comment.image;
      imageEl.alt = '旅人照片';
      imageEl.loading = 'lazy';
    }

    // Text
    const text = document.createElement('div');
    text.className = 'note-text';
    text.textContent = comment.text;

    // Footer
    const footer = document.createElement('div');
    footer.className = 'note-footer';
    const author = document.createElement('span');
    author.className = 'note-author';
    author.textContent = '— 匿名旅人';
    const date = document.createElement('span');
    date.className = 'note-date';
    date.textContent = comment.date || '';

    footer.appendChild(author);
    footer.appendChild(date);

    note.appendChild(pin);
    note.appendChild(stars);
    if (imageEl) note.appendChild(imageEl);
    note.appendChild(text);
    note.appendChild(footer);

    // Entrance animation
    note.style.opacity = '0';
    note.style.transform = `rotate(${comment.rotation || 0}deg) translateY(-20px)`;
    setTimeout(() => {
      note.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      note.style.opacity = '1';
      note.style.transform = `rotate(${comment.rotation || randomRotation()}deg) translateY(0)`;
    }, 50 + index * 80);

    return note;
  }

  function resetInput() {
    currentRating = 0;
    pendingImage = null;
    document.getElementById('note-textarea').value = '';
    document.getElementById('rating-hint').textContent = '';
    const preview = document.getElementById('note-image-preview');
    const removeBtn = document.getElementById('note-image-remove');
    const fileInput = document.getElementById('note-image-input');
    preview.style.display = 'none';
    preview.src = '';
    removeBtn.style.display = 'none';
    if (fileInput) fileInput.value = '';
    const stars = document.querySelectorAll('#star-rating .star');
    stars.forEach(s => {
      s.classList.remove('active', 'hover');
      s.querySelector('i').className = 'fa-regular fa-star';
    });
  }

  // --- Star Rating Interaction ---

  function initStarRating() {
    const starContainer = document.getElementById('star-rating');
    if (!starContainer) return;

    const stars = starContainer.querySelectorAll('.star');

    stars.forEach(star => {
      star.addEventListener('mouseenter', () => {
        const val = parseInt(star.dataset.star);
        highlightStars(val, 'hover');
      });
      star.addEventListener('mouseleave', () => {
        clearHighlights();
        if (currentRating > 0) highlightStars(currentRating, 'active');
      });
      star.addEventListener('click', () => {
        const val = parseInt(star.dataset.star);
        currentRating = val;
        SoundFX.starClick();
        clearHighlights();
        highlightStars(val, 'active');
        document.getElementById('rating-hint').textContent = `你给了 ${val} 颗星`;
      });
    });
  }

  function highlightStars(count, className) {
    const stars = document.querySelectorAll('#star-rating .star');
    stars.forEach(s => {
      const val = parseInt(s.dataset.star);
      if (val <= count) {
        s.classList.add(className);
        s.querySelector('i').className = 'fa-solid fa-star';
      }
    });
  }

  function clearHighlights() {
    const stars = document.querySelectorAll('#star-rating .star');
    stars.forEach(s => {
      s.classList.remove('hover');
      if (!s.classList.contains('active')) {
        s.querySelector('i').className = 'fa-regular fa-star';
      }
    });
  }

  // --- Image Upload ---

  function initImageUpload() {
    const fileInput = document.getElementById('note-image-input');
    const preview = document.getElementById('note-image-preview');
    const removeBtn = document.getElementById('note-image-remove');

    if (!fileInput) return;

    fileInput.addEventListener('change', async () => {
      const file = fileInput.files[0];
      if (!file) return;

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('请选择图片文件');
        return;
      }

      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('图片不能超过 2MB');
        return;
      }

      // Read as base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        pendingImage = await compressImage(e.target.result);
        preview.src = pendingImage;
        preview.style.display = 'block';
        removeBtn.style.display = 'flex';
      };
      reader.readAsDataURL(file);
    });

    removeBtn.addEventListener('click', () => {
      pendingImage = null;
      preview.style.display = 'none';
      preview.src = '';
      removeBtn.style.display = 'none';
      fileInput.value = '';
    });
  }

  // --- Submit ---

  function initSubmit() {
    const btn = document.getElementById('btn-submit-note');
    const textarea = document.getElementById('note-textarea');

    if (!btn || !textarea) return;

    btn.addEventListener('click', () => {
      const text = textarea.value.trim();
      if (!text && !pendingImage) return;

      if (currentRating === 0) {
        document.getElementById('rating-hint').textContent = '请先给个评分吧～';
        return;
      }

      const comment = {
        text: text || '',
        rating: currentRating,
        color: randomNoteColor(),
        rotation: randomRotation(),
        date: new Date().toLocaleDateString('zh-CN', {
          year: 'numeric', month: 'short', day: 'numeric'
        })
      };

      if (pendingImage) {
        comment.image = pendingImage;
      }

      saveComment(currentRegionId, comment);
      SoundFX.pushpinTack();
      SoundFX.stickerSlap();

      btn.style.transform = 'scale(0.95)';
      setTimeout(() => { btn.style.transform = ''; }, 150);

      setTimeout(() => render(currentRegionId), 200);
    });

    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        btn.click();
      }
    });
  }

  function init() {
    initStarRating();
    initImageUpload();
    initSubmit();
  }

  return { init, render, getCommentCount };
})();
