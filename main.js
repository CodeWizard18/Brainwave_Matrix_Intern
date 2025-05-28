// Initialize AOS animations
import { loadHeader } from './components/header.js';
import { loadFooter } from './components/footer.js';
import { initAuth } from './auth-manager.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS animation library
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }

  // Load header and footer components
  loadHeader();
  
  // Only load footer if not on dashboard or profile page
  if (!document.querySelector('.dashboard-body')) {
    loadFooter();
  }

  // Initialize authentication
  initAuth();
});

// Handle header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('header:not(.dashboard-header)');
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});