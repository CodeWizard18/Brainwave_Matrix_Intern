// Footer Component
export function loadFooter() {
  const footer = document.getElementById('footer');
  
  if (!footer) return;
  
  footer.innerHTML = `
    <div class="container">
      <div class="footer-container">
        <div class="footer-about">
          <a href="index.html" class="footer-logo">
            <i class="fas fa-layer-group"></i>
            <span>TaskNest</span>
          </a>
          <p>TaskNest helps teams stay organized, focused, and productive with intelligent task management and collaboration tools.</p>
          <div class="footer-social">
            <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
        
        <div class="footer-links">
          <h3>Product</h3>
          <nav class="footer-nav">
            <a href="features.html">Features</a>
            <a href="pricing.html">Pricing</a>
            <a href="#">Security</a>
            <a href="#">Enterprise</a>
            <a href="#">Integrations</a>
          </nav>
        </div>
        
        <div class="footer-links">
          <h3>Company</h3>
          <nav class="footer-nav">
            <a href="#">About Us</a>
            <a href="testimonials.html">Customers</a>
            <a href="#">Careers</a>
            <a href="contact.html">Contact</a>
            <a href="#">Blog</a>
          </nav>
        </div>
        
        <div class="footer-links">
          <h3>Resources</h3>
          <nav class="footer-nav">
            <a href="#">Help Center</a>
            <a href="#">Documentation</a>
            <a href="#">Guides</a>
            <a href="#">API Reference</a>
            <a href="#">Community</a>
          </nav>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p class="footer-copyright">© 2025 TaskNest, Inc. All rights reserved.</p>
        <div class="footer-legal">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookie Settings</a>
        </div>
      </div>
    </div>
  `;
}