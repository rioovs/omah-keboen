// ponytail: vanilla script covers nav disclosure, smooth scroll, year sync, and today row highlight.
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const dayIndex = new Date().getDay();
  const todayRow = document.querySelector(`.hours-table tr[data-day="${dayIndex}"]`);
  if (todayRow) {
    todayRow.setAttribute('data-today', 'true');
    const dayHeader = todayRow.querySelector('th');
    if (dayHeader && !dayHeader.querySelector('.hours-today-badge')) {
      const badge = document.createElement('span');
      badge.className = 'hours-today-badge';
      badge.textContent = 'Hari ini';
      dayHeader.appendChild(badge);
    }
  }

  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.getElementById('mobile-nav-panel');

  function closeMobileNav() {
    if (!mobileNav || mobileNav.hasAttribute('hidden')) return;
    mobileNav.setAttribute('hidden', '');
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
    }
  }

  function openMobileNav() {
    if (!mobileNav) return;
    mobileNav.removeAttribute('hidden');
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'true');
    }
  }

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        closeMobileNav();
        navToggle.focus();
      }
    });
  }

  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        closeMobileNav();
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    });
  });
});
