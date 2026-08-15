// ===========================================================
// Darshan Enterprises — Shared behaviour
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- Stagger index for grid children ---------- */
  document.querySelectorAll('.reveal-stagger').forEach(group => {
    Array.from(group.children).forEach((child, i) => {
      child.style.setProperty('--i', i);
    });
  });

  /* ---------- Button cursor-follow glow ---------- */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      btn.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      btn.style.setProperty('--my', `${e.clientY - rect.top}px`);
    });
  });

  /* ---------- Sticky header shadow on scroll ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 10 ? '0 4px 18px rgba(11,46,92,.08)' : 'none';
    });
  }

  /* ---------- Contact form submit (demo) ---------- */
  const form = document.querySelector('.contact-form form');
  const toast = document.querySelector('.toast');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        form.reset();
        if (toast) {
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 3200);
        }
      }, 900);
    });
  }

});
