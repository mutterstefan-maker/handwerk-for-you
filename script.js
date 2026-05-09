/* =============================================
   HANDWERK FOR YOU – JavaScript
   ============================================= */

// ── Loader ──────────────────────────────────
const loader = document.getElementById('loader');
const loaderFill = document.getElementById('loaderFill');

window.addEventListener('load', () => {
  loaderFill.style.width = '100%';
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = 'auto';
    initParticles();
    startCounters();
  }, 1800);
});
document.body.style.overflow = 'hidden';

// ── Custom Cursor ────────────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateFollower() {
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  follower.style.left = fx + 'px';
  follower.style.top = fy + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// ── Navigation ───────────────────────────────
const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('backTop').classList.toggle('visible', window.scrollY > 400);
});

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = burger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ── Particles ────────────────────────────────
function initParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.width = p.style.height = (Math.random() * 3 + 1) + 'px';
    const dur = Math.random() * 15 + 8;
    const delay = Math.random() * 10;
    p.style.animationDuration = dur + 's';
    p.style.animationDelay = delay + 's';
    container.appendChild(p);
  }
}

// ── Scroll Reveal ────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('revealed'), parseInt(delay));
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

// ── Counters ─────────────────────────────────
function startCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target);
    const dur = 2000;
    const step = target / (dur / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current);
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

// ── Project Filter ───────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;
      card.classList.toggle('hidden', !match);
      if (match) {
        card.style.animation = 'none';
        card.offsetHeight;
        card.style.animation = '';
      }
    });
  });
});

// ── Testimonial Slider ────────────────────────
const track = document.getElementById('testimonialTrack');
const dotsContainer = document.getElementById('sliderDots');
const cards = document.querySelectorAll('.testimonial-card');
let current = 0;
let autoSlide;

cards.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(dot);
});

function goTo(index) {
  current = (index + cards.length) % cards.length;
  track.style.transform = `translateX(-${current * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
}

document.getElementById('prevBtn').addEventListener('click', () => { goTo(current - 1); resetAuto(); });
document.getElementById('nextBtn').addEventListener('click', () => { goTo(current + 1); resetAuto(); });

function resetAuto() {
  clearInterval(autoSlide);
  autoSlide = setInterval(() => goTo(current + 1), 5000);
}
autoSlide = setInterval(() => goTo(current + 1), 5000);

// ── Contact Form ──────────────────────────────
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const original = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Nachricht gesendet!';
  btn.style.background = '#25d366';
  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
    e.target.reset();
  }, 3500);
});

// ── Back to Top ───────────────────────────────
document.getElementById('backTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Smooth hover on cards ─────────────────────
document.querySelectorAll('.card-feature, .project-card, .team-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
