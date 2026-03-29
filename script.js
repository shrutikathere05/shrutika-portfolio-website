/* ═══════════════════════════════════════════════════════════
   SHRUTIKA THERE — PORTFOLIO  |  script.js  v5.0
   Light Theme Only | Clean & Modern
   ═══════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];


  /* ═══════════════════════════════════════════════════
     1. MOBILE NAV
     ═══════════════════════════════════════════════════ */
  const navToggle = $('.nav-toggle');
  const nav       = $('.nav');
  const navLinks  = $$('.nav__link');

  navToggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  navLinks.forEach(lnk => lnk.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }));


  /* ═══════════════════════════════════════════════════
     2. ACTIVE NAV ON SCROLL
     ═══════════════════════════════════════════════════ */
  const sections = $$('main section[id]');

  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const lnk = $(`.nav__link[href="#${entry.target.id}"]`);
      if (!lnk) return;
      navLinks.forEach(l => l.classList.remove('active'));
      lnk.classList.add('active');
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

  sections.forEach(s => navObserver.observe(s));


  /* ═══════════════════════════════════════════════════
     3. BACK TO TOP
     ═══════════════════════════════════════════════════ */
  const backTop = $('#backTop');

  window.addEventListener('scroll', () => {
    backTop?.classList.toggle('visible', window.scrollY > 450);
  }, { passive: true });

  backTop?.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );


  /* ═══════════════════════════════════════════════════
     4. FLOATING GREETING — Chat bubble with close
     ═══════════════════════════════════════════════════ */
  const floatingGreet      = $('#floatingGreet');
  const floatingGreetClose = $('#floatingGreetClose');

  // Show greeting after 1.2s delay with slide-in animation
  if (floatingGreet) {
    floatingGreet.style.display = 'none';
    floatingGreet.style.opacity = '0';

    setTimeout(() => {
      floatingGreet.style.display = 'block';
      // Trigger reflow
      void floatingGreet.offsetWidth;
      floatingGreet.style.opacity = '1';
    }, 1200);

    floatingGreetClose?.addEventListener('click', () => {
      floatingGreet.classList.add('hidden');
      setTimeout(() => {
        floatingGreet.style.display = 'none';
      }, 450);
    });
  }


  /* ═══════════════════════════════════════════════════
     5. SKILL CARDS — staggered entrance animation
     ═══════════════════════════════════════════════════ */
  const skillCards = $$('.skill-card');

  const skillObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delay = Number(entry.target.dataset.delay) || 0;
      setTimeout(() => {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
      }, delay);
      skillObs.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  skillCards.forEach(card => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    skillObs.observe(card);
  });


  /* ═══════════════════════════════════════════════════
     6. SCROLL REVEAL — generic sections
     ═══════════════════════════════════════════════════ */
  const revealTargets = [
    ...$$('.edu-card'),
    ...$$('.proj-card'),
    ...$$('.exp-card'),
    ...$$('.about-grid'),
    ...$$('.contact-wrap'),
    ...$$('.exp-item'),
  ];

  const revObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach(el => {
    el.classList.add('reveal');
    revObs.observe(el);
  });


  /* ═══════════════════════════════════════════════════
     7. HEADER SCROLL SHADOW
     ═══════════════════════════════════════════════════ */
  const header = $('.site-header');

  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 30) {
      header.style.boxShadow = '0 4px 28px rgba(0,0,0,0.28)';
    } else {
      header.style.boxShadow = '0 2px 24px rgba(0,0,0,0.2)';
    }
  }, { passive: true });


  /* ═══════════════════════════════════════════════════
     8. CONTACT FORM
     ═══════════════════════════════════════════════════ */
  const form       = $('#contactForm');
  const formStatus = $('#formStatus');

  form?.addEventListener('submit', async e => {
    e.preventDefault();

    const btn  = form.querySelector('.cf-submit-btn');
    const orig = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>&nbsp; Sending…';
    btn.disabled  = true;
    if (formStatus) { formStatus.style.color = ''; formStatus.textContent = ''; }

    try {
      // ── Plug in EmailJS or Formspree for production ──
      await new Promise(r => setTimeout(r, 1500));

      if (formStatus) {
        formStatus.style.color = '#10b981';
        formStatus.textContent = '✓ Message sent! I\'ll get back to you shortly.';
      }
      form.reset();
    } catch {
      if (formStatus) {
        formStatus.style.color = '#ef4444';
        formStatus.textContent = '✗ Sending failed. Please try emailing me directly.';
      }
    } finally {
      btn.innerHTML = orig;
      btn.disabled  = false;
      setTimeout(() => {
        if (formStatus) formStatus.textContent = '';
      }, 6000);
    }
  });


  /* ═══════════════════════════════════════════════════
     9. FOOTER YEAR
     ═══════════════════════════════════════════════════ */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ═══════════════════════════════════════════════════
     10. SMOOTH HOVER LIFT on Project Cards
     ═══════════════════════════════════════════════════ */
  $$('.proj-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.willChange = 'transform';
    });
    card.addEventListener('mouseleave', () => {
      card.style.willChange = 'auto';
    });
  });

})();