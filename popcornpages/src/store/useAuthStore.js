// src/store/useAuthStore.js
import { create } from 'zustand';

export const useAuthStore = create((set) => {
  const storedUser = JSON.parse(localStorage.getItem('user'));

  return {
    user: storedUser || null,
    loading: false, // ✅ No more hanging on "Loading..."

    login: (userData) => {
      localStorage.setItem('user', JSON.stringify(userData));
      set({ user: userData, loading: false });
    },

    logout: () => {
      localStorage.removeItem('user');
      set({ user: null, loading: false });
    },

    setLoading: (state) => set({ loading: state }),
  };
});
