import { create } from 'zustand';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';

// ✅ Helper to shape user data
const formatUser = (user) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  emailVerified: user.emailVerified,
});

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,

  // ✅ Signup method
  signup: async (email, password, name) => {
    set({ loading: true });
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (name) {
        await updateProfile(user, { displayName: name });
      }

      await sendEmailVerification(user);
      set({ user: formatUser(user), loading: false });
      return formatUser(user);
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  // ✅ Login method
  login: async (email, password) => {
    set({ loading: true });
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      set({ user: formatUser(user), loading: false });
      return formatUser(user);
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  // ✅ Logout method
  logout: async () => {
    set({ loading: true });
    try {
      await signOut(auth);
      set({ user: null, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  // ✅ Password reset
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

  // ✅ Auth state listener (call this once in App.jsx)
  initAuthListener: () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        set({ user: formatUser(user) });
      } else {
        set({ user: null });
      }
    });
  },

  // ✅ Manual loading toggle
  setLoading: (state) => set({ loading: state }),
}));
