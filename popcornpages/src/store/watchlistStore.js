import { create } from 'zustand';

export const useWatchlistStore = create((set) => ({
  watchlist: JSON.parse(localStorage.getItem('watchlist')) || [],

  addToWatchlist: (movie) =>
    set((state) => {
      const updated = [...state.watchlist, movie];
      localStorage.setItem('watchlist', JSON.stringify(updated));
      return { watchlist: updated };
    }),

  removeFromWatchlist: (id) =>
    set((state) => {
      const updated = state.watchlist.filter((movie) => movie.id !== id);
      localStorage.setItem('watchlist', JSON.stringify(updated));
      return { watchlist: updated };
    }),
}));
