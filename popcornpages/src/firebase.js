// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCU4FqZYVkNI8UmRB6AS7OVMRzaRxdSB68",
  authDomain: "popcornpages-3c5e9.firebaseapp.com",
  projectId: "popcornpages-3c5e9",
  storageBucket: "popcornpages-3c5e9.appspot.com", // ✅ corrected
  messagingSenderId: "123734340520",
  appId: "1:123734340520:web:549a1bd04d46a0c887639d",
  measurementId: "G-R6MS22ST56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Auth
export const auth = getAuth(app);
