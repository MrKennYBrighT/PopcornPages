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
  watchlist: JSON.parse(localStorage.getItem('watchlist')) || [],
  loading: false,

  // Load watchlist from Firestore for the current user
  loadWatchlist: async () => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    // ⏱️ Use cached data immediately
    const cached = JSON.parse(localStorage.getItem('watchlist')) || [];
    set({ watchlist: [...cached] });

    // ⏳ Slight delay before showing loading state
    setTimeout(() => set({ loading: true }), 100); // 100ms delay

    try {
      const docRef = doc(db, 'watchlists', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // If document exists, set watchlist from Firestore
        const movies = docSnap.data().movies || [];
        set({ watchlist: [...movies] }); // Force new array reference
        localStorage.setItem('watchlist', JSON.stringify(movies));
      } else {
        // If no document, create one with an empty list
        await setDoc(docRef, { movies: [] });
        set({ watchlist: [] });
        localStorage.setItem('watchlist', JSON.stringify([]));
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

    const { watchlist } = get();
    const alreadyExists = watchlist.some((m) => m.id === movie.id);
    if (alreadyExists) return; // Prevent duplicates

    const docRef = doc(db, 'watchlists', user.uid);

    try {
      await updateDoc(docRef, {
        movies: arrayUnion(movie),
      });

      // Re-fetch updated watchlist from Firestore
      const updatedDoc = await getDoc(docRef);
      const updatedMovies = updatedDoc.exists() ? updatedDoc.data().movies || [] : [];

      set({ watchlist: [...updatedMovies] });
      localStorage.setItem('watchlist', JSON.stringify(updatedMovies));
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  },

  // Remove a movie from the user's watchlist in Firestore and local state
  removeFromWatchlist: async (id) => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    const docRef = doc(db, 'watchlists', user.uid);

    try {
      // Re-fetch the latest watchlist from Firestore
      const docSnap = await getDoc(docRef);
      const storedMovies = docSnap.exists() ? docSnap.data().movies || [] : [];

      // Find the exact stored object to remove
      const exactMatch = storedMovies.find((m) => m.id === id);
      if (!exactMatch) return;

      await updateDoc(docRef, {
        movies: arrayRemove(exactMatch),
      });

      const updatedWatchlist = storedMovies.filter((movie) => movie.id !== id);
      set({ watchlist: [...updatedWatchlist] }); // Force new array reference
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    }
  },

  // Clear the watchlist locally (does not affect Firestore)
  clearWatchlist: () => {
    set({ watchlist: [] });
    localStorage.removeItem('watchlist');
  },
}));
