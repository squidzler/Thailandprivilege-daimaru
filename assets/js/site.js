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
      if (y > 600) mbar.classList.add('show');
      else mbar.classList.remove('show');
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

  // ── runtime injection of human-facing contact values (single source: config.js) ──
  // SEO-critical values stay hardcoded in HTML; only these display values are injected.
  (function injectConfig() {
    var c = window.SITE_CONFIG;
    if (!c) return;
    document.querySelectorAll('[data-cfg]').forEach(function (el) {
      var key = el.getAttribute('data-cfg');
      switch (key) {
        case 'email':
          if (el.tagName === 'A') el.href = 'mailto:' + c.email;
          if (el.hasAttribute('data-cfg-text')) el.textContent = c.email;
          break;
        case 'phone':
          if (el.tagName === 'A') el.href = 'tel:+' + c.whatsapp;
          if (el.hasAttribute('data-cfg-text')) el.textContent = c.phoneDisplay;
          break;
        case 'whatsapp':
          if (el.tagName === 'A') el.href = 'https://wa.me/' + c.whatsapp;
          if (el.hasAttribute('data-cfg-text')) el.textContent = c.phoneDisplay;
          break;
        case 'line':
          if (el.tagName === 'A') el.href = 'https://line.me/ti/p/~' + c.lineId;
          if (el.hasAttribute('data-cfg-text')) el.textContent = c.lineId;
          break;
        case 'contactName':
          el.textContent = c.contactName;
          break;
      }
    });
  })();

  // ── count-up stat counters (hero) — animate when scrolled into view ──
  (function countUp() {
    var stats = document.querySelectorAll('.stat__num[data-target]');
    if (!stats.length) return;
    function run(el) {
      var target = parseFloat(el.getAttribute('data-target'));
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      var sep = el.hasAttribute('data-sep'); // thousands separator
      var fmt = function (n) {
        var v = Math.round(n);
        if (sep) v = v.toLocaleString('en-US');
        return prefix + v + suffix;
      };
      if (reduceMotion) { el.textContent = fmt(target); return; }
      var dur = 1600, t0 = null;
      function frame(t) {
        if (t0 === null) t0 = t;
        var p = Math.min((t - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        el.textContent = fmt(target * eased);
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
    if (reduceMotion || !('IntersectionObserver' in window)) {
      stats.forEach(run);
      return;
    }
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { run(e.target); so.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    stats.forEach(function (el) { so.observe(el); });
  })();
