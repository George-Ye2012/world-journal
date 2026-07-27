/* ============================================================
   环球手札 — App Orchestrator v2
   Lazy-loads continent data, shows flags + photos
   ============================================================ */

const App = (() => {
  let currentSection = 'welcome';
  let selectedRegion = null;

  function init() {
    SoundFX.init();
    initSoundToggle();
    MapModule.init();
    CommentsModule.init();
    initWelcomeAnimations();
    initWaxSeal();
    initPolaroidButtons();
    initPanelTabs();
    document.getElementById('btn-close-insights').addEventListener('click', closeInsights);
    updateDateStamp();
    hideLoading();
    window.addEventListener('resize', onResize);
    onResize();
  }

  function showLoading() { document.getElementById('loading-overlay').classList.add('active'); }
  function hideLoading() { setTimeout(() => document.getElementById('loading-overlay').classList.remove('active'), 600); }

  function initSoundToggle() {
    const btn = document.getElementById('sound-toggle');
    btn.addEventListener('click', () => {
      const on = !SoundFX.isEnabled(); SoundFX.setEnabled(on);
      btn.classList.toggle('muted', !on);
      btn.querySelector('i').className = on ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
    });
  }

  function initWelcomeAnimations() {
    document.querySelectorAll('.checklist-item').forEach((item, i) => {
      setTimeout(() => { item.classList.add('checked'); if (i === 0) SoundFX.inkSplash(); }, parseFloat(item.style.getPropertyValue('--delay')) * 1000 + 200);
    });
  }

  function initWaxSeal() {
    const seal = document.getElementById('wax-seal-btn');
    seal.addEventListener('click', () => { SoundFX.waxSealStamp(); seal.style.transform = 'scale(0.92)'; setTimeout(triggerPageFlip, 200); });
    seal.addEventListener('mousemove', (e) => {
      const r = seal.getBoundingClientRect();
      if (Math.hypot(e.clientX - r.left - r.width/2, e.clientY - r.top - r.height/2) < 60) {
        seal.style.filter = 'brightness(1.15)'; seal.style.boxShadow = '0 4px 18px rgba(200,60,60,0.5)';
      }
    });
    seal.addEventListener('mouseleave', () => { seal.style.filter = ''; seal.style.boxShadow = ''; });
  }

  function triggerPageFlip() {
    const welcome = document.getElementById('section-welcome');
    const mapSection = document.getElementById('section-map');
    const crease = document.getElementById('journal-crease');
    const pageRight = document.querySelector('.page-right');
    const pageLeft = document.querySelector('.page-left');

    welcome.classList.add('flipping');
    crease.classList.add('fading');

    setTimeout(() => { if (pageRight) pageRight.classList.add('flip-away'); SoundFX.pageFlip(); }, 300);
    setTimeout(() => { if (pageLeft) pageLeft.classList.add('flip-away'); }, 500);
    setTimeout(() => {
      mapSection.classList.add('active'); MapModule.refresh();
      const reveal = document.getElementById('map-reveal');
      if (reveal) requestAnimationFrame(() => reveal.classList.add('revealed'));
    }, 550);
    setTimeout(() => { welcome.classList.remove('active','flipping'); currentSection = 'map'; }, 1200);
    setTimeout(() => {
      if (pageRight) pageRight.classList.remove('flip-away');
      if (pageLeft) pageLeft.classList.remove('flip-away');
      crease.classList.remove('fading');
    }, 1500);
  }

  function initPolaroidButtons() {
    document.getElementById('btn-redraw').addEventListener('click', () => { MapModule.hidePolaroid(); MapModule.resetSelection(); });
    document.getElementById('btn-confirm').addEventListener('click', () => {
      SoundFX.pageFlip();
      const card = document.querySelector('.polaroid-card');
      if (card) card.classList.add('card-flip-out');
      setTimeout(() => { MapModule.hidePolaroid(); if (card) card.classList.remove('card-flip-out'); openInsights(); }, 500);
    });
  }

  // ===== OPEN INSIGHTS (lazy-load continent data) =====

  async function openInsights() {
    const match = MapModule.getSelectedRegion();
    if (!match) return;
    showLoading();

    const region = await loadRegionData(match);
    if (!region) { hideLoading(); return; }
    selectedRegion = region;

    // Header
    const name = region.nameCN || region.cn || '—';
    document.getElementById('insights-region-name').textContent = name;
    const sc = region.score || Math.min(5, Math.round(((region.econ||region.economy||{}).industry||50)/20));
    document.getElementById('score-hearts').textContent = '❤'.repeat(sc) + '🤍'.repeat(5-sc);
    document.getElementById('score-num').textContent = `(${sc}/5)`;
    const cnt = CommentsModule.getCommentCount(region.id);
    document.getElementById('score-travelers').textContent = cnt > 0 ? `来自 ${cnt} 位旅人的印象` : '';

    // Flag — try multiple sources
    const flagImg = document.getElementById('flag-img');
    const flagLabel = document.getElementById('flag-label');
    const iso = (region.iso || 'un').toLowerCase();
    if (iso && iso !== 'un') {
      flagImg.alt = name;
      flagImg.style.display = 'block';
      // Primary: flagpedia, fallback: flagcdn
      flagImg.src = `https://flagpedia.net/data/flags/w160/${iso}.webp`;
      flagImg.onerror = function() {
        if (this.src.includes('flagpedia')) {
          this.src = `https://flagcdn.com/80x60/${iso}.png`;
        }
      };
    } else { flagImg.style.display = 'none'; }
    flagLabel.textContent = region.desc || name;

    // Photos (dynamically built, 0-5 picsum photos)
    const strip = document.getElementById('photo-strip');
    strip.innerHTML = '';
    const photos = region.photos || await countryPhotos(region.id, iso);
    const pics = photos.filter(p => p.type === 'photo').slice(0, 5);
    pics.forEach((p, i) => {
      const item = document.createElement('div'); item.className = 'photo-item';
      const img = document.createElement('img');
      img.alt = name + ' · ' + (i+1);
      img.style.transition = 'opacity 0.4s ease';
      const seed = (region.id||'x') + '_p' + (i+1);
      img.src = generateGradientImage(seed);
      const preload = new Image();
      preload.onload = () => { img.src = p.url; };
      preload.onerror = () => {};
      setTimeout(() => { preload.src = p.url; }, 100*i);
      const tape = document.createElement('span'); tape.className = 'photo-tape';
      item.appendChild(img); item.appendChild(tape);
      strip.appendChild(item);
    });

    // Info card
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v || '—'; };
    set('info-area', region.area);
    set('info-life', (region.life||region.life_expectancy) ? (region.life||region.life_expectancy) + ' 岁' : '—');
    set('info-literacy', (region.lit||region.literacy_rate) ? (region.lit||region.literacy_rate) + '%' : '—');
    set('info-gdppc', region.gdppc || region.gdp_per_capita);
    set('info-currency', region.currency);
    set('info-languages', region.lang || region.languages);

    updateDateStamp();

    // Charts tab
    document.querySelectorAll('.panel-tab').forEach(t => t.classList.remove('active'));
    document.querySelector('.panel-tab[data-tab="charts"]').classList.add('active');
    document.querySelectorAll('.panel-content').forEach(p => p.classList.remove('active'));
    document.getElementById('tab-charts').classList.add('active');
    document.getElementById('section-insights').classList.add('active');

    // Show charts or "暂未收录"
    const chartsScroll = document.querySelector('.charts-scroll');
    const noDataEl = document.getElementById('no-data-msg');
    if (region.noData) {
      // Hide chart cards, show message
      chartsScroll.querySelectorAll('.chart-card,.data-info-card,.photo-strip').forEach(el => el.style.display = 'none');
      if (noDataEl) noDataEl.style.display = 'flex';
    } else {
      chartsScroll.querySelectorAll('.chart-card,.data-info-card,.photo-strip').forEach(el => el.style.display = '');
      if (noDataEl) noDataEl.style.display = 'none';
      const chartData = {
        nameCN: name,
        gdp: region.gdp || [],
        population: Array.isArray(region.pop) ? region.pop : (region.population || []),
        economy: region.econ || region.economy || {}
      };
      if (chartData.gdp.length > 0) {
        setTimeout(() => { ChartsModule.renderAll(chartData); }, 400);
      }
    }

    setTimeout(hideLoading, 500);
    CommentsModule.render(region.id);
    currentSection = 'insights';

    // Re-render photos after Pexels fetches complete (background)
    if (PEXELS_API_KEY) {
      setTimeout(() => refreshPhotoStrip(region), 2000);
      setTimeout(() => refreshPhotoStrip(region), 5000);
    }
  }

  // Re-render photos when Pexels URLs arrive
  function refreshPhotoStrip(region) {
    const strip = document.getElementById('photo-strip');
    if (!strip || !region || !region.photos) return;
    const pics = region.photos.filter(p => p.type === 'photo').slice(0, 5);
    const imgs = strip.querySelectorAll('img');
    pics.forEach((p, i) => {
      if (imgs[i] && p.url && p.url !== imgs[i].src) {
        const preload = new Image();
        preload.onload = () => { imgs[i].src = p.url; };
        preload.src = p.url;
      }
    });
  }

  function closeInsights() {
    SoundFX.pageFlip();
    document.getElementById('section-insights').classList.remove('active');
    currentSection = 'map';
    ChartsModule.destroyAll();
  }

  function initPanelTabs() {
    document.querySelectorAll('.panel-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.panel-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.panel-content').forEach(p => p.classList.remove('active'));
        document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
        if (tab.dataset.tab === 'comments' && selectedRegion) CommentsModule.render(selectedRegion.id);
      });
    });
  }

  function updateDateStamp() {
    const now = new Date();
    document.getElementById('date-stamp-text').textContent = `${now.getFullYear()}\n${now.getMonth()+1}.${now.getDate()}`;
  }

  function onResize() {
    const panel = document.getElementById('section-insights');
    if (window.innerWidth <= 767 && panel) panel.style.transition = 'transform 0.45s cubic-bezier(0.4,0,0.2,1)';
  }

  // ===== Gradient image generator =====
  function generateGradientImage(seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) { hash = ((hash<<5)-hash) + seed.charCodeAt(i); hash |= 0; }
    const h = Math.abs(hash);
    const c1 = `hsl(${h%360},${40+h%20}%,${62+h%16}%)`;
    const c2 = `hsl(${(h%360+40+h%50)%360},${48+h%20}%,${56+h%16}%)`;
    const cx = 32+(h%36), cy = 28+((h>>5)%44);
    const svg = '%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E'
      + '%3Cdefs%3E%3ClinearGradient id=%22g%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E'
      + '%3Cstop offset=%220%25%22 stop-color=%22'+encodeURIComponent(c1)+'%22/%3E'
      + '%3Cstop offset=%22100%25%22 stop-color=%22'+encodeURIComponent(c2)+'%22/%3E'
      + '%3C/linearGradient%3E%3C/defs%3E'
      + '%3Crect width=%22400%22 height=%22300%22 fill=%22url(%23g)%22/%3E'
      + '%3Ccircle cx=%22'+cx+'%25%22 cy=%22'+cy+'%25%22 r=%2235%25%22 fill=%22rgba(255,255,255,0.1)%22/%3E'
      + '%3C/svg%3E';
    return 'data:image/svg+xml,' + svg;
  }

  document.addEventListener('DOMContentLoaded', () => {
    try { init(); } catch(e) { console.error('App init error:', e); }
    // Ensure close button always works
    const closeBtn = document.getElementById('btn-close-insights');
    if (closeBtn) closeBtn.addEventListener('click', closeInsights);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && currentSection === 'insights') closeInsights(); });
    setTimeout(hideLoading, 800);
  });

  return { init };
})();
