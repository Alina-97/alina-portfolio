

/* ── Custom Cursor ──────────────────────────────────────────── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let cx = 0, cy = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  cx = e.clientX;
  cy = e.clientY;
  cursor.style.left = cx + 'px';
  cursor.style.top  = cy + 'px';
});

function animateRing() {
  rx += (cx - rx) * 0.12;
  ry += (cy - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll(
  'a, button, .skill-card, .exp-card, .project-card, .cert-card, .contact-item'
).forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '20px';
    cursor.style.height = '20px';
    ring.style.width    = '60px';
    ring.style.height   = '60px';
    ring.style.opacity  = '0.8';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '12px';
    cursor.style.height = '12px';
    ring.style.width    = '40px';
    ring.style.height   = '40px';
    ring.style.opacity  = '0.5';
  });
});

/* ── Navbar Scroll Effect ───────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ── Smooth Scroll ──────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ── Scroll Reveal ──────────────────────────────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 0.05}s`;
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── Parallax Effect ────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  const p1     = document.getElementById('parallaxBg1');
  const p1rect = document.getElementById('parallax1')?.getBoundingClientRect();
  if (p1 && p1rect && p1rect.bottom > 0 && p1rect.top < window.innerHeight) {
    const progress = -p1rect.top / window.innerHeight;
    p1.style.transform = `scale(1.1) translateY(${progress * 80}px)`;
  }

  const p2     = document.getElementById('parallaxBg2');
  const p2rect = document.getElementById('parallax2')?.getBoundingClientRect();
  if (p2 && p2rect && p2rect.bottom > 0 && p2rect.top < window.innerHeight) {
    const progress = -p2rect.top / window.innerHeight;
    p2.style.transform = `scale(1.2) translateY(${progress * 60}px)`;
  }
});

/* ── Experience Tabs ────────────────────────────────────────── */
document.querySelectorAll('.exp-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    document.querySelectorAll('.exp-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.exp-panel').forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(target)?.classList.add('active');
  });
});

/* ── Contact Form ───────────────────────────────────────────── */
const sendBtn = document.getElementById('sendBtn');
if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const name    = document.getElementById('contactName')?.value.trim();
    const email   = document.getElementById('contactEmail')?.value.trim();
    const subject = document.getElementById('contactSubject')?.value.trim();
    const message = document.getElementById('contactMessage')?.value.trim();

    if (!name || !email || !message) {
      alert('Please fill in your name, email, and message.');
      return;
    }

    const mailto = `mailto:mamoshebimokhathi@gmail.com`
      + `?subject=${encodeURIComponent(subject || 'Portfolio Contact')}`
      + `&body=${encodeURIComponent(`Hi Alina,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`)}`;

    window.location.href = mailto;
  });
}