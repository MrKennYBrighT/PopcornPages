import { create } from 'zustand';

// This store holds global state for user, movies, reactions, and UI
const usePopStore = create((set) => ({
  user: null, // Logged-in user info
  isLoggedIn: false, // Auth status
  activePage: 'home', // Current page/view
  movies: [], // Movie list
  reactions: [], // User reactions

  // Set user info
  setUser: (userData) => set({ user: userData, isLoggedIn: true }),

  // Log out user
  logout: () => set({ user: null, isLoggedIn: false }),

  // Set active page
  setActivePage: (page) => set({ activePage: page }),

  // Set movie list
  setMovies: (movieList) => set({ movies: movieList }),

  // Add a new reaction
  addReaction: (reaction) =>
    set((state) => ({ reactions: [reaction, ...state.reactions] })),
}));

export default usePopStore;
