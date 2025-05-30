// Dashboard functionality
import { requireAuth, getCurrentUser } from './auth-manager.js';

document.addEventListener('DOMContentLoaded', () => {
  // Ensure user is authenticated
  if (!requireAuth()) return;
  
  // Initialize user menu
  initUserMenu();
  
  // Initialize task interactions
  initTaskInteractions();
  
  // Initialize task tabs
  initTaskTabs();
  
  // Initialize sidebar toggle for mobile
  initSidebarToggle();
});

// Initialize user dropdown menu
function initUserMenu() {
  const userMenu = document.querySelector('.user-menu');
  const userMenuBtn = document.querySelector('.user-menu-btn');
  
  if (userMenuBtn && userMenu) {
    userMenuBtn.addEventListener('click', () => {
      userMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!userMenu.contains(e.target)) {
        userMenu.classList.remove('active');
      }
    });
  }
  
  // Populate user data
  const currentUser = getCurrentUser();
  if (currentUser) {
    const userNameElements = document.querySelectorAll('.user-name');
    userNameElements.forEach(el => {
      el.textContent = currentUser.fullName.split(' ')[0];
    });
    
    // Update welcome message
    const welcomeHeader = document.querySelector('.content-header h1');
    if (welcomeHeader && welcomeHeader.textContent.includes('Welcome back')) {
      welcomeHeader.textContent = `Welcome back, ${currentUser.fullName.split(' ')[0]}!`;
    }
  }
}

// Initialize task checkbox interactions
function initTaskInteractions() {
  const taskCheckboxes = document.querySelectorAll('.task-checkbox input');
  
  taskCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const taskItem = checkbox.closest('.task-item');
      
      if (checkbox.checked) {
        taskItem.style.opacity = '0.6';
        
        // In a real app, this would update the task status in the database
        setTimeout(() => {
          taskItem.style.display = 'none';
        }, 1000);
      }
    });
  });
  
  // Task action buttons
  const taskActionBtns = document.querySelectorAll('.task-action-btn');
  
  taskActionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      alert('This would open a task options menu in a real application.');
    });
  });
}

// Initialize task tabs
function initTaskTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // In a real app, this would load different task lists
      // For demo, we'll just show a message
      const tabName = button.getAttribute('data-tab');
      console.log(`Loading ${tabName} tasks...`);
    });
  });
}

// Initialize sidebar toggle for mobile
function initSidebarToggle() {
  const sidebar = document.querySelector('.dashboard-sidebar');
  
  if (sidebar && window.innerWidth < 768) {
    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'sidebar-toggle';
    toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    // Add button to header
    const header = document.querySelector('.dashboard-header');
    
    toggleButton.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth < 768 && sidebar.classList.contains('active') && 
          !sidebar.contains(e.target) && e.target !== toggleButton) {
        sidebar.classList.remove('active');
      }
    });
  }
}