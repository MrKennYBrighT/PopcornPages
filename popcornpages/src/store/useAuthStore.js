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

export const useAuthStore = create((set) => {
  // Listen to Firebase auth state
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified,
      };
      localStorage.setItem('user', JSON.stringify(userData));
      set({ user: userData });
    } else {
      localStorage.removeItem('user');
      set({ user: null });
    }
  });

  return {
    user: null,
    loading: false,

    signup: async (email, password, name) => {
      set({ loading: true });
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (name) {
          await updateProfile(user, { displayName: name });
        }

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
