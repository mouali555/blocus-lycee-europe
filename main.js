// ============================================================
// BLOCUS — Lycée de l'Europe, Dunkerque
// Main JavaScript — v3.0 ULTRA PREMIUM EDITION
// ============================================================

// ===== CUSTOM CURSOR =====
function initCursor() {
  const cursor = document.getElementById('custom-cursor');
  const cursorDot = document.getElementById('cursor-dot');
  if (!cursor || !cursorDot) return;

  let mouseX = -200, mouseY = -200;
  let cursorX = -200, cursorY = -200;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor states
  const hoverEls = document.querySelectorAll('a, button, [role="button"], .demand-card, .stat-card, .presse-card, .action-card, .lycee-item');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  document.addEventListener('mousedown', () => cursor.classList.add('click'));
  document.addEventListener('mouseup', () => cursor.classList.remove('click'));

  // Hide on mobile
  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    cursorDot.style.display = 'none';
  }
}

// ===== LOADER =====
const loader = document.getElementById('loader');

window.addEventListener('load', () => {
  const fill = document.querySelector('.loader-fill');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    initAll();
  }, 2200);
});

document.body.style.overflow = 'hidden';

function initAll() {
  initCursor();
  initNavbar();
  initBurger();
  initScrollProgress();
  initParticles();
  initTypewriter();
  initScrollReveal();
  initCounters();
  initParallax();
  initActiveNav();
  initTicker();
  initTiltCards();
  initMagneticButtons();
  initSplitTitles();
  initLiveCounter();
  initSoundWave();
  initDemandBars();
  initSectionDividers();
}

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    const ind = document.getElementById('hero-scroll-indicator');
    if (ind) ind.style.opacity = window.scrollY > 100 ? '0' : '';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ===== BURGER MENU =====
function initBurger() {
  const burger = document.getElementById('burger');
  const navMobile = document.getElementById('nav-mobile');
  if (!burger || !navMobile) return;

  burger.addEventListener('click', () => {
    const isOpen = navMobile.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen.toString());
    navMobile.setAttribute('aria-hidden', (!isOpen).toString());
  });

  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      navMobile.setAttribute('aria-hidden', 'true');
    });
  });
}

// ===== SCROLL PROGRESS =====
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / max * 100) + '%';
  }, { passive: true });
}

// ===== CANVAS PARTICLES (Embers/Sparks) =====
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;
  let mouseX = canvas.width / 2;
  let mouseY = canvas.height;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Track mouse for interactive particles
  document.getElementById('hero')?.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  class Particle {
    constructor(fromMouse) {
      this.fromMouse = fromMouse;
      this.reset(fromMouse);
    }
    reset(fromMouse) {
      if (fromMouse && Math.random() < 0.3) {
        this.x = mouseX + (Math.random() - 0.5) * 20;
        this.y = mouseY + (Math.random() - 0.5) * 20;
      } else {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 20;
      }
      this.vx = (Math.random() - 0.5) * 1.8;
      this.vy = -(Math.random() * 2.5 + 0.8);
      this.size = Math.random() * 3.5 + 0.5;
      this.alpha = Math.random() * 0.7 + 0.2;
      this.life = 1;
      this.decay = Math.random() * 0.007 + 0.002;
      const type = Math.floor(Math.random() * 3);
      if (type === 0) { this.color = `${Math.floor(Math.random()*60+200)},${Math.floor(Math.random()*60)},0`; }
      else if (type === 1) { this.color = `${Math.floor(Math.random()*40+200)},0,${Math.floor(Math.random()*30)}`; }
      else { this.color = `255,${Math.floor(Math.random()*80+50)},0`; }
    }
    update() {
      this.x += this.vx + Math.sin(this.life * 12) * 0.4;
      this.y += this.vy;
      this.vy -= 0.006;
      this.life -= this.decay;
      this.alpha = this.life * 0.8;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = `rgb(${this.color})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${this.color},0.9)`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 100; i++) {
    const p = new Particle(false);
    p.y = Math.random() * canvas.height;
    p.life = Math.random();
    particles.push(p);
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (Math.random() < 0.5) particles.push(new Particle(true));
    particles = particles.filter(p => p.life > 0);
    particles.forEach(p => { p.update(); p.draw(); });
    if (particles.length > 250) particles.splice(0, particles.length - 250);
    animId = requestAnimationFrame(loop);
  }
  loop();

  const heroObs = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) { cancelAnimationFrame(animId); }
    else { loop(); }
  });
  const hero = document.getElementById('hero');
  if (hero) heroObs.observe(hero);
}

// ===== TYPEWRITER =====
function initTypewriter() {
  const el = document.getElementById('typewriter-target');
  if (!el) return;
  const lines = [
    "Nos profs manquent. Nos classes débordent.",
    "Notre avenir n'est pas négociable.",
    "On ne lâchera pas. La lutte continue. ✊",
    "Ensemble, nous sommes plus forts.",
    "L'école publique, c'est notre droit."
  ];
  let lineIdx = 0, charIdx = 0, deleting = false, pauseTimer = null;
  const cursor = document.createElement('span');
  cursor.className = 'cursor-blink';
  el.appendChild(cursor);

  function type() {
    const line = lines[lineIdx];
    if (!deleting) {
      charIdx++;
      if (el.childNodes[0] === cursor) el.insertBefore(document.createTextNode(''), cursor);
      el.childNodes[0].textContent = line.slice(0, charIdx);
      if (charIdx === line.length) { deleting = true; pauseTimer = setTimeout(type, 2200); return; }
    } else {
      charIdx--;
      el.childNodes[0].textContent = line.slice(0, charIdx);
      if (charIdx === 0) { deleting = false; lineIdx = (lineIdx + 1) % lines.length; pauseTimer = setTimeout(type, 500); return; }
    }
    pauseTimer = setTimeout(type, deleting ? 30 : 50);
  }
  el.insertBefore(document.createTextNode(''), cursor);
  setTimeout(type, 1400);
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-up, .reveal-scale, ' +
    '.stat-card, .demand-card, .timeline-item, .presse-card, ' +
    '.action-card, .lycee-item, .solidarity-banner, .alerte-card, ' +
    '.dinfo, .tag, .tl-card, .counter-section, .wave-section, .galerie-item'
  );

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (!el.classList.contains('reveal') && !el.classList.contains('reveal-left') &&
          !el.classList.contains('reveal-right') && !el.classList.contains('reveal-up') &&
          !el.classList.contains('reveal-scale')) {
        el.classList.add('reveal');
      }
      const siblings = [...(el.parentElement?.children || [])];
      const idx = siblings.indexOf(el);
      el.style.transitionDelay = Math.min(idx * 90, 500) + 'ms';
      el.classList.add('visible');
      obs.unobserve(el);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  targets.forEach(el => obs.observe(el));
}

// ===== COUNTER ANIMATION =====
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      let current = 0;
      const duration = 2000;
      const startTime = performance.now();

      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing: ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        current = Math.round(eased * target);
        el.textContent = current + suffix;
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(update);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
}

// ===== PARALLAX =====
function initParallax() {
  const img = document.getElementById('hero-parallax');
  if (!img || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      img.style.transform = `translateY(${window.scrollY * 0.3}px) scale(1.08)`;
    }
  }, { passive: true });
}

// ===== ACTIVE NAV =====
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active-link', a.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
}

// ===== TICKER =====
function initTicker() {
  const track = document.getElementById('ticker-track');
  if (!track) return;
  track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
  track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
}

// ===== 3D TILT CARDS =====
function initTiltCards() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const tiltEls = document.querySelectorAll('.demand-card, .stat-card, .presse-card, .action-card, .tl-card');

  tiltEls.forEach(el => {
    let rect;
    const intensity = 12;
    const glowEl = el.querySelector('.tilt-glow') || (() => {
      const g = document.createElement('div');
      g.className = 'tilt-glow';
      el.appendChild(g);
      return g;
    })();

    el.addEventListener('mouseenter', () => {
      rect = el.getBoundingClientRect();
      el.style.transition = 'none';
    });

    el.addEventListener('mousemove', (e) => {
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -intensity;
      const rotY = ((x - cx) / cx) * intensity;

      el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(10px)`;

      // Glow effect
      const gx = (x / rect.width) * 100;
      const gy = (y / rect.height) * 100;
      glowEl.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(204,0,34,0.18) 0%, transparent 60%)`;
      glowEl.style.opacity = '1';
    });

    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform 0.5s ease, border-color 0.3s, box-shadow 0.3s';
      el.style.transform = '';
      glowEl.style.opacity = '0';
    });
  });
}

// ===== MAGNETIC BUTTONS =====
function initMagneticButtons() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.btn, .nav-cta, .action-main').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
      setTimeout(() => btn.style.transition = '', 400);
    });
  });
}

// ===== SPLIT TEXT ANIMATION FOR TITLES =====
function initSplitTitles() {
  const heroTitle = document.querySelector('.title-blocus');
  if (!heroTitle || heroTitle.dataset.split) return;
  heroTitle.dataset.split = 'true';
  // Already styled with glitch — just add shimmer on load
}

// ===== LIVE BLOCUS COUNTER =====
function initLiveCounter() {
  const el = document.getElementById('blocus-days');
  const hoursEl = document.getElementById('blocus-hours');
  const minsEl = document.getElementById('blocus-mins');
  const secsEl = document.getElementById('blocus-secs');
  if (!el) return;

  // Blocus start: mid-September 2026
  const start = new Date('2026-09-15T08:00:00');

  function update() {
    const now = new Date();
    const diff = now - start;
    if (diff < 0) return;

    const totalSecs = Math.floor(diff / 1000);
    const days = Math.floor(totalSecs / 86400);
    const hours = Math.floor((totalSecs % 86400) / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;

    if (el) el.textContent = days;
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

// ===== SOUND WAVE ANIMATION =====
function initSoundWave() {
  const canvas = document.getElementById('wave-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width;
    const h = canvas.height;
    const midY = h / 2;

    const waves = [
      { amp: 18, freq: 0.012, speed: 0.04, color: 'rgba(204,0,34,0.7)', width: 2.5 },
      { amp: 12, freq: 0.018, speed: 0.06, color: 'rgba(255,26,53,0.45)', width: 1.5 },
      { amp: 8, freq: 0.028, speed: 0.08, color: 'rgba(255,100,100,0.3)', width: 1 },
    ];

    waves.forEach(wave => {
      ctx.beginPath();
      ctx.lineWidth = wave.width;
      ctx.strokeStyle = wave.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = wave.color;

      for (let x = 0; x <= w; x++) {
        const y = midY + Math.sin(x * wave.freq + t * wave.speed) * wave.amp
                       + Math.sin(x * wave.freq * 2.5 + t * wave.speed * 1.5) * (wave.amp * 0.4);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    });

    t += 1;
    requestAnimationFrame(draw);
  }
  draw();
}

// ===== DEMAND BARS ANIMATION =====
function initDemandBars() {
  const bars = document.querySelectorAll('.demand-fill');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const bar = entry.target;
      const width = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => { bar.style.width = width; }, 300);
      obs.unobserve(bar);
    });
  }, { threshold: 0.5 });
  bars.forEach(b => obs.observe(b));
}

// ===== SECTION DIVIDERS =====
function initSectionDividers() {
  // Dynamic gradient shifting for sections
  let hue = 0;
  const redGlows = document.querySelectorAll('.rejoindre-bg-glow');
  function animGlow() {
    hue = (hue + 0.3) % 360;
    redGlows.forEach(g => {
      g.style.transform = `translate(-50%, -50%) scale(${1 + Math.sin(Date.now() * 0.001) * 0.1})`;
    });
    requestAnimationFrame(animGlow);
  }
  if (redGlows.length) animGlow();
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ===== CONFETTI on rejoindre =====
function launchConfetti() {
  const colors = ['#cc0022', '#ff1a35', '#ff6680', '#ffffff', '#ffaa00'];
  for (let i = 0; i < 80; i++) {
    const confetto = document.createElement('div');
    confetto.className = 'confetto';
    confetto.style.cssText = `
      position: fixed;
      top: 50%;
      left: ${Math.random() * 100}vw;
      width: ${Math.random() * 8 + 4}px;
      height: ${Math.random() * 8 + 4}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      z-index: 99999;
      pointer-events: none;
      animation: confetto-fall ${Math.random() * 2 + 1}s ease forwards;
      animation-delay: ${Math.random() * 0.5}s;
      transform: rotate(${Math.random() * 360}deg);
    `;
    document.body.appendChild(confetto);
    setTimeout(() => confetto.remove(), 3000);
  }
}

// ===== SHARE FUNCTION =====
function sharesite() {
  const result = document.getElementById('share-result');
  if (navigator.share) {
    navigator.share({
      title: "BLOCUS — Lycée de l'Europe, Dunkerque",
      text: "Lycéens en lutte pour une éducation publique digne. Rejoins le mouvement !",
      url: window.location.href
    }).catch(() => {});
  } else {
    navigator.clipboard.writeText(window.location.href).then(() => {
      if (result) { result.textContent = '✅ Lien copié !'; setTimeout(() => { result.textContent = ''; }, 2500); }
    }).catch(() => {
      if (result) { result.textContent = '📋 ' + window.location.href; }
    });
  }
}

// ===== KEYBOARD ACCESSIBILITY =====
document.getElementById('action-partager')?.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); sharesite(); }
});

// Confetti on "Rejoins-nous" clicks
document.querySelectorAll('#btn-rejoindre, #nav-link-rejoindre, .nav-cta, .mobile-cta').forEach(el => {
  el.addEventListener('click', () => launchConfetti());
});

// ===== HOVER SOUND WAVE in hero buttons =====
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.classList.add('btn-ripple');
  });
  btn.addEventListener('animationend', () => {
    btn.classList.remove('btn-ripple');
  });
});

// ===== STATS SPARKLE on hover =====
document.querySelectorAll('.stat-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    for (let i = 0; i < 6; i++) {
      const spark = document.createElement('div');
      spark.className = 'spark';
      const rect = card.getBoundingClientRect();
      spark.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width/2 + (Math.random()-0.5)*rect.width*0.8}px;
        top: ${rect.top + rect.height/2 + (Math.random()-0.5)*rect.height*0.8}px;
        width: 4px; height: 4px;
        background: var(--red-bright);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: spark-anim 0.6s ease forwards;
        animation-delay: ${i * 60}ms;
        box-shadow: 0 0 6px var(--red-bright);
      `;
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 800);
    }
  });
});

console.log('%c✊ BLOCUS — Lycée de l\'Europe, Dunkerque', 'color:#ff1a35;font-size:20px;font-weight:bold;font-family:monospace;');
console.log('%cLa lutte continue. Rejoins-nous : @blocus_europe', 'color:#888;font-size:13px;');
console.log('%cv3.0 ULTRA PREMIUM EDITION', 'color:#cc0022;font-size:11px;');
