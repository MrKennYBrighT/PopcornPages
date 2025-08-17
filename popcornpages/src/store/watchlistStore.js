// Import Zustand for state management
import { create } from 'zustand';
// Import Firestore instance
import { db } from '../firebase'; // Make sure this exports Firestore
// Import Firestore methods for document operations
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
// Import auth store to access current user
import { useAuthStore } from './useAuthStore';

// Zustand store for managing user's movie watchlist
export const useWatchlistStore = create((set, get) => ({
  // Initial state
  watchlist: [],
  loading: false,

  // Load watchlist from Firestore for the current user
  loadWatchlist: async () => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    set({ loading: true });

    try {
      const docRef = doc(db, 'watchlists', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // If document exists, set watchlist from Firestore
        set({ watchlist: docSnap.data().movies || [] });
      } else {
        // If no document, create one with an empty list
        await setDoc(docRef, { movies: [] });
        set({ watchlist: [] });
      }
    } catch (error) {
      console.error('Error loading watchlist:', error);
    } finally {
      set({ loading: false });
    }
  },

  // Add a movie to the user's watchlist in Firestore and local state
  addToWatchlist: async (movie) => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    const docRef = doc(db, 'watchlists', user.uid);

    try {
      await updateDoc(docRef, {
        movies: arrayUnion(movie),
      });
      set((state) => ({ watchlist: [...state.watchlist, movie] }));
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  },

  // Remove a movie from the user's watchlist in Firestore and local state
  removeFromWatchlist: async (id) => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    const docRef = doc(db, 'watchlists', user.uid);
    const movieToRemove = get().watchlist.find((m) => m.id === id);
    if (!movieToRemove) return;

    try {
      await updateDoc(docRef, {
        movies: arrayRemove(movieToRemove),
      });
      set((state) => ({
        watchlist: state.watchlist.filter((movie) => movie.id !== id),
      }));
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    }
  },

  // Clear the watchlist locally (does not affect Firestore)
  clearWatchlist: () => set({ watchlist: [] }),
}));
