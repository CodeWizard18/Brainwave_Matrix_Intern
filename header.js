// Header Component
export function loadHeader() {
  const header = document.getElementById('header');
  
  if (!header) return;
  
  // Check if on dashboard page
  const isDashboard = document.body.classList.contains('dashboard-body');
  if (isDashboard) return;
  
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  header.innerHTML = `
    <div class="header-container">
      <a href="index.html" class="logo">
        <i class="fas fa-layer-group"></i>
        <span>TaskNest</span>
      </a>
      
      <nav class="nav-links">
        <a href="index.html" class="${currentPage === 'index.html' ? 'active' : ''}">Home</a>
        <a href="features.html" class="${currentPage === 'features.html' ? 'active' : ''}">Features</a>
        <a href="pricing.html" class="${currentPage === 'pricing.html' ? 'active' : ''}">Pricing</a>
        <a href="testimonials.html" class="${currentPage === 'testimonials.html' ? 'active' : ''}">Testimonials</a>
        <a href="contact.html" class="${currentPage === 'contact.html' ? 'active' : ''}">Contact</a>
      </nav>
      
      <div class="nav-cta">
        <a href="login.html" class="btn btn-secondary">Log In</a>
        <a href="signup.html" class="btn btn-primary">Sign Up</a>
      </div>
      
      <button class="hamburger" id="menuToggle">
        <i class="fas fa-bars"></i>
      </button>
    </div>
    
    <div class="mobile-menu" id="mobileMenu">
      <div class="mobile-menu-header">
        <a href="index.html" class="logo">
          <i class="fas fa-layer-group"></i>
          <span>TaskNest</span>
        </a>
        <button class="mobile-menu-close" id="menuClose">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <nav class="mobile-nav-links">
        <a href="index.html" class="${currentPage === 'index.html' ? 'active' : ''}">Home</a>
        <a href="features.html" class="${currentPage === 'features.html' ? 'active' : ''}">Features</a>
        <a href="pricing.html" class="${currentPage === 'pricing.html' ? 'active' : ''}">Pricing</a>
        <a href="testimonials.html" class="${currentPage === 'testimonials.html' ? 'active' : ''}">Testimonials</a>
        <a href="contact.html" class="${currentPage === 'contact.html' ? 'active' : ''}">Contact</a>
      </nav>
      
      <div class="mobile-nav-cta">
        <a href="login.html" class="btn btn-secondary btn-block">Log In</a>
        <a href="signup.html" class="btn btn-primary btn-block">Sign Up</a>
      </div>
    </div>
  `;
  
  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuClose = document.getElementById('menuClose');
  
  if (menuToggle && mobileMenu && menuClose) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.style.display = 'flex';
      setTimeout(() => {
        mobileMenu.classList.add('active');
      }, 10);
      document.body.style.overflow = 'hidden';
    });
    
    menuClose.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      setTimeout(() => {
        mobileMenu.style.display = 'none';
        document.body.style.overflow = '';
      }, 300);
    });
  }
}