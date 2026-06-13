/* =============================================
   VENU — Aurora Edition Scripts
   ============================================= */

// ─── Particle Canvas ──────────────────────────────────────────
const canvas = document.getElementById('particleCanvas');
const ctx    = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const COLORS = [
  'rgba(124,58,237,',
  'rgba(16,185,129,',
  'rgba(6,182,212,',
  'rgba(232,121,249,',
  'rgba(167,139,250,',
];

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.8 + 0.3;
    this.speed = Math.random() * 0.4 + 0.1;
    this.angle = Math.random() * Math.PI * 2;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.opacity = Math.random() * 0.5 + 0.1;
    this.twinkleSpeed = Math.random() * 0.02 + 0.005;
    this.twinklePhase = Math.random() * Math.PI * 2;
    this.driftX = (Math.random() - 0.5) * 0.2;
  }
  update() {
    this.y -= this.speed;
    this.x += this.driftX;
    this.twinklePhase += this.twinkleSpeed;
    this.currentOpacity = this.opacity * (0.5 + 0.5 * Math.sin(this.twinklePhase));
    if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color + this.currentOpacity + ')';
    ctx.fill();
  }
}

for (let i = 0; i < 180; i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ─── Custom Cursor ────────────────────────────────────────────
const cursorOuter = document.getElementById('cursorOuter');
const cursorDot   = document.getElementById('cursorDot');
let ox = 0, oy = 0, dx = 0, dy = 0;

document.addEventListener('mousemove', e => {
  dx = e.clientX - 18;
  dy = e.clientY - 18;
  cursorDot.style.left = (e.clientX - 3) + 'px';
  cursorDot.style.top  = (e.clientY - 3) + 'px';
});

function smoothCursor() {
  ox += (dx - ox) * 0.1;
  oy += (dy - oy) * 0.1;
  cursorOuter.style.left = ox + 'px';
  cursorOuter.style.top  = oy + 'px';
  requestAnimationFrame(smoothCursor);
}
smoothCursor();

document.querySelectorAll('button, a, .polaroid, .film-frame, .s-pill, .btn-view-more').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorOuter.style.transform = 'scale(1.8)';
    cursorOuter.style.borderColor = 'rgba(16,185,129,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursorOuter.style.transform = 'scale(1)';
    cursorOuter.style.borderColor = 'rgba(124,58,237,0.7)';
  });
});

// ─── Typewriter Effect ────────────────────────────────────────
const phrases = [
  "I mean this with every heartbeat — you are the prettiest.",
  "Whenever you doubt yourself, remember: Alein says you're perfect.",
  "The most beautiful woman in the entire world. No contest.",
  "Your beauty radiates from your soul. Everyone can see it.",
];
let phraseIndex = 0, charIndex = 0, isDeleting = false;
const typeEl = document.getElementById('typewriterText');

function typeWrite() {
  const current = phrases[phraseIndex];
  const displayed = isDeleting
    ? current.slice(0, charIndex--)
    : current.slice(0, charIndex++);

  typeEl.innerHTML = displayed + '<span class="cursor-blink"></span>';

  if (!isDeleting && charIndex > current.length) {
    isDeleting = true;
    setTimeout(typeWrite, 2200);
    return;
  }
  if (isDeleting && charIndex < 0) {
    isDeleting = false;
    charIndex = 0;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typeWrite, 400);
    return;
  }
  setTimeout(typeWrite, isDeleting ? 30 : 55);
}
setTimeout(typeWrite, 2000);

// ─── Audio Player ─────────────────────────────────────────────
const audio      = document.getElementById('bgAudio');
const pillWave   = document.getElementById('pillWave');
const playIcon   = document.getElementById('pillPlayIcon');
const toggleBtn  = document.getElementById('audioToggle');

toggleBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().catch(e => console.warn(e));
    playIcon.textContent = '❚❚';
    pillWave.classList.add('playing');
  } else {
    audio.pause();
    playIcon.textContent = '▶';
    pillWave.classList.remove('playing');
  }
});

// ─── Letter Envelope ──────────────────────────────────────────
const envelope      = document.getElementById('letterEnvelope');
const letterContent = document.getElementById('letterContent');

envelope.addEventListener('click', () => {
  envelope.classList.add('flap-open');
  setTimeout(() => {
    envelope.classList.add('opened');
    letterContent.classList.add('visible');
  }, 500);
});

// ─── Polaroid Gallery ─────────────────────────────────────────
const photoData = [
  { src: 'images/WhatsApp Image 2026-06-04 at 10.54.32 PM.jpeg',    caption: 'glowing ✨',         rot: -4  },
  { src: 'images/WhatsApp Image 2026-06-04 at 11.04.52 PM.jpeg',    caption: 'stunning 🌸',        rot: 2   },
  { src: 'images/WhatsApp Image 2026-06-04 at 11.04.53 PM.jpeg',    caption: 'prettiest smile 😍', rot: -2  },
  { src: 'images/WhatsApp Image 2026-06-04 at 11.04.53 PM (1).jpeg',caption: 'a queen 👑',         rot: 3   },
  { src: 'images/WhatsApp Image 2026-06-04 at 11.04.53 PM (2).jpeg',caption: 'effortless 🦋',      rot: -3  },
  { src: 'images/WhatsApp Image 2026-06-04 at 11.04.54 PM.jpeg',    caption: 'my favorite 💫',     rot: 1.5 },
  { src: 'images/WhatsApp Image 2026-06-04 at 11.04.54 PM (1).jpeg',caption: 'breathtaking 🌺',    rot: -2.5},
  { src: 'images/WhatsApp Image 2026-06-04 at 11.04.54 PM (2).jpeg',caption: 'radiant 💗',         rot: 3.5 },
  { src: 'images/WhatsApp Image 2026-06-04 at 11.04.54 PM (3).jpeg',caption: 'like a dream 🌙',    rot: -1  },
  { src: 'images/WhatsApp Image 2026-06-04 at 11.04.55 PM.jpeg',    caption: 'the prettiest ⭐',   rot: 2.5 },
  { src: 'images/WhatsApp Image 2026-06-04 at 11.04.55 PM (1).jpeg',caption: 'forever lovely 🌷',  rot: -3.5},
  { src: 'images/WhatsApp Image 2026-06-13 at 4.16.30 PM.jpeg',     caption: 'beautiful today 💖', rot: 1   },
  { src: 'images/WhatsApp Image 2026-06-13 at 4.16.30 PM (1).jpeg', caption: 'getting prettier 🥰',rot: -2  },
];

const wall    = document.getElementById('polaroidWall');
const VISIBLE = 8;

photoData.forEach((photo, i) => {
  const pol = document.createElement('div');
  pol.className = 'polaroid' + (i >= VISIBLE ? ' hidden' : '');
  pol.style.transform = `rotate(${photo.rot}deg)`;
  pol.style.transitionDelay = (i * 0.06) + 's';
  pol.innerHTML = `
    <div class="polaroid-img-wrap">
      <img src="${photo.src}" alt="Venu" loading="lazy" />
    </div>
    <p class="polaroid-caption">${photo.caption}</p>
  `;
  pol.addEventListener('click', () => {
    openLightbox(photo.src, photo.caption);
  });
  wall.appendChild(pol);
});

const viewMoreBtn = document.getElementById('viewMoreBtn');
let allShown = false;

viewMoreBtn.addEventListener('click', () => {
  const hidden = wall.querySelectorAll('.polaroid.hidden');
  if (!allShown) {
    hidden.forEach(p => p.classList.remove('hidden'));
    viewMoreBtn.textContent = 'Show Less ↑';
    allShown = true;
  } else {
    wall.querySelectorAll('.polaroid').forEach((p, i) => {
      if (i >= VISIBLE) p.classList.add('hidden');
    });
    viewMoreBtn.textContent = 'See All Photos ↓';
    allShown = false;
  }
});

// ─── Lightbox ─────────────────────────────────────────────────
const lightbox   = document.getElementById('lightbox');
const lboxImg    = document.getElementById('lboxImg');
const lboxCaption = document.getElementById('lboxCaption');

function openLightbox(src, caption) {
  lboxImg.src = src;
  lboxCaption.textContent = caption || '';
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => { lboxImg.src = ''; }, 300);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// ─── Scroll Reveal ────────────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.polaroid, .letter-content, .s-pill, .closing-inner, .section-heading, .section-note, .section-label, .love-banner, .us-film-strip, .us-love-text, .statement-inner, .vid-card'
);

revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = Math.min(i * 0.04, 0.4) + 's';
});

const reasonRows = document.querySelectorAll('.reason-row');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));
reasonRows.forEach(el => observer.observe(el));

// ─── Hero Parallax ────────────────────────────────────────────
const heroContent = document.querySelector('.hero-content');
const auroraBg    = document.getElementById('auroraBg');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (heroContent) {
    heroContent.style.transform = `translateY(${y * 0.25}px)`;
    heroContent.style.opacity   = Math.max(0, 1 - y / 550);
  }
  if (auroraBg) {
    auroraBg.style.transform = `translateY(${y * 0.08}px)`;
  }
}, { passive: true });

// ─── Sparks on Click ──────────────────────────────────────────
const SPARKS = ['✦','⋆','✧','◆','•','⭐','💜','🌿','✨'];

const sparkStyle = document.createElement('style');
sparkStyle.textContent = `
  @keyframes sparkFloat {
    0%   { opacity: 1; transform: translate(-50%,-50%) scale(0.5) rotate(var(--r)); }
    100% { opacity: 0; transform: translate(calc(-50% + var(--dx)), calc(-50% - var(--dy))) scale(1.2) rotate(calc(var(--r) + 180deg)); }
  }
`;
document.head.appendChild(sparkStyle);

document.addEventListener('click', e => {
  if (e.target.closest('.audio-pill,.lightbox,.polaroid,.film-frame,video,button')) return;
  for (let i = 0; i < 7; i++) {
    const spark = document.createElement('div');
    spark.textContent = SPARKS[Math.floor(Math.random() * SPARKS.length)];
    const angle = (360 / 7) * i;
    const dist  = Math.random() * 60 + 30;
    const dx    = Math.sin(angle * Math.PI / 180) * dist;
    const dy    = Math.cos(angle * Math.PI / 180) * dist + 40;
    const rot   = (Math.random() - 0.5) * 60 + 'deg';
    spark.style.cssText = `
      position: fixed;
      left: ${e.clientX}px; top: ${e.clientY}px;
      font-size: ${Math.random() * 14 + 8}px;
      pointer-events: none; z-index: 9998;
      --dx: ${dx}px; --dy: ${dy}px; --r: ${rot};
      color: ${['#a78bfa','#10b981','#e879f9','#06b6d4','#fbbf24'][Math.floor(Math.random()*5)]};
      animation: sparkFloat ${0.7 + Math.random() * 0.5}s ease forwards;
      animation-delay: ${i * 0.04}s;
    `;
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 1500);
  }
});

// ─── Page Load Burst ──────────────────────────────────────────
window.addEventListener('load', () => {
  // Extra particles burst on load
  for (let i = 0; i < 30; i++) {
    setTimeout(() => particles.push(new Particle()), i * 50);
  }
});
