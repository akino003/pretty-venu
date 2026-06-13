/* =============================================
   VENU — JavaScript Interactions (v2)
   ============================================= */

// ─── Stars Background ────────────────────────────────────────
const starsBg = document.getElementById('starsBg');
for (let i = 0; i < 120; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  const size = Math.random() * 2.5 + 0.5;
  star.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${Math.random() * 100}vw;
    top: ${Math.random() * 100}vh;
    --duration: ${Math.random() * 4 + 2}s;
    animation-delay: ${Math.random() * 5}s;
    opacity: ${Math.random() * 0.5 + 0.1};
  `;
  starsBg.appendChild(star);
}

// ─── Cursor Glow ───────────────────────────────────────────────
const cursorGlow = document.getElementById('cursorGlow');
let cx = 0, cy = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', (e) => {
  tx = e.clientX - 14;
  ty = e.clientY - 14;
});

function animateCursor() {
  cx += (tx - cx) * 0.12;
  cy += (ty - cy) * 0.12;
  cursorGlow.style.left = cx + 'px';
  cursorGlow.style.top  = cy + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// ─── Floating Petals ──────────────────────────────────────────
const PETALS    = ['🌸', '🌺', '🌹', '🌷', '✨', '💕', '💗', '🦋', '⭐', '💖', '🥀'];
const container = document.getElementById('petalsContainer');

function createPetal() {
  const el = document.createElement('div');
  el.className = 'petal';
  el.textContent = PETALS[Math.floor(Math.random() * PETALS.length)];
  el.style.left = Math.random() * 100 + 'vw';
  el.style.fontSize = (Math.random() * 16 + 8) + 'px';
  const duration = Math.random() * 10 + 8;
  el.style.animationDuration = duration + 's';
  el.style.animationDelay = Math.random() * 3 + 's';
  el.style.opacity = (Math.random() * 0.5 + 0.25).toString();
  container.appendChild(el);
  setTimeout(() => el.remove(), (duration + 5) * 1000);
}

setInterval(createPetal, 380);
for (let i = 0; i < 12; i++) setTimeout(createPetal, i * 180);

// ─── Audio Player ─────────────────────────────────────────────
const audio     = document.getElementById('bgAudio');
const bars      = document.getElementById('audioBars');
const audioIcon = document.getElementById('audioIcon');
const toggleBtn = document.getElementById('audioToggle');

const PLAY_SVG  = '<polygon points="5,3 19,12 5,21"/>';
const PAUSE_SVG = '<rect x="5" y="4" width="4" height="16" rx="1"/><rect x="15" y="4" width="4" height="16" rx="1"/>';

toggleBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().catch(err => console.warn('Playback error:', err));
    audioIcon.innerHTML = PAUSE_SVG;
    bars.classList.add('playing');
  } else {
    audio.pause();
    audioIcon.innerHTML = PLAY_SVG;
    bars.classList.remove('playing');
  }
});

audio.addEventListener('ended', () => {
  audioIcon.innerHTML = PLAY_SVG;
  bars.classList.remove('playing');
});

// ─── Lightbox ─────────────────────────────────────────────────
const lightbox        = document.getElementById('lightbox');
const lightboxImg     = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

function openLightbox(src, caption) {
  lightboxImg.src = src;
  lightboxCaption.textContent = caption || '';
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => { lightboxImg.src = ''; }, 300);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ─── Scroll Reveal ────────────────────────────────────────────
function addRevealClass() {
  const selectors = [
    '.letter-card', '.gallery-item', '.quote-inner',
    '.video-card',  '.reason-card',  '.closing-card',
    '.section-header', '.beauty-fact', '.us-item',
    '.love-banner', '.beauty-statement-inner',
  ];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = Math.min(i * 0.06, 0.5) + 's';
    });
  });
}

function onScroll() {
  document.querySelectorAll('.reveal').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      el.classList.add('visible');
    }
  });
}

addRevealClass();
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ─── Hero Parallax ────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const heroContent = document.querySelector('.hero-content');
  const heroOrbs    = document.querySelector('.hero-orbs');
  if (heroContent) {
    heroContent.style.transform = `translateY(${y * 0.28}px)`;
    heroContent.style.opacity   = Math.max(0, 1 - y / 600);
  }
  if (heroOrbs) {
    heroOrbs.style.transform = `translateY(${y * 0.15}px)`;
  }
}, { passive: true });

// ─── Heart Burst on Click ─────────────────────────────────────
const HEARTS = ['💗','💕','❤️','🌸','✨','💖','🌹','🥰','🦋'];

const heartStyle = document.createElement('style');
heartStyle.textContent = `
  @keyframes heartFloat {
    0%   { opacity: 1; transform: translate(-50%, -50%) scale(0.4) rotate(var(--rot)); }
    60%  { opacity: 0.8; transform: translate(calc(-50% + var(--dx)), calc(-50% - 90px)) scale(1.3) rotate(var(--rot)); }
    100% { opacity: 0; transform: translate(calc(-50% + var(--dx)), calc(-50% - 170px)) scale(0.7) rotate(var(--rot)); }
  }
`;
document.head.appendChild(heartStyle);

document.addEventListener('click', (e) => {
  if (
    e.target.closest('.audio-player') ||
    e.target.closest('.lightbox') ||
    e.target.closest('.gallery-item') ||
    e.target.closest('.us-item') ||
    e.target.closest('video') ||
    e.target.closest('button')
  ) return;

  for (let i = 0; i < 6; i++) {
    const h = document.createElement('div');
    h.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
    const dx = (Math.random() - 0.5) * 80;
    const rot = (Math.random() - 0.5) * 30 + 'deg';
    h.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      font-size: ${Math.random() * 22 + 12}px;
      pointer-events: none;
      z-index: 9998;
      --dx: ${dx}px;
      --rot: ${rot};
      animation: heartFloat ${0.9 + Math.random() * 0.5}s ease forwards;
      animation-delay: ${i * 0.05}s;
    `;
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1800);
  }
});

// ─── Page Load ────────────────────────────────────────────────
window.addEventListener('load', () => {
  for (let i = 0; i < 25; i++) setTimeout(createPetal, i * 80);
});
