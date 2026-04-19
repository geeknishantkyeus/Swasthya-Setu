// Authentication utilities for AyuSync Panchakarma
// Import after firebase-config.js (type="module")

import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js';
import { 
  doc, 
  setDoc, 
  getDoc 
} from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js';
import { auth, db, googleProvider } from './firebase-config.js';

let currentUserData = null;

// Toast notification
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()">×</button>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// Validate mobile (10 digits)
function validateMobile(mobile) {
  return /^\d{10}$/.test(mobile);
}

// Validate email
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validate password\nfunction validatePassword(password) {\n  return password.length >= 6;\n}\n\n// Password strength score (0-3)\nexport function passwordStrength(password) {\n  let score = 0;\n  if (password.length >= 6) score++;\n  if (/[a-z]/.test(password)) score++;\n  if (/[A-Z]/.test(password)) score++;\n  if (/\\d/.test(password) || /[^a-zA-Z\\d]/.test(password)) score++;\n  return score;\n}

// Signup function
export async function signup(formData) {
  const { name, age, gender, mobile, email, password, confirmPassword } = formData;
  
  // Validations
  if (!name || !age || !gender || !mobile || !email || !password || !confirmPassword) {
    throw new Error('All fields are required');
  }
  if (!validateEmail(email)) {
    throw new Error('Invalid email format');
  }
  if (!validateMobile(mobile)) {
    throw new Error('Mobile number must be exactly 10 digits');
  }
  if (age < 1 || age > 120) {
    throw new Error('Age must be between 1 and 120');
  }
  if (!validatePassword(password)) {
    throw new Error('Password must be at least 6 characters');
  }
  if (password !== confirmPassword) {
    throw new Error('Passwords do not match');
  }

  try {
    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save additional data to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      name,
      age: Number(age),
      gender,
      mobile,
      email,
      role: 'patient',
      createdAt: new Date().toISOString()
    });

    // Update display name
    await updateProfile(user, { displayName: name });

    showToast('Account created successfully! Redirecting to login...', 'success');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 2000);
  } catch (error) {
    let message = 'Signup failed';
    switch (error.code) {
      case 'auth/email-already-in-use':
        message = 'Email already exists';
        break;
      case 'auth/weak-password':
        message = 'Password too weak';
        break;
      case 'auth/invalid-email':
        message = 'Invalid email';
        break;
      default:
        message = error.message;
    }
    throw new Error(message);
  }
}

// Login function
export async function login(email, password, remember = false) {
  if (!email || !password) {
    throw new Error('Email and password required');
  }
  if (!validateEmail(email)) {
    throw new Error('Invalid email format');
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    if (remember) {
      localStorage.setItem('rememberMe', email);
    }
    window.location.href = '../patient/dashboard.html';
  } catch (error) {
    let message = 'Login failed';
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        message = 'Invalid email or password';
        break;
      case 'auth/invalid-email':
        message = 'Invalid email';
        break;
      default:
        message = 'Network error. Please try again.';
    }
    throw new Error(message);
  }
}

// Google login (optional)
export async function googleLogin() {
  try {
    await signInWithPopup(auth, googleProvider);
    window.location.href = '../patient/dashboard.html';
  } catch (error) {
    showToast('Google login failed', 'error');
  }
}

// Send password reset
export async function forgotPassword(email) {
  if (!validateEmail(email)) {
    throw new Error('Invalid email');
  }
  try {
    await sendPasswordResetEmail(auth, email);
    showToast('Password reset email sent!', 'success');
  } catch (error) {
    throw new Error('Failed to send reset email');
  }
}

// Logout
export async function logout() {
  try {
    await firebaseSignOut(auth);
    localStorage.removeItem('rememberMe');
    window.location.href = 'login.html';
  } catch (error) {
    showToast('Logout failed', 'error');
  }
}

// Get current user data from Firestore
export async function getUserData() {
  if (!auth.currentUser) return null;
  const docSnap = await getDoc(doc(db, 'users', auth.currentUser.uid));
  if (docSnap.exists()) {
    currentUserData = { ...docSnap.data(), uid: auth.currentUser.uid };
    return currentUserData;
  }
  return null;
}

// Auth state listener
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      await getUserData();
    } else {
      currentUserData = null;
    }
    callback(user, currentUserData);
  });
}

// Protect route (call on dashboard load)
export function protectRoute(redirectTo = 'login.html') {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = redirectTo;
    }
  });
}

// Add Google login button handlers for auth pages\ndocument.addEventListener('DOMContentLoaded', function() {\n  const googleBtn = document.getElementById('googleLoginBtn');\n  if (googleBtn) {\n    googleBtn.addEventListener('click', async function(e) {\n      e.preventDefault();\n      try {\n        await window.authUtils.googleLogin();\n      } catch (error) {\n        showToast('Google login failed: ' + error.message, 'error');\n      }\n    });\n  }\n});\n\n// Export for form handlers\nwindow.authUtils = { signup, login, googleLogin, forgotPassword, logout, getUserData, protectRoute, onAuthChange };
