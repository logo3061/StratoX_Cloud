
// Config
const GAME_URL = "https://discord.gg/47ZPCDSaDE"; // TODO: replace with your game link
const nav = document.querySelector('#topNav');
const brand = document.querySelector('#brandTxt');

// Scroll -> navbar style
function setNav() {
  const trig = document.querySelector('#scrollTrigger');
  if (!trig) return;
  const rect = trig.getBoundingClientRect();


    nav.classList.add('nav-scrolled');
    brand.classList.remove('text-white');
    brand.classList.add('text-white'); // force black text
}

document.addEventListener('scroll', setNav, { passive: true });
window.addEventListener('load', setNav);

// Intersection reveal (stagger per section)
const sectionObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const container = entry.target;
      const items = container.querySelectorAll('.reveal, .reveal-right, .reveal-scale');
      items.forEach((el, i)=>{
        setTimeout(()=>el.classList.add('in-view'), 80 * i);
      });
      sectionObserver.unobserve(container);
    }
  });
},{ threshold: 0.15 });


document.querySelectorAll('[data-reveal-group]').forEach(group=>sectionObserver.observe(group));

// Generic reveal for standalone elements
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in-view'); revealObserver.unobserve(e.target); }
  });
},{ threshold: .12 });
document.querySelectorAll('.reveal, .reveal-right, .reveal-scale').forEach(el=>revealObserver.observe(el));

// Chunked hero headline animation
function animateHeroChunks() {
  const container = document.getElementById('heroChunks');
  if (!container) return;
  const text = container.getAttribute('data-text') || 'StratoX™ by Shadow';
  // Split into word chunks for stronger impact
  const chunks = text.split(' ');
  container.innerHTML = '';
  chunks.forEach((chunk, idx)=>{
    const span = document.createElement('span');
    span.className = 'hero-chunk text-white drop-shadow-xl';
    span.style.marginRight = '0.5ch';
    span.textContent = chunk;
    container.appendChild(span);
    // stagger
    setTimeout(()=>span.classList.add('show'), 220 * idx);
  });
}
window.addEventListener('load', animateHeroChunks);

// Smooth anchors
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click', e=>{
  const target = document.querySelector(a.getAttribute('href'));
  if(target){ e.preventDefault(); target.scrollIntoView({ behavior:'smooth', block:'start' }); }
}));

// Play buttons open the game
document.querySelectorAll('.play-btn').forEach(btn=>btn.addEventListener('click', ()=>window.open(GAME_URL, '_blank')));

// Optional subtle tilt on pointer move for .tilt containers
document.querySelectorAll('.tilt').forEach(card=>{
  card.addEventListener('mousemove', (e)=>{
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const rx = ((y / r.height) - 0.5) * -10;
    const ry = ((x / r.width) - 0.5) * 10;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
  });
  card.addEventListener('mouseleave', ()=>card.style.transform = '');
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
