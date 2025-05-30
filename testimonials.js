// Testimonials page functionality
document.addEventListener('DOMContentLoaded', () => {
  // Handle testimonial filtering by category
  const categoryButtons = document.querySelectorAll('.category-btn');
  const testimonialCards = document.querySelectorAll('.testimonial-full-card');
  
  // Set up the filter buttons
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      categoryButtons.forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Get the selected category
      const selectedCategory = button.getAttribute('data-category');
      
      // Filter testimonial cards
      testimonialCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (selectedCategory === 'all' || selectedCategory === cardCategory) {
          card.style.display = 'block';
          
          // Refresh AOS animations
          if (typeof AOS !== 'undefined') {
            setTimeout(() => {
              AOS.refresh();
            }, 10);
          }
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
  // Video placeholder click
  const videoPlaceholder = document.querySelector('.video-placeholder');
  
  if (videoPlaceholder) {
    videoPlaceholder.addEventListener('click', () => {
      // In a real application, this would open a modal with a video player
      alert('In a real application, this would play a customer testimonial video.');
    });
  }
});