// Firebase configuration - REPLACE WITH YOUR PROJECT CONFIG
// Go to Firebase Console > Project Settings > SDK setup > Config

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js';
import { getAuth, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyAy-Vll5zjBMEKzri69rU-smmwn1eib53I",
  authDomain: "veetax-1a2ff.firebaseapp.com",
  databaseURL: "https://veetax-1a2ff-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "veetax-1a2ff",
  storageBucket: "veetax-1a2ff.firebasestorage.app",
  messagingSenderId: "984393005565",
  appId: "1:984393005565:web:9ea943e0dbf7c0eb108194"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Usage in HTML: 
// <script type="module" src="js/firebase-config.js"></script>
// <script type="module" src="js/auth.js"></script>
console.log('Firebase initialized');
