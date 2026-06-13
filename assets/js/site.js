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
