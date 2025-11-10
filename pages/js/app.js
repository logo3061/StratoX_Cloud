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
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      // your scroll-dependent logic here
      ticking = false;
    });
    ticking = true;
  }
});

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
document.querySelectorAll('.action-btn, .join-now, .report-now').forEach(btn => {
  btn.addEventListener('click', () => {
    window.open('https://discord.gg/QbbnNPacMZ', '_blank');
  });
});
// Generate starfield dots
(function makeStars(){
  const field = document.querySelector('.starfield');
  if(!field) return;
  const count = 60;
  for(let i=0; i<count; i++){
    const s = document.createElement('span');
    s.style.left = Math.random()*100 + '%';
    s.style.top = Math.random()*100 + '%';
    s.style.animationDelay = (Math.random()*6).toFixed(2) + 's';
    s.style.opacity = (0.3 + Math.random()*0.7).toFixed(2);
    field.appendChild(s);
  }
})();