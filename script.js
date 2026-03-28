// script.js - Dark/Light Mode, Mobile Menu, Smooth Scroll, Form Validation

// ========== DOM Elements ==========
const themeToggle = document.getElementById('themeToggle');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

// ========== Theme Management ==========
// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  updateThemeIcon(true);
} else if (savedTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
  updateThemeIcon(false);
} else {
  // Check system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon(true);
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    updateThemeIcon(false);
  }
}

function updateThemeIcon(isDark) {
  const icon = themeToggle.querySelector('i');
  if (isDark) {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    updateThemeIcon(false);
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    updateThemeIcon(true);
  }
}

themeToggle.addEventListener('click', toggleTheme);

// ========== Mobile Hamburger Menu ==========
function toggleMobileMenu() {
  navMenu.classList.toggle('active');
  const icon = hamburgerBtn.querySelector('i');
  if (navMenu.classList.contains('active')) {
    icon.className = 'fas fa-times';
    document.body.style.overflow = 'hidden';
  } else {
    icon.className = 'fas fa-bars';
    document.body.style.overflow = '';
  }
}

function closeMobileMenu() {
  if (navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    hamburgerBtn.querySelector('i').className = 'fas fa-bars';
    document.body.style.overflow = '';
  }
}

hamburgerBtn.addEventListener('click', toggleMobileMenu);

// Close menu when clicking a nav link
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    closeMobileMenu();
    // Smooth scroll is handled by CSS, but we prevent default hash jump
    const targetId = link.getAttribute('href');
    if (targetId && targetId !== '#') {
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ========== Smooth Scrolling for all anchor links ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Update URL without jumping
      history.pushState(null, null, href);
    }
  });
});

// ========== Form Validation ==========
function validateForm(name, email, message) {
  let isValid = true;
  
  // Clear previous errors
  document.querySelectorAll('.error-message').forEach(el => {
    el.style.display = 'none';
    el.textContent = '';
  });
  
  // Name validation
  if (!name.trim()) {
    showError('nameError', 'Full name is required');
    isValid = false;
  } else if (name.trim().length < 2) {
    showError('nameError', 'Name must be at least 2 characters');
    isValid = false;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
  if (!email.trim()) {
    showError('emailError', 'Email address is required');
    isValid = false;
  } else if (!emailRegex.test(email.trim())) {
    showError('emailError', 'Please enter a valid email address (e.g., name@example.com)');
    isValid = false;
  }
  
  // Message validation
  if (!message.trim()) {
    showError('messageError', 'Message cannot be empty');
    isValid = false;
  } else if (message.trim().length < 10) {
    showError('messageError', 'Message must be at least 10 characters');
    isValid = false;
  }
  
  return isValid;
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
}

function showSuccessMessage() {
  if (formSuccess) {
    formSuccess.textContent = '✓ Message sent successfully! We\'ll get back to you soon.';
    formSuccess.style.display = 'block';
    setTimeout(() => {
      formSuccess.style.display = 'none';
    }, 5000);
  }
}

function resetFormFields() {
  if (contactForm) {
    contactForm.reset();
  }
}

// Handle form submission
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (validateForm(name, email, message)) {
      // Simulate form submission (demo purposes)
      showSuccessMessage();
      resetFormFields();
    }
  });
}

// ========== Active Navigation Highlight on Scroll ==========
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 100; // Offset for header
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Add active class styling
const style = document.createElement('style');
style.textContent = `
  .nav-link.active {
    color: var(--accent);
  }
  .nav-link.active::after {
    width: 100%;
  }
`;
document.head.appendChild(style);

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// ========== Close mobile menu on window resize ==========
window.addEventListener('resize', () => {
  if (window.innerWidth > 968 && navMenu.classList.contains('active')) {
    closeMobileMenu();
  }
});

// ========== Additional UX: Add some entrance animations for cards ==========
// Intersection Observer for fade-in on scroll (enhancement)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply to feature cards for smooth scroll reveal if not already visible
document.querySelectorAll('.feature-card, .about-content, .contact-info').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Immediately set visible for any that are already in view
setTimeout(() => {
  document.querySelectorAll('.feature-card, .about-content, .contact-info').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
}, 100);

// ========== Console log for demo purposes ==========
console.log('Elevate website loaded — Dark mode, mobile menu, and form validation active.');