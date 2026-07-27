/* ============================================================
   环球手札 — Web Audio API Sound Synthesizer
   No audio files needed. All sounds < 2KB of code.
   ============================================================ */

const SoundFX = (() => {
  let ctx = null;
  let enabled = true;

  function getCtx() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return ctx;
  }

  function noise(duration, freqLow, freqHigh, vol = 0.03) {
    if (!enabled) return;
    try {
      const c = getCtx();
      const bufferSize = c.sampleRate * duration;
      const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * vol;
      }
      const source = c.createBufferSource();
      source.buffer = buffer;

      const filter = c.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = (freqLow + freqHigh) / 2;
      filter.Q.value = 0.5;

      const gain = c.createGain();
      gain.gain.setValueAtTime(vol, c.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(c.destination);
      source.start(c.currentTime);
      source.stop(c.currentTime + duration);
    } catch(e) { /* audio not available */ }
  }

  function tone(freq, duration, vol = 0.08, type = 'sine') {
    if (!enabled) return;
    try {
      const c = getCtx();
      const osc = c.createOscillator();
      osc.type = type;
      osc.frequency.value = freq;

      const gain = c.createGain();
      gain.gain.setValueAtTime(vol, c.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration);

      osc.connect(gain);
      gain.connect(c.destination);
      osc.start(c.currentTime);
      osc.stop(c.currentTime + duration);
    } catch(e) { /* audio not available */ }
  }

  // --- Public sound effects ---

  function pageFlip() {
    // Crisp paper flip: short noise burst
    noise(0.12, 800, 4000, 0.04);
    noise(0.08, 2000, 8000, 0.02);
  }

  function pencilScratch() {
    // Very subtle continuous scratch — just a quick burst here
    noise(0.06, 3000, 10000, 0.01);
  }

  function pushpinTack() {
    // Sharp metallic "ding"
    tone(1800, 0.08, 0.1, 'sine');
    tone(2400, 0.05, 0.06, 'triangle');
    setTimeout(() => tone(3000, 0.03, 0.04, 'sine'), 30);
  }

  function stickerSlap() {
    // Paper being stuck down
    noise(0.1, 200, 2000, 0.03);
    tone(200, 0.06, 0.04, 'triangle');
  }

  function starClick() {
    // Soft tick
    tone(800, 0.04, 0.06, 'sine');
    tone(1200, 0.03, 0.04, 'triangle');
  }

  function waxSealStamp() {
    // Deep "thud" for wax seal
    tone(80, 0.2, 0.12, 'sine');
    tone(120, 0.15, 0.08, 'triangle');
    noise(0.15, 100, 600, 0.04);
  }

  function polaroidDevelop() {
    // Magical shimmer
    tone(600, 0.3, 0.04, 'sine');
    setTimeout(() => tone(900, 0.2, 0.04, 'sine'), 80);
    setTimeout(() => tone(1200, 0.15, 0.03, 'triangle'), 160);
  }

  function inkSplash() {
    // Tiny ink splatter
    noise(0.08, 500, 3000, 0.025);
  }

  function cardAppear() {
    // Quick paper snap
    noise(0.06, 400, 3000, 0.025);
    tone(300, 0.05, 0.04, 'triangle');
  }

  // --- Controls ---

  function setEnabled(val) {
    enabled = val;
  }

  function isEnabled() {
    return enabled;
  }

  // Resume audio context on first user interaction
  function init() {
    document.addEventListener('click', () => {
      if (ctx && ctx.state === 'suspended') ctx.resume();
    }, { once: true });
    document.addEventListener('touchstart', () => {
      if (ctx && ctx.state === 'suspended') ctx.resume();
    }, { once: true });
  }

  return {
    pageFlip, pencilScratch, pushpinTack, stickerSlap,
    starClick, waxSealStamp, polaroidDevelop, inkSplash, cardAppear,
    setEnabled, isEnabled, init
  };
})();
