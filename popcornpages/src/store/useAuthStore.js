// Import Zustand for state management
import { create } from 'zustand';
// Import Firebase authentication methods
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from 'firebase/auth';
// Import Firebase auth instance
import { auth } from '../firebase';

// Zustand store for managing authentication state and actions
export const useAuthStore = create((set) => {
  // Listen to Firebase auth state changes
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // If user is logged in, store their data locally and in state
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified,
      };
      localStorage.setItem('user', JSON.stringify(userData));
      set({ user: userData });
    } else {
      // If user is logged out, clear local storage and state
      localStorage.removeItem('user');
      set({ user: null });
    }
  });

  return {
    // Initial state
    user: null,
    loading: false,

    // Signup method using Firebase
    signup: async (email, password, name) => {
      set({ loading: true });
      try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Optionally update display name
        if (name) {
          await updateProfile(user, { displayName: name });
        }

        // Send verification email
        await sendEmailVerification(user);

        // Prepare user data for storage
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || name,
          emailVerified: user.emailVerified,
        };

        // Save user data locally and in state
        localStorage.setItem('user', JSON.stringify(userData));
        set({ user: userData, loading: false });
        return userData;
      } catch (error) {
        set({ loading: false });
        throw error;
      }
    },

    // Login method using Firebase
    login: async (email, password) => {
      set({ loading: true });
      try {
        // Sign in with email and password
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Prepare user data for storage
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
        };

        // Save user data locally and in state
        localStorage.setItem('user', JSON.stringify(userData));
        set({ user: userData, loading: false });
        return userData;
      } catch (error) {
        set({ loading: false });
        throw error;
      }
    },

    // Logout method using Firebase
    logout: async () => {
      set({ loading: true });
      try {
        // Sign out user
        await signOut(auth);
        localStorage.removeItem('user');
        set({ user: null, loading: false });
      } catch (error) {
        set({ loading: false });
        throw error;
      }
    },

    // Send password reset email
    resetPassword: async (email) => {
      set({ loading: true });
      try {
        await sendPasswordResetEmail(auth, email);
        set({ loading: false });
        return true;
      } catch (error) {
        set({ loading: false });
        throw error;
      }
    },

    // Manually set loading state
    setLoading: (state) => set({ loading: state }),
  };
});
