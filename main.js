// ==========================================
//  PARTICLES
// ==========================================
(function spawnParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = 28;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      bottom: -${size}px;
      animation-duration: ${Math.random() * 14 + 10}s;
      animation-delay: ${Math.random() * 12}s;
      opacity: 0;
    `;
    container.appendChild(p);
  }
})();

// ==========================================
//  SMOOTH SCROLL (anchor links)
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ==========================================
//  INTERSECTION OBSERVER – fade-in & skills
// ==========================================
const observerOptions = { threshold: 0.15 };

// Fade-in sections
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.glass-card, .timeline-card, .expertise-item').forEach(el => {
  el.classList.add('fade-in');
  fadeObserver.observe(el);
});

// Skill bars animate when in view
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        // Width stored inline; just trigger reflow
        const target = bar.style.width;
        bar.style.width = '0';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            bar.style.width = target;
          });
        });
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-grid').forEach(el => skillObserver.observe(el));

// ==========================================
//  PROFILE IMAGE FALLBACK
// ==========================================
const profileImg = document.getElementById('profileImg');
if (profileImg) {
  profileImg.addEventListener('error', () => {
    profileImg.style.display = 'none';
    const wrapper = profileImg.parentElement;
    const fallback = document.createElement('div');
    fallback.style.cssText = `
      width:100%; height:100%; display:flex; align-items:center;
      justify-content:center; font-size:5rem; background:linear-gradient(135deg,#0ea5e9,#818cf8);
    `;
    fallback.innerHTML = '👨‍🏫';
    wrapper.appendChild(fallback);
  });
}

// ==========================================
//  PARALLAX hero bg (subtle)
// ==========================================
const heroBg = document.querySelector('.hero-bg-overlay');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const offset = window.scrollY;
    heroBg.style.transform = `translateY(${offset * 0.3}px)`;
  }, { passive: true });
}

// ==========================================
//  ACTIVE NAV (optional floating nav indicator)
// ==========================================
// Stagger expertise items
document.querySelectorAll('.expertise-item').forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.07}s`;
});
