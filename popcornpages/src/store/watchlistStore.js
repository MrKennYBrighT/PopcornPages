import { create } from 'zustand';
import { db } from '../firebase'; // Make sure this exports Firestore
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { useAuthStore } from './useAuthStore';

export const useWatchlistStore = create((set, get) => ({
  watchlist: [],
  loading: false,

  loadWatchlist: async () => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    set({ loading: true });

    try {
      const docRef = doc(db, 'watchlists', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ watchlist: docSnap.data().movies || [] });
      } else {
        await setDoc(docRef, { movies: [] });
        set({ watchlist: [] });
      }
    } catch (error) {
      console.error('Error loading watchlist:', error);
    } finally {
      set({ loading: false });
    }
  },

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

  clearWatchlist: () => set({ watchlist: [] }),
}));
