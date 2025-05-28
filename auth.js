// Authentication page functionality
import { login, signup, isLoggedIn } from './auth-manager.js';

document.addEventListener('DOMContentLoaded', () => {
  // If user is already logged in, redirect to dashboard
  if (isLoggedIn()) {
    window.location.href = 'dashboard.html';
    return;
  }
  
  // Initialize login form
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    initLoginForm();
  }
  
  // Initialize signup form
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    initSignupForm();
  }
  
  // Initialize password toggles
  initPasswordToggles();
});

// Initialize login form
function initLoginForm() {
  const loginForm = document.getElementById('loginForm');
  
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Reset error messages
    resetErrorMessages();
    
    // Validate form
    let isValid = true;
    
    if (!email) {
      showError('email', 'Email is required');
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError('email', 'Please enter a valid email address');
      isValid = false;
    }
    
    if (!password) {
      showError('password', 'Password is required');
      isValid = false;
    }
    
    // Submit form if valid
    if (isValid) {
      const result = login(email, password);
      
      if (result.success) {
        window.location.href = 'dashboard.html';
      } else {
        showError('password', result.message || 'Invalid email or password');
      }
    }
  });
}

// Initialize signup form
function initSignupForm() {
  const signupForm = document.getElementById('signupForm');
  
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const termsAgree = document.getElementById('termsAgree').checked;
    
    // Reset error messages
    resetErrorMessages();
    
    // Validate form
    let isValid = true;
    
    if (!fullName) {
      showError('fullName', 'Full name is required');
      isValid = false;
    }
    
    if (!email) {
      showError('email', 'Email is required');
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError('email', 'Please enter a valid email address');
      isValid = false;
    }
    
    if (!password) {
      showError('password', 'Password is required');
      isValid = false;
    } else if (password.length < 8) {
      showError('password', 'Password must be at least 8 characters');
      isValid = false;
    }
    
    if (!confirmPassword) {
      showError('confirmPassword', 'Please confirm your password');
      isValid = false;
    } else if (password !== confirmPassword) {
      showError('confirmPassword', 'Passwords do not match');
      isValid = false;
    }
    
    if (!termsAgree) {
      showError('termsAgree', 'You must agree to the Terms of Service and Privacy Policy');
      isValid = false;
    }
    
    // Submit form if valid
    if (isValid) {
      const result = signup(fullName, email, password);
      
      if (result.success) {
        window.location.href = 'dashboard.html';
      } else {
        showError('email', result.message || 'An error occurred. Please try again.');
      }
    }
  });
}

// Initialize password toggles
function initPasswordToggles() {
  const toggles = document.querySelectorAll('.password-toggle');
  
  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const input = toggle.previousElementSibling;
      const icon = toggle.querySelector('i');
      
      // Toggle password visibility
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  });
}

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