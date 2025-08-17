// Import Firebase core and required services
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ added

// Firebase configuration settings
const firebaseConfig = {
  apiKey: "AIzaSyCU4FqZYVkNI8UmRB6AS7OVMRzaRxdSB68",
  authDomain: "popcornpages-3c5e9.firebaseapp.com",
  projectId: "popcornpages-3c5e9",
  storageBucket: "popcornpages-3c5e9.appspot.com",
  messagingSenderId: "123734340520",
  appId: "1:123734340520:web:549a1bd04d46a0c887639d",
  measurementId: "G-R6MS22ST56"
};

// Initialize Firebase app instance
const app = initializeApp(firebaseConfig);

// Export Firebase Authentication and Firestore services
export const auth = getAuth(app);
export const db = getFirestore(app); // ✅ added
