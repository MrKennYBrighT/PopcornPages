// Import Zustand for state management
import { create } from 'zustand';

// Zustand store for managing basic user session state
const useUserStore = create((set) => ({
  // Initialize user from localStorage if available
  user: JSON.parse(localStorage.getItem('user')) || null,

  // Login method: store user data in localStorage and update state
  login: (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    set({ user: userData });
  },

  // Logout method: clear user data from localStorage and reset state
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
  },
}));

// Exporting the useUserStore for use across the app
export default useUserStore;
