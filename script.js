// ── NAV scroll effect ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
});

// ── Mobile hamburger ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Dark mode toggle ──
const themeToggle = document.getElementById('themeToggle');
let isDark = localStorage.getItem('brdev-dark') === 'true';

function applyTheme(dark) {
  isDark = dark;
  document.body.classList.toggle('dark', dark);
  localStorage.setItem('brdev-dark', String(dark));
}

applyTheme(isDark);
themeToggle.addEventListener('click', () => applyTheme(!isDark));

// ── Language toggle ──
const langToggle = document.getElementById('langToggle');
let currentLang = localStorage.getItem('brdev-lang') || 'pt';

function applyLang(lang) {
  document.body.classList.remove('lang-pt', 'lang-en');
  document.body.classList.add('lang-' + lang);
  currentLang = lang;
  localStorage.setItem('brdev-lang', lang);

  // Update input/textarea placeholders
  document.querySelectorAll('input[data-pt], textarea[data-pt]').forEach(el => {
    el.placeholder = el.dataset[lang] || '';
  });

  // Update select options
  document.querySelectorAll('select option[data-pt]').forEach(opt => {
    opt.textContent = opt.dataset[lang] || '';
  });
}

applyLang(currentLang);

langToggle.addEventListener('click', () => {
  applyLang(currentLang === 'pt' ? 'en' : 'pt');
});

// ── Typed text effect ──
const phrasesPt = [
  'uma presença digital.',
  'uma loja incrível.',
  'uma identidade visual única.',
  'vídeos que convertem.',
  'uma marca que vende.',
];

const phrasesEn = [
  'a digital presence.',
  'an amazing store.',
  'a unique visual identity.',
  'videos that convert.',
  'a brand that sells.',
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;
const el = document.getElementById('typedText');

function getPhrases() {
  return currentLang === 'pt' ? phrasesPt : phrasesEn;
}

function type() {
  const phrases = getPhrases();
  const current = phrases[phraseIndex % phrases.length];
  if (!deleting) {
    el.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(type, 2000);
      return;
    }
  } else {
    el.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 50 : 80);
}
type();

// ── Scroll reveal ──
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

reveals.forEach(el => revealObserver.observe(el));

// ── Video covers — click to load iframe ──
document.querySelectorAll('.video-cover').forEach(cover => {
  cover.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = cover.dataset.src + '?autoplay=1&rel=0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    Object.assign(iframe.style, { position:'absolute', top:'0', left:'0', width:'100%', height:'100%', border:'0' });
    cover.parentElement.appendChild(iframe);
    cover.remove();
  });
});

// ── Portfolio filter ──
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    portfolioItems.forEach(item => {
      item.classList.toggle('hidden', filter !== 'all' && item.dataset.category !== filter);
    });
  });
});

// ── Contact form → WhatsApp ──
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('.btn');
  const text = btn.querySelector('.btn__text');
  const loading = btn.querySelector('.btn__loading');

  btn.disabled = true;
  text.style.display = 'none';
  loading.style.display = 'inline';

  const name = form.name.value;
  const whatsapp = form.whatsapp.value;
  const service = form.service.value;
  const message = form.message.value;

  const waMsg = encodeURIComponent(
    `Olá! Me chamo *${name}* (${whatsapp}).\n` +
    `Tenho interesse em: *${service || 'Serviço não especificado'}*\n\n` +
    `${message}`
  );

  setTimeout(() => {
    window.open(`https://wa.me/5519993598381?text=${waMsg}`, '_blank');
    btn.disabled = false;
    text.style.display = 'inline';
    loading.style.display = 'none';
    form.reset();
  }, 800);
});
