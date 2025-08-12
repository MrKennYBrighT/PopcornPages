// src/store/useAuthStore.js
import { create } from 'zustand';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../firebase'; // Firebase config in /src

export const useAuthStore = create((set) => {
  const storedUser = JSON.parse(localStorage.getItem('user'));

  return {
    user: storedUser || null,
    loading: false,

    signup: async (email, password, name) => {
      set({ loading: true });
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Set display name
        if (name) {
          await updateProfile(user, { displayName: name });
        }

        // Send email verification
        await sendEmailVerification(user);

        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || name,
          emailVerified: user.emailVerified,
        };

        localStorage.setItem('user', JSON.stringify(userData));
        set({ user: userData, loading: false });
        return userData;
      } catch (error) {
        set({ loading: false });
        throw error;
      }
    },

    login: async (email, password) => {
      set({ loading: true });
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
        };

        localStorage.setItem('user', JSON.stringify(userData));
        set({ user: userData, loading: false });
        return userData;
      } catch (error) {
        set({ loading: false });
        throw error;
      }
    },

    logout: async () => {
      set({ loading: true });
      try {
        await signOut(auth);
        localStorage.removeItem('user');
        set({ user: null, loading: false });
      } catch (error) {
        set({ loading: false });
        throw error;
      }
    },

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

    setLoading: (state) => set({ loading: state }),
  };
});
