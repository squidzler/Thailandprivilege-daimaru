  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // sticky nav border on scroll + parallax-lite hero background
  const nav = document.getElementById('nav');
  const mbar = document.getElementById('mbar');
  const pbar = document.getElementById('progressbar');
  const docH = () => document.documentElement.scrollHeight - window.innerHeight;
  const heroBg = document.querySelector('.hero__bg');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      nav.classList.toggle('scrolled', y > 8);
      if (mbar) { if (y > 600) mbar.classList.add('show'); else mbar.classList.remove('show'); }
      if (pbar) pbar.style.transform = 'scaleX(' + Math.min(y / docH(), 1) + ')';
      // parallax-lite: background drifts at 18% of scroll speed, capped, transform-only
      if (heroBg && !reduceMotion && y < window.innerHeight * 1.2) {
        heroBg.style.transform = 'translate3d(0,' + Math.min(y * 0.18, 140) + 'px,0)';
      }
      ticking = false;
    });
  }, { passive: true });

  // auto-stagger: children of card grids reveal sequentially (90ms apart)
  document.querySelectorAll('.benefit, .contact-card, .step, .meta__item').forEach(el => {
    const siblings = Array.from(el.parentElement.children);
    el.style.transitionDelay = (siblings.indexOf(el) * 90) + 'ms';
  });

  // intersection observer: reveal on scroll — with fail-safes
  const revealEls = document.querySelectorAll('.reveal, .program');
  const showAll = () => revealEls.forEach(el => el.classList.add('is-visible'));

  if (reduceMotion || !('IntersectionObserver' in window)) {
    showAll();
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
    revealEls.forEach(el => io.observe(el));

    // safety net: if anything is still hidden shortly after load, reveal it
    window.addEventListener('load', () => {
      setTimeout(() => {
        revealEls.forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && !el.classList.contains('is-visible')) {
            el.classList.add('is-visible');
          }
        });
      }, 400);
    });
  }

  // close mobile menu on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.getElementById('menu').classList.remove('open');
  });

  // program cards: tap/click selects a card and tilts its chip (touch-reliable;
  // hover handles desktop). Selecting one clears the others.
  (function programSelect() {
    var cards = document.querySelectorAll('.program');
    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        var wasSelected = card.classList.contains('is-selected');
        cards.forEach(function (c) { c.classList.remove('is-selected'); });
        if (!wasSelected) card.classList.add('is-selected');
      });
    });
  })();

/* ── Trailing cursor ring (desktop only) ──
   Runs only on hover-capable fine-pointer devices with motion allowed.
   Lerps position + scale on one rAF loop (transform-only, no layout). */
(function cursorRing() {
  var mq = window.matchMedia('(hover: hover) and (pointer: fine)');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!mq.matches || rm.matches) return;

  var ring = document.createElement('div');
  ring.className = 'cursor-ring';
  ring.setAttribute('aria-hidden', 'true');
  document.body.appendChild(ring);

  var tx = -100, ty = -100, x = -100, y = -100;   // target / current position
  var ts = 1, s = 1;                              // target / current scale
  var shown = false, raf = null;

  function loop() {
    x += (tx - x) * 0.18;
    y += (ty - y) * 0.18;
    s += (ts - s) * 0.2;
    ring.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) scale(' + s.toFixed(3) + ')';
    raf = requestAnimationFrame(loop);
  }

  document.addEventListener('mousemove', function (e) {
    tx = e.clientX; ty = e.clientY;
    if (!shown) {
      shown = true;
      x = tx; y = ty;                 // no fly-in from the corner
      ring.classList.add('is-on');
      if (!raf) raf = requestAnimationFrame(loop);
    }
  }, { passive: true });

  document.addEventListener('mouseleave', function () {
    shown = false;
    ring.classList.remove('is-on');
  });

  var HOVER = 'a, button, summary, input, select, textarea, label, [role="button"], .program, .zoomable';
  document.addEventListener('mouseover', function (e) {
    if (e.target.closest && e.target.closest(HOVER)) { ring.classList.add('is-hover'); ts = 1.6; }
  }, { passive: true });
  document.addEventListener('mouseout', function (e) {
    if (e.target.closest && e.target.closest(HOVER)) { ring.classList.remove('is-hover'); ts = 1; }
  }, { passive: true });

  document.addEventListener('mousedown', function () { ts = 0.8; }, { passive: true });
  document.addEventListener('mouseup', function () {
    ts = ring.classList.contains('is-hover') ? 1.6 : 1;
  }, { passive: true });
})();

/* a11y: keep the menu toggle's aria-expanded in sync, and mark the current page in navs */
(function () {
  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');
  if (btn && menu) {
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'menu');
    new MutationObserver(function () {
      btn.setAttribute('aria-expanded', menu.classList.contains('open') ? 'true' : 'false');
    }).observe(menu, { attributes: true, attributeFilter: ['class'] });
  }
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .menu__list a').forEach(function (a) {
    if ((a.getAttribute('href') || '') === here) a.setAttribute('aria-current', 'page');
  });
})();
