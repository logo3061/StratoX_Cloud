// js/app.js
(() => {
  // ------------------------------
  // IntersectionObserver for reveal animations
  // ------------------------------
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('revealed');
        // also trigger sheen for liquid glass
        const glass = el.classList.contains('liquid-glass') ? el : el.closest('.liquid-glass');
        if (glass) glass.classList.add('revealed');
        io.unobserve(el);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(r => io.observe(r));

  // ------------------------------
  // Hero parallax for background (scroll + mouse)
  // ------------------------------
  const hero = document.getElementById('hero');
  const bg = document.querySelector('.bg-layer');

  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        if (!bg || !hero) return;
        const rect = hero.getBoundingClientRect();
        const pct = Math.min(Math.max((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0), 1);
        bg.style.transform = `translate3d(0, ${pct * -20}px, 0) scale(${1 + pct * 0.02})`;
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  // ------------------------------
  // Sheen micro-interaction for liquid glass cards
  // ------------------------------
  document.querySelectorAll('.liquid-glass').forEach(card => {
    const sheen = card.querySelector('.sheen');
    if (!sheen) return;

    let mouseTicking = false;
    card.addEventListener('pointermove', e => {
      if (!mouseTicking) {
        window.requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;
          sheen.style.transform = `translate3d(${(x - 0.5) * 20}px, ${(y - 0.5) * 20}px, 0)`;
          mouseTicking = false;
        });
        mouseTicking = true;
      }
    });
  });

  // ------------------------------
  // Starfield (canvas animation)
  // ------------------------------
  const canvas = document.getElementById('globalStarfield');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let stars = [];
    let w = window.innerWidth;
    let h = window.innerHeight;

    function initStars() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      stars = [];
      const starCount = window.innerWidth < 768 ? 20 : 50; // fewer stars on mobile
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.5,
          d: Math.random() * 0.5 + 0.1
        });
      }
    }

    function animateStars() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'white';
      ctx.beginPath();
      stars.forEach(s => {
        ctx.moveTo(s.x, s.y);
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        s.y += s.d;
        if (s.y > h) {
          s.y = 0;
          s.x = Math.random() * w;
        }
      });
      ctx.fill();
      requestAnimationFrame(animateStars);
    }

    window.addEventListener('resize', initStars);
    initStars();
    animateStars();
  }

  // ------------------------------
  // Mobile menu toggle
  // ------------------------------
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
  }
})();
