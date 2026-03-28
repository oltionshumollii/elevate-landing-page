// script.js
document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const header = document.getElementById('header');
  const themeToggle = document.getElementById('themeToggle');
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const progressBar = document.getElementById('progressBar');
  const contactForm = document.getElementById('contactForm');
  const toastContainer = document.getElementById('toastContainer');
  const logoImg = document.getElementById('logoImg');
  const footerLogo = document.getElementById('footerLogo');

  // ======================= DARK / LIGHT MODE =======================
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateLogoByTheme(theme);
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  }

  function updateLogoByTheme(theme) {
    // Dynamic SVG logos (light mode uses dark text, dark mode uses light text)
    if (theme === 'dark') {
      const darkLogoSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 40'%3E%3Ctext x='0' y='28' font-family='monospace' font-size='24' fill='%23ffffff'%3ENEXUS%3C/text%3E%3C/svg%3E`;
      if (logoImg) logoImg.src = darkLogoSvg;
      if (footerLogo) footerLogo.src = darkLogoSvg;
    } else {
      const lightLogoSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 40'%3E%3Ctext x='0' y='28' font-family='monospace' font-size='24' fill='%23007bff'%3ENEXUS%3C/text%3E%3C/svg%3E`;
      if (logoImg) logoImg.src = lightLogoSvg;
      if (footerLogo) footerLogo.src = lightLogoSvg;
    }
  }

  const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    showToast(`Switched to ${newTheme} mode`, 'success');
  });

  // ======================= MOBILE MENU =======================
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
    });
  });

  // ======================= SCROLL PROGRESS BAR =======================
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });

  // ======================= COUNTER ANIMATION (Intersection Observer) =======================
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const updateCounter = () => {
          const target = parseInt(counter.getAttribute('data-target'));
          let current = parseInt(counter.innerText);
          const step = Math.ceil(target / 50);
          if (current < target) {
            current = Math.min(current + step, target);
            counter.innerText = current;
            setTimeout(updateCounter, 20);
          } else {
            counter.innerText = target;
          }
        };
        updateCounter();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(counter => counterObserver.observe(counter));

  // ======================= SCROLL REVEAL ANIMATIONS =======================
  const revealElements = document.querySelectorAll('.about-card, .service-card, .feature-item, .stat-item, .accordion-item, .contact-form, .contact-info');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.6s ease';
    revealObserver.observe(el);
  });

  // ======================= FAQ ACCORDION =======================
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      accordionItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  // ======================= TOAST NOTIFICATION =======================
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i> ${message}`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  // ======================= FORM VALIDATION & SUBMIT =======================
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!name || !email || !message) {
      showToast('All fields are required.', 'error');
      return;
    }
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    // Simulate successful send
    showToast(`Thank you ${name}! Your message has been received.`, 'success');
    contactForm.reset();
  });

  // ======================= SMOOTH SCROLLING (all anchor links) =======================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === "#" || href === "") return;
      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ======================= OPTIONAL: GLASS BACKGROUND CANVAS (subtle particle) =======================
  // Adding a simple subtle moving gradient on hero for polish
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    let angle = 0;
    setInterval(() => {
      angle = (angle + 1) % 360;
      const sphere = document.querySelector('.glass-sphere');
      if (sphere) {
        sphere.style.background = `radial-gradient(circle at 30% 30%, rgba(59,130,246,0.4), rgba(139,92,246,0.2))`;
      }
    }, 3000);
  }

  // initial active accordion state (first open for visual)
  if (accordionItems.length) accordionItems[0].classList.add('active');
});