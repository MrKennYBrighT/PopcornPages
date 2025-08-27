// Importing Zustand for state management
import { create } from 'zustand';
// Importing UUID generator for unique reaction IDs
import { v4 as uuidv4 } from 'uuid';

// This store holds global state for movies, reactions, and UI
const popStore = create((set) => ({
  // Current active page/view
  activePage: 'home',

  // List of movies (e.g., trending or search results)
  movies: [],

  // List of user reactions
  reactions: [],

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
