// Importing React and useEffect hook for side effects
import React, { useEffect } from 'react';
// Custom hook to manage trending movies state
import usePopStore from '../store/popStore';
// Custom hook to manage user's watchlist
import { useWatchlistStore } from '../store/watchlistStore';
// Custom hook to access authentication state
import { useAuthStore } from '../store/useAuthStore'; // ✅ Corrected path
// Toast notifications for user feedback
import { toast } from 'react-hot-toast';
// Navigation and linking utilities from React Router
import { Link, useNavigate } from 'react-router-dom';

// Component to display trending movies and allow adding to watchlist
const FeaturedMovies = () => {
  // Access trending movies and setter from global store
  const { movies, setMovies } = usePopStore();
  // Access watchlist and function to add movies to it
  const { addToWatchlist, watchlist } = useWatchlistStore();
  // Access current user from auth store
  const { user } = useAuthStore(); // ✅ Get current user
  const navigate = useNavigate();

  // Fetch trending movies from TMDB API on component mount
  useEffect(() => {
    const fetchTrending = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=fc70d3012c4f8313d3da7babb9903731`
      );
      const data = await res.json();
      // Store only the top 6 trending movies
      setMovies(data.results.slice(0, 6));
    };

    fetchTrending();
  }, [setMovies]);

  // Check if a movie is already in the user's watchlist
  const isInWatchlist = (id) => watchlist.some((m) => m.id === id);

  // Handle adding a movie to the watchlist
  const handleAddToWatchlist = (movie) => {
    // If user is not logged in, show toast with login/signup options
    if (!user) {
      toast((t) => (
        <span>
          Please <strong>login</strong> or <strong>create an account</strong> to add movies to your watchlist.
          <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
            <button
              onClick={() => {
                navigate('/login');
                toast.dismiss(t.id);
              }}
              style={{
                backgroundColor: '#FF6B6B',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '4px',
                fontWeight: 'bold',
              }}
            >
              Login
            </button>
            <button
              onClick={() => {
                navigate('/signup');
                toast.dismiss(t.id);
              }}
              style={{
                backgroundColor: '#FFD966',
                color: '#1C1C3C',
                padding: '6px 12px',
                borderRadius: '4px',
                fontWeight: 'bold',
              }}
            >
              Sign Up
            </button>
          </div>
        </span>
      ));
      return;
    }

    // If user is logged in, add movie to watchlist and show success toast
    addToWatchlist(movie);
    toast.success(`${movie.title} added to your watchlist!`);
  };

  return (
    // Section container with padding and dark background
    <section className="px-8 py-12 bg-[#1C1C3C] text-white">
      {/* Section heading */}
      <h2 className="text-3xl font-bold text-[#FF6B6B] mb-8">Trending This Week</h2>

      {/* Grid layout for movie cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {movies.map((movie) => {
          // Check if movie is already in watchlist
          const alreadyAdded = isInWatchlist(movie.id);

          return (
            <div key={movie.id} className="relative group">
              {/* Link to movie detail page */}
              <Link to={`/movie/${movie.id}`}>
                <div className="bg-[#2C2C5C] rounded-lg overflow-hidden shadow-lg hover:scale-105 hover:shadow-[0_0_10px_#FFD966] transition">
                  {/* Movie poster */}
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-80 object-cover"
                  />
                  {/* Trending badge */}
                  <div className="absolute top-2 right-2 bg-[#FF6B6B] text-white text-xs px-2 py-1 rounded shadow">
                    🔥 Trending
                  </div>
                  {/* Movie title and overview */}
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-yellow-400">{movie.title}</h3>
                    <p className="text-sm text-gray-300 mt-2 line-clamp-3">{movie.overview}</p>
                  </div>
                </div>
              </Link>

              {/* Watchlist button */}
              <div className="p-4">
                <button
                  onClick={() => handleAddToWatchlist(movie)}
                  disabled={alreadyAdded}
                  className={`mt-4 px-4 py-2 rounded font-semibold transition ${
                    alreadyAdded
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-yellow-400 text-[#1C1C3C] hover:bg-yellow-300'
                  }`}
                >
                  {alreadyAdded ? 'Already in Watchlist' : 'Add to Watchlist'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// Exporting the FeaturedMovies component
export default FeaturedMovies;
