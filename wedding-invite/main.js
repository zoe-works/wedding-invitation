/* ============================================
   Wedding Invitation - main.js
   外部依存なし・Vanilla JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initSmoothScroll();
  initHamburger();
  initGalleryModal();
  initCopyAddress();
  initFAQ();
  initFadeIn();
});

/* ---------- Header scroll effect ---------- */
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- Smooth scroll ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      // Close mobile nav
      const nav = document.getElementById('nav');
      const hamburger = document.getElementById('hamburger');
      if (nav) nav.classList.remove('open');
      if (hamburger) hamburger.classList.remove('active');

      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/* ---------- Hamburger menu ---------- */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
      nav.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });
}

/* ---------- Gallery Modal ---------- */
function initGalleryModal() {
  const modal = document.getElementById('gallery-modal');
  const modalImage = document.getElementById('modal-image');
  const modalClose = document.getElementById('modal-close');
  const modalPrev = document.getElementById('modal-prev');
  const modalNext = document.getElementById('modal-next');
  const items = document.querySelectorAll('.gallery-item');

  if (!modal || !modalImage || items.length === 0) return;

  let currentIndex = 0;
  const images = [];

  items.forEach((item, index) => {
    const img = item.querySelector('img');
    if (img) {
      images.push(img.src);
      item.addEventListener('click', () => openModal(index));
    }
  });

  function openModal(index) {
    currentIndex = index;
    modalImage.src = images[currentIndex];
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImage.src = images[currentIndex];
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    modalImage.src = images[currentIndex];
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalPrev) modalPrev.addEventListener('click', showPrev);
  if (modalNext) modalNext.addEventListener('click', showNext);

  // Background click to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
}



/* ---------- FAQ Accordion ---------- */
function initFAQ() {
  const questions = document.querySelectorAll('.faq-question');

  questions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item.active').forEach(activeItem => {
        activeItem.classList.remove('active');
        activeItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked (if was closed)
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}


/* ---------- Fade-in on scroll ---------- */
function initFadeIn() {
  const targets = document.querySelectorAll('.section-title, .detail-card, .about-inner, .timeline-item, .access-inner, .gallery-item, .rsvp-main, .faq-item, .contact-card');

  targets.forEach(el => el.classList.add('fade-in'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    targets.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all
    targets.forEach(el => el.classList.add('visible'));
  }
}

/* ---------- Toast ---------- */
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
