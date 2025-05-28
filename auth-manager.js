// Auth Manager - handles user authentication state

// User session storage
const USER_KEY = 'tasknest_user';

// Default admin user for testing
const DEFAULT_USER = {
  id: '1',
  fullName: 'John Smith',
  email: 'john.smith@example.com',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  role: 'admin',
  plan: 'Pro'
};

// Initialize auth system
export function initAuth() {
  attachLogoutListeners();
  
  // For demo purposes, we'll ensure there's always a logged in user in the dashboard
  if (window.location.pathname.includes('dashboard') || window.location.pathname.includes('profile')) {
    ensureUserLoggedIn();
  }
}

// Check if user is logged in
export function isLoggedIn() {
  return !!getCurrentUser();
}

// Get current user data
export function getCurrentUser() {
  const userJson = localStorage.getItem(USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
}

// Log in user
export function login(email, password) {
  // In a real app, this would validate against a backend
  // For demo, we'll accept any credentials and use our default user
  
  // Simple validation
  if (!email || !password) {
    return { success: false, message: 'Email and password are required' };
  }
  
  // Set user in localStorage
  const user = { ...DEFAULT_USER, email };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  
  return { success: true, user };
}

// Sign up user
export function signup(fullName, email, password) {
  // In a real app, this would create a user in the backend
  // For demo, we'll just store the user in localStorage
  
  // Simple validation
  if (!fullName || !email || !password) {
    return { success: false, message: 'All fields are required' };
  }
  
  // Set user in localStorage
  const user = { 
    ...DEFAULT_USER, 
    id: Date.now().toString(),
    fullName,
    email
  };
  
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  
  return { success: true, user };
}

// Log out user
export function logout() {
  localStorage.removeItem(USER_KEY);
  window.location.href = 'login.html';
}

// Ensure user is logged in (for dashboard and profile pages)
function ensureUserLoggedIn() {
  if (!getCurrentUser()) {
    localStorage.setItem(USER_KEY, JSON.stringify(DEFAULT_USER));
  }
}

// Attach logout event listeners
function attachLogoutListeners() {
  const logoutBtn = document.getElementById('logoutBtn');
  
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
  }
}

// Update user profile
export function updateProfile(userData) {
  const currentUser = getCurrentUser();
  
  if (!currentUser) {
    return { success: false, message: 'No user logged in' };
  }
  
  const updatedUser = { ...currentUser, ...userData };
  localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
  
  return { success: true, user: updatedUser };
}

// Protected route middleware
export function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}