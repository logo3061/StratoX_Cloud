// js/app.js
// Scroll reveal + simple parallax + sheen micro-movement
(() => {
  // IntersectionObserver for reveal animations
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('revealed');
        // if it is a liquid glass card, also add the 'revealed' to start sheen
        if (el.classList.contains('liquid-glass') || el.closest('.liquid-glass')) {
          (el.classList.contains('liquid-glass') ? el : el.closest('.liquid-glass')).classList.add('revealed');
        }
        io.unobserve(el);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(r => io.observe(r));

  // Hero parallax for background layer using mouse + scroll
  const hero = document.getElementById('hero');
  const bg = document.querySelector('.bg-layer');

  // simple scroll parallax:
  window.addEventListener('scroll', () => {
    if (!bg) return;
    const rect = hero.getBoundingClientRect();
    const pct = Math.min(Math.max((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0), 1);
    // translate a little for depth
    bg.style.transform = `translate3d(0, ${pct * -20}px, 0) scale(${1 + pct * 0.02})`;
  }, { passive: true });

  // sheen follow on pointer inside each glass card for micro-interaction

  // Very simple starfield using canvas (subtle)
  (function starfield() {
const canvas = document.getElementById('globalStarfield');
const ctx = canvas.getContext('2d');

let stars = [];
let w, h;

function initStars() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  stars = [];
  for(let i = 0; i < 250; i++){ // number of stars
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5,
      d: Math.random() * 0.5 + 0.1 // speed
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = 'white';
  ctx.beginPath();
  stars.forEach(s => {
    ctx.moveTo(s.x, s.y);
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
  });
  ctx.fill();
  moveStars();
}

function moveStars() {
  stars.forEach(s => {
    s.y += s.d;
    if(s.y > h){
      s.y = 0;
      s.x = Math.random() * w;
    }
  });
  requestAnimationFrame(drawStars);
}

window.addEventListener('resize', initStars);
initStars();
drawStars();
  })();
})();
