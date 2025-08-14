import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

// This store holds global state for user, movies, reactions, and UI
const popStore = create((set) => ({
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

  // Add a new reaction with unique ID
  addReaction: (reaction) =>
    set((state) => ({
      reactions: [{ ...reaction, id: uuidv4() }, ...state.reactions],
    })),

  // Add emoji to a reaction
  updateReactionEmoji: (reactionId, emoji) =>
    set((state) => ({
      reactions: state.reactions.map((r) =>
        r.id === reactionId
          ? {
              ...r,
              emojis: [...(r.emojis || []), emoji],
            }
          : r
      ),
    })),
}));

export default popStore;
