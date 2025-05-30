// Profile page functionality
import { requireAuth, getCurrentUser, updateProfile } from './auth-manager.js';

document.addEventListener('DOMContentLoaded', () => {
  // Ensure user is authenticated
  if (!requireAuth()) return;
  
  // Initialize avatar upload
  initAvatarUpload();
  
  // Initialize profile form
  initProfileForm();
  
  // Initialize danger zone actions
  initDangerZone();
});

// Initialize avatar upload
function initAvatarUpload() {
  const avatarContainer = document.querySelector('.profile-avatar');
  const avatarUpload = document.getElementById('avatarUpload');
  const avatarPreview = document.getElementById('avatarPreview');
  
  if (avatarContainer && avatarUpload && avatarPreview) {
    // Show current user avatar
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.avatar) {
      avatarPreview.src = currentUser.avatar;
    }
    
    // Handle click on avatar to trigger file upload
    avatarContainer.addEventListener('click', () => {
      avatarUpload.click();
    });
    
    // Handle file selection
    avatarUpload.addEventListener('change', (e) => {
      const file = e.target.files[0];
      
      if (file) {
        // In a real app, you would upload the file to a server
        // For demo, we'll just show a preview using FileReader
        const reader = new FileReader();
        
        reader.onload = (event) => {
          avatarPreview.src = event.target.result;
          
          // Update user data with new avatar
          updateProfile({
            avatar: event.target.result
          });
        };
        
        reader.readAsDataURL(file);
      }
    });
  }
}

// Initialize profile form
function initProfileForm() {
  const profileForm = document.getElementById('profileForm');
  
  if (profileForm) {
    // Populate form with user data
    const currentUser = getCurrentUser();
    
    if (currentUser) {
      // Populate name fields
      const nameParts = currentUser.fullName.split(' ');
      const firstName = document.getElementById('firstName');
      const lastName = document.getElementById('lastName');
      
      if (firstName && nameParts.length > 0) {
        firstName.value = nameParts[0];
      }
      
      if (lastName && nameParts.length > 1) {
        lastName.value = nameParts.slice(1).join(' ');
      }
      
      // Populate email
      const emailField = document.getElementById('email');
      if (emailField) {
        emailField.value = currentUser.email;
      }
      
      // Update user display
      const userNameElements = document.querySelectorAll('.profile-user-info h2');
      userNameElements.forEach(el => {
        el.textContent = currentUser.fullName;
      });
      
      const userEmailElements = document.querySelectorAll('.profile-user-info p');
      userEmailElements.forEach(el => {
        el.textContent = currentUser.email;
      });
    }
    
    // Handle form submission
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const email = document.getElementById('email').value.trim();
      const phoneNumber = document.getElementById('phoneNumber').value.trim();
      const timezone = document.getElementById('timezone').value;
      
      // Get notification preferences
      const emailNotifications = document.getElementById('emailNotifications').checked;
      const taskReminders = document.getElementById('taskReminders').checked;
      const teamUpdates = document.getElementById('teamUpdates').checked;
      const marketingEmails = document.getElementById('marketingEmails').checked;
      
      // Update profile
      const result = updateProfile({
        fullName: `${firstName} ${lastName}`,
        email,
        phoneNumber,
        timezone,
        preferences: {
          emailNotifications,
          taskReminders,
          teamUpdates,
          marketingEmails
        }
      });
      
      if (result.success) {
        // Update user display
        const userNameElements = document.querySelectorAll('.profile-user-info h2');
        userNameElements.forEach(el => {
          el.textContent = `${firstName} ${lastName}`;
        });
        
        const userEmailElements = document.querySelectorAll('.profile-user-info p');
        userEmailElements.forEach(el => {
          el.textContent = email;
        });
        
        // Show success message
        alert('Profile updated successfully!');
      }
    });
  }
}

// Initialize danger zone actions
function initDangerZone() {
  const deleteAccountBtn = document.querySelector('.danger-card .btn-danger');
  
  if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener('click', () => {
      const confirm = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
      
      if (confirm) {
        // In a real app, this would delete the user's account
        // For demo, we'll just log out the user
        alert('Your account has been deleted. You will be redirected to the login page.');
        
        localStorage.clear();
        window.location.href = 'index.html';
      }
    });
  }
}