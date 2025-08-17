// Importing Zustand for state management
import { create } from 'zustand';
// Importing UUID generator for unique reaction IDs
import { v4 as uuidv4 } from 'uuid';

// This store holds global state for user, movies, reactions, and UI
const popStore = create((set) => ({
  // Logged-in user info
  user: null,

  // Authentication status
  isLoggedIn: false,

  // Current active page/view
  activePage: 'home',

  // List of movies (e.g., trending or search results)
  movies: [],

  // List of user reactions
  reactions: [],

  // Set user info and mark as logged in
  setUser: (userData) => set({ user: userData, isLoggedIn: true }),

  // Log out user and clear user data
  logout: () => set({ user: null, isLoggedIn: false }),

  // Update the active page/view
  setActivePage: (page) => set({ activePage: page }),

  // Update the movie list
  setMovies: (movieList) => set({ movies: movieList }),

  // Add a new reaction with a unique ID
  addReaction: (reaction) =>
    set((state) => ({
      reactions: [{ ...reaction, id: uuidv4() }, ...state.reactions],
    })),

  // Add an emoji to a specific reaction
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

// Exporting the popStore for use across the app
export default popStore;
