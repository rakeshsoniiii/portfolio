/* ============================================================
   SCRIPT — Starfield + Scroll Animations
   ============================================================ */

(function () {
  'use strict';

  // ─── Starfield Canvas ───────────────────────────────────────
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let stars = [];
  let animFrame;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStars(count) {
    stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.3 + 0.2,
        opacity: Math.random() * 0.7 + 0.1,
        twinkleSpeed: Math.random() * 0.008 + 0.002,
        twinkleOffset: Math.random() * Math.PI * 2,
        // Slow drift
        dx: (Math.random() - 0.5) * 0.04,
        dy: (Math.random() - 0.5) * 0.02,
      });
    }
  }

  function drawStars(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const star of stars) {
      // Twinkle
      const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
      const alpha = star.opacity + twinkle * 0.2;

      // Drift
      star.x += star.dx;
      star.y += star.dy;

      // Wrap around
      if (star.x < 0) star.x = canvas.width;
      if (star.x > canvas.width) star.x = 0;
      if (star.y < 0) star.y = canvas.height;
      if (star.y > canvas.height) star.y = 0;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 210, 225, ${Math.max(0.05, Math.min(1, alpha))})`;
      ctx.fill();
    }

    animFrame = requestAnimationFrame(drawStars);
  }

  function initStarfield() {
    resize();
    const density = Math.floor((canvas.width * canvas.height) / 3500);
    createStars(Math.min(density, 600));
    drawStars(0);
  }

  window.addEventListener('resize', () => {
    resize();
    const density = Math.floor((canvas.width * canvas.height) / 3500);
    createStars(Math.min(density, 600));
  });

  initStarfield();


  // ─── Scroll-triggered Fade-in ───────────────────────────────
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px',
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section__content').forEach((el) => {
    fadeObserver.observe(el);
  });


  // ─── Active Nav Link on Scroll ──────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();


  // ─── Mobile Hamburger Menu ──────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('navLinks');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinksEl.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinksEl.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinksEl.classList.remove('open');
      });
    });
  }

})();
