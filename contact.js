// Contact form validation and submission
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();
      
      // Reset error messages
      resetErrorMessages();
      
      // Validate form
      let isValid = true;
      
      if (!name) {
        showError('name', 'Name is required');
        isValid = false;
      }
      
      if (!email) {
        showError('email', 'Email is required');
        isValid = false;
      } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
      }
      
      if (!subject) {
        showError('subject', 'Subject is required');
        isValid = false;
      }
      
      if (!message) {
        showError('message', 'Message is required');
        isValid = false;
      }
      
      // Submit form if valid
      if (isValid) {
        // In a real application, you would send this data to a server
        // For demo purposes, we'll just show a success message
        contactForm.classList.add('hidden');
        formSuccess.classList.remove('hidden');
      }
    });
  }
  
  // Initialize FAQ accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });
});

// Show error message
function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  
  field.classList.add('error');
  
  const errorMessageElement = field.parentNode.querySelector('.error-message');
  if (errorMessageElement) {
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = 'block';
  }
}

// Reset error messages
function resetErrorMessages() {
  const errorFields = document.querySelectorAll('.error');
  errorFields.forEach(field => {
    field.classList.remove('error');
  });
  
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(message => {
    message.textContent = '';
    message.style.display = 'none';
  });
}

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}