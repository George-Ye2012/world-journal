/* ============================================================
   环球手札 — Map Module (Leaflet + Selection + Region Match)
   ============================================================ */

const MapModule = (() => {
  let map = null;
  let startPoint = null;
  let endPoint = null;
  let selectionRect = null;
  let cornerDots = [];
  let isSelecting = false;
  let dustThrottle = 0;
  let selectedRegion = null;
  let guideVisitCount = 0;
  let polaroidMap = null;

  // --- Initialize ---

  function init() {
    // Track guide visits
    guideVisitCount = parseInt(localStorage.getItem('wj_guide_visits') || '0');

    // Create map
    map = L.map('map', {
      center: [35.0, 105.0],
      zoom: 4,
      zoomControl: false,
      attributionControl: false,
      dragging: true,
      touchZoom: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      boxZoom: false,
      worldCopyJump: true,
      maxBounds: [[-85, -540], [85, 540]],
      maxBoundsViscosity: 0.3
    });

    // Multi-source tiles — try CartoDB, fall back to OSM mirror
    const tileServers = [
      'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
    ];

    let currentTileIdx = 0;
    function createTileLayer(idx) {
      const layer = L.tileLayer(tileServers[idx], {
        maxZoom: 18, minZoom: 2,
        attribution: '&copy; OSM contributors'
      });
      layer._serverIdx = idx;

      layer.on('tileerror', function(e) {
        e.tile.style.backgroundColor = '#F2EAD4';
        // If many errors on current server, try switching
        if (layer._errorCount === undefined) layer._errorCount = 0;
        layer._errorCount++;
        if (layer._errorCount > 10 && idx < tileServers.length - 1) {
          map.removeLayer(layer);
          const newLayer = createTileLayer(idx + 1);
          newLayer.addTo(map);
        }
      });
      return layer;
    }

    createTileLayer(0).addTo(map);

    // Watermark
    L.control.attribution({ position: 'bottomright', prefix: '' })
      .addAttribution('© OSM contributors | 环球手札')
      .addTo(map);

    // Zoom control - custom positioned
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Setup selection events
    setupSelectionEvents();

    // Guide note logic
    updateGuideNote();

    // Reset map reveal overlay
    const reveal = document.getElementById('map-reveal');
    if (reveal) reveal.classList.remove('revealed');

    // Guide note close button
    const closeBtn = document.getElementById('guide-note-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dismissGuideNote();
      });
    }

    // Invalidate size after container becomes visible
    setTimeout(() => map.invalidateSize(), 100);
  }

  // --- Guide Note ---

  function dismissGuideNote() {
    guideVisitCount = 99; // permanently dismissed
    localStorage.setItem('wj_guide_visits', '99');
    const note = document.getElementById('guide-note');
    if (note) {
      note.style.transition = 'all 0.4s ease';
      note.style.opacity = '0';
      note.style.transform = 'scale(0.8) rotate(5deg)';
      setTimeout(() => { note.style.display = 'none'; }, 400);
    }
  }

  function updateGuideNote() {
    const note = document.getElementById('guide-note');
    if (!note) return;

    if (guideVisitCount >= 3) {
      note.style.display = 'none';
      return;
    }

    note.style.display = 'block';
    if (guideVisitCount === 0) {
      note.querySelector('.guide-text').textContent = '在地图上，用铅笔轻轻圈出你好奇的地方。';
    } else {
      note.querySelector('.guide-text').textContent = '画得真好！再试试其他角落吧～';
    }
  }

  function incrementGuideVisits() {
    guideVisitCount++;
    localStorage.setItem('wj_guide_visits', guideVisitCount.toString());
    if (guideVisitCount >= 3) {
      const note = document.getElementById('guide-note');
      if (note) {
        note.style.transition = 'all 0.5s ease';
        note.style.transform = 'scale(0.5) rotate(10deg)';
        note.style.opacity = '0';
        setTimeout(() => { note.style.display = 'none'; }, 500);
      }
    } else {
      updateGuideNote();
    }
  }

  // --- Selection Events ---

  function setupSelectionEvents() {
    const mapEl = map.getContainer();

    // PC: mouse events
    mapEl.addEventListener('mousedown', onSelectionStart);
    mapEl.addEventListener('mousemove', onSelectionMove);
    mapEl.addEventListener('mouseup', onSelectionEnd);

    // Mobile: touch events
    let longPressTimer = null;
    let touchStartLatlng = null;

    mapEl.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartLatlng = map.mouseEventToLatLng(e.touches[0]);
        longPressTimer = setTimeout(() => {
          startPoint = touchStartLatlng;
          isSelecting = true;
          map.dragging.disable();
          if (navigator.vibrate) navigator.vibrate(15);
          SoundFX.pencilScratch();
          document.body.style.cursor = "crosshair";
        }, 500);
      }
    }, { passive: false });

    mapEl.addEventListener('touchmove', (e) => {
      if (!isSelecting || !startPoint) {
        clearTimeout(longPressTimer);
        return;
      }
      e.preventDefault();
      const latlng = map.mouseEventToLatLng(e.touches[0]);
      updateSelectionRect(startPoint, latlng);
    }, { passive: false });

    mapEl.addEventListener('touchend', (e) => {
      clearTimeout(longPressTimer);
      if (!isSelecting) return;
      const latlng = map.mouseEventToLatLng(e.changedTouches[0]);
      endPoint = latlng;
      finishSelection();
    });
  }

  function onSelectionStart(e) {
    // Only react to primary button
    if (e.button !== 0) return;
    startPoint = map.mouseEventToLatLng(e);
    isSelecting = true;
    map.dragging.disable();
    SoundFX.pencilScratch();
    document.body.style.cursor = "crosshair";
  }

  function onSelectionMove(e) {
    if (!isSelecting || !startPoint) return;
    const latlng = map.mouseEventToLatLng(e);
    updateSelectionRect(startPoint, latlng);
  }

  function onSelectionEnd(e) {
    if (!isSelecting) return;
    const latlng = map.mouseEventToLatLng(e);
    endPoint = latlng;
    finishSelection();
  }

  function updateSelectionRect(start, current) {
    // Clear previous
    clearSelection();

    const bounds = L.latLngBounds(start, current);

    // Create rectangle
    selectionRect = L.rectangle(bounds, {
      className: 'selection-box',
      color: '#C44D4D',
      weight: 3,
      dashArray: '12, 6',
      fillOpacity: 0.06,
      interactive: false
    }).addTo(map);

    // Add corner dots
    const corners = [
      bounds.getNorthWest(),
      bounds.getNorthEast(),
      bounds.getSouthWest(),
      bounds.getSouthEast()
    ];

    corners.forEach(corner => {
      const point = map.latLngToContainerPoint(corner);
      const dot = document.createElement('div');
      dot.className = 'corner-dot';
      dot.style.left = (point.x - 5) + 'px';
      dot.style.top = (point.y - 5) + 'px';
      document.getElementById('map-container').appendChild(dot);
      cornerDots.push(dot);
    });

    // Pencil dust particles (throttled)
    if (dustThrottle++ % 3 === 0) {
      emitPencilDust(current);
    }
  }

  function clearSelection() {
    if (selectionRect) {
      map.removeLayer(selectionRect);
      selectionRect = null;
    }
    cornerDots.forEach(d => d.remove());
    cornerDots = [];
  }

  function finishSelection() {
    map.dragging.enable();
    isSelecting = false;
    document.body.style.cursor = '';

    if (!startPoint || !endPoint) return;

    // Minimum selection size check
    const bounds = L.latLngBounds(startPoint, endPoint);
    const area = Math.abs(
      (bounds.getEast() - bounds.getWest()) *
      (bounds.getNorth() - bounds.getSouth())
    );

    if (area < 0.5) {
      // Too small — treat as a click/point selection
      const center = bounds.getCenter();
      const miniBounds = L.latLngBounds(
        [center.lat - 0.5, center.lng - 0.5],
        [center.lat + 0.5, center.lng + 0.5]
      );
      showRegionConfirmation(miniBounds);
    } else {
      // Change border color to indicate selection complete
      if (selectionRect) {
        selectionRect.setStyle({ color: '#4A6B8A' });
      }

      // Ink splash at corners
      SoundFX.inkSplash();

      showRegionConfirmation(bounds);
    }

    incrementGuideVisits();
  }

  // --- Region Matching & Polaroid ---

  function showRegionConfirmation(bounds) {
    const match = findBestRegion(bounds);

    // Show polaroid overlay
    const overlay = document.getElementById('polaroid-overlay');
    const name = match ? (match.cn || match.nameCN || '未知区域') : '这片神秘之地';
    document.getElementById('polaroid-region-name').textContent = name;
    overlay.classList.add('active');
    SoundFX.polaroidDevelop();

    // Store for later use
    selectedRegion = match;

    // Create mini map centered on match
    setTimeout(() => createPolaroidMiniMap(match), 100);

    // Zoom main map
    if (match && match.bnd) {
      map.fitBounds(match.bnd, { padding: [50, 50], maxZoom: 7 });
    }
  }

  function createPolaroidMiniMap(match) {
    const photo = document.querySelector('.polaroid-photo');
    if (!photo) return;
    if (polaroidMap) { polaroidMap.remove(); polaroidMap = null; }
    const old = document.getElementById('polaroid-mini-map');
    if (old) old.remove();
    const container = document.createElement('div');
    container.id = 'polaroid-mini-map';
    container.style.cssText = 'width:100%;height:100%;';
    photo.insertBefore(container, photo.firstChild);

    const center = match ? (match.ctr || match.center || [35,105]) : [35,105];
    polaroidMap = L.map(container, {
      center, zoom: 5, zoomControl: false, attributionControl: false,
      dragging: false, scrollWheelZoom: false, doubleClickZoom: false,
      touchZoom: false, boxZoom: false, keyboard: false, interactive: false
    });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { maxZoom: 18 }).addTo(polaroidMap);
    if (match && match.bnd) polaroidMap.fitBounds(match.bnd, { padding: [10,10] });
  }

  function hidePolaroid() {
    const overlay = document.getElementById('polaroid-overlay');
    overlay.classList.remove('active');
    clearSelection();

    // Destroy mini map
    if (polaroidMap) {
      polaroidMap.remove();
      polaroidMap = null;
    }

    startPoint = null;
    endPoint = null;
  }

  // --- Pencil Dust Particles ---

  function emitPencilDust(latlng) {
    const point = map.latLngToContainerPoint(latlng);
    const container = document.getElementById('map-container');
    if (!container) return;

    const count = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < count; i++) {
      const dust = document.createElement('div');
      dust.className = 'pencil-dust';
      const size = Math.random() * 3 + 2;
      dust.style.cssText = `
        left: ${point.x + Math.random() * 10 - 5}px;
        top: ${point.y + Math.random() * 10 - 5}px;
        width: ${size}px;
        height: ${size}px;
        background: #C49A4D;
        opacity: 0.7;
      `;
      container.appendChild(dust);

      requestAnimationFrame(() => {
        dust.style.transform = `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 + 10}px)`;
        dust.style.opacity = '0';
      });

      setTimeout(() => dust.remove(), 600);
    }
  }

  // --- Public API ---

  function getSelectedRegion() {
    return selectedRegion;
  }

  function resetSelection() {
    clearSelection();
    startPoint = null;
    endPoint = null;
    selectedRegion = null;
  }

  function refresh() {
    if (map) {
      setTimeout(() => map.invalidateSize(), 50);
    }
  }

  return {
    init,
    getSelectedRegion,
    hidePolaroid,
    resetSelection,
    refresh
  };
})();
