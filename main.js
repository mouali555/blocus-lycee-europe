// ============================================================
// BLOCUS — Lycée de l'Europe, Dunkerque
// Main JavaScript — v2.0 Cinematic Edition
// ============================================================

// ===== LOADER =====
const loader = document.getElementById('loader');
const loaderFill = document.querySelector('.loader-fill');

window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    initAll();
  }, 2000);
});

document.body.style.overflow = 'hidden';

function initAll() {
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
}

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    // Hide scroll indicator
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

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + 20;
      this.vx = (Math.random() - 0.5) * 1.2;
      this.vy = -(Math.random() * 2 + 0.5);
      this.size = Math.random() * 3 + 0.5;
      this.alpha = Math.random() * 0.6 + 0.2;
      this.life = 1;
      this.decay = Math.random() * 0.006 + 0.002;
      const r = Math.floor(Math.random() * 80 + 180);
      const g = Math.floor(Math.random() * 60);
      this.color = `${r},${g},0`;
    }
    update() {
      this.x += this.vx + Math.sin(this.life * 10) * 0.3;
      this.y += this.vy;
      this.vy -= 0.005;
      this.life -= this.decay;
      this.alpha = this.life * 0.7;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = `rgb(${this.color})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = `rgba(${this.color},0.8)`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 80; i++) {
    const p = new Particle();
    p.y = Math.random() * canvas.height;
    p.life = Math.random();
    particles.push(p);
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (Math.random() < 0.4) particles.push(new Particle());
    particles = particles.filter(p => p.life > 0);
    particles.forEach(p => { p.update(); p.draw(); });
    if (particles.length > 200) particles.splice(0, particles.length - 200);
    animId = requestAnimationFrame(loop);
  }
  loop();

  // Stop when hero not visible (performance)
  const heroObs = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) {
      cancelAnimationFrame(animId);
    } else {
      loop();
    }
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
    "On ne lâchera pas. La lutte continue. ✊"
  ];
  let lineIdx = 0, charIdx = 0, deleting = false, pauseTimer = null;
  const cursor = document.createElement('span');
  cursor.className = 'cursor-blink';
  el.appendChild(cursor);

  function type() {
    const line = lines[lineIdx];
    if (!deleting) {
      charIdx++;
      el.firstChild ? el.firstChild.textContent = line.slice(0, charIdx) : el.insertBefore(document.createTextNode(line.slice(0, charIdx)), cursor);
      if (el.childNodes.length > 1 && el.childNodes[0] !== cursor) el.childNodes[0].textContent = line.slice(0, charIdx);
      if (el.childNodes[0] === cursor) el.insertBefore(document.createTextNode(''), cursor);
      el.childNodes[0].textContent = line.slice(0, charIdx);
      if (charIdx === line.length) { deleting = true; pauseTimer = setTimeout(type, 2000); return; }
    } else {
      charIdx--;
      el.childNodes[0].textContent = line.slice(0, charIdx);
      if (charIdx === 0) { deleting = false; lineIdx = (lineIdx + 1) % lines.length; pauseTimer = setTimeout(type, 400); return; }
    }
    const speed = deleting ? 35 : 55;
    pauseTimer = setTimeout(type, speed);
  }
  el.insertBefore(document.createTextNode(''), cursor);
  setTimeout(type, 1200);
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, ' +
    '.stat-card, .demand-card, .timeline-item, .presse-card, ' +
    '.action-card, .lycee-item, .solidarity-banner, .alerte-card, ' +
    '.dinfo, .tag, .tl-card, .presse-card'
  );

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (!el.classList.contains('reveal') && !el.classList.contains('reveal-left') && !el.classList.contains('reveal-right')) {
        el.classList.add('reveal');
      }
      const siblings = [...(el.parentElement?.children || [])];
      const idx = siblings.indexOf(el);
      el.style.transitionDelay = Math.min(idx * 80, 400) + 'ms';
      el.classList.add('visible');
      obs.unobserve(el);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

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
      const duration = 1500;
      const step = Math.ceil(target / (duration / 16));
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + suffix;
        if (current >= target) clearInterval(timer);
      }, 16);
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
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      img.style.transform = `translateY(${scrolled * 0.25}px) scale(1.05)`;
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

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

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

console.log('%c✊ BLOCUS — Lycée de l\'Europe, Dunkerque', 'color:#ff1a35;font-size:18px;font-weight:bold;');
console.log('%cLa lutte continue. Rejoins-nous : @blocus_europe', 'color:#888;font-size:12px;');
