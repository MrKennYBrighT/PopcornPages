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
  const { movies, setMovies } = usePopStore();
  const { addToWatchlist, watchlist } = useWatchlistStore();
  const { user } = useAuthStore(); // ✅ Get current user
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrending = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=fc70d3012c4f8313d3da7babb9903731`
      );
      const data = await res.json();
      setMovies(data.results.slice(0, 6));
    };

    fetchTrending();
  }, [setMovies]);

  const isInWatchlist = (id) => watchlist.some((m) => m.id === id);

  const handleAddToWatchlist = (movie) => {
    if (!user) {
      toast((t) => (
        <span>
          Please <strong>login</strong> or <strong>create an account</strong> to add movies to your watchlist.
          <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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

    addToWatchlist(movie);
    toast.success(`${movie.title} added to your watchlist!`);
  };

  return (
    <section className="px-4 sm:px-6 md:px-8 py-12 bg-[#1C1C3C] text-white">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#FF6B6B] mb-8 text-center sm:text-left">
        Trending This Week
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {movies.map((movie) => {
          const alreadyAdded = isInWatchlist(movie.id);

          return (
            <div key={movie.id} className="relative group">
              <Link to={`/movie/${movie.id}`}>
                <div className="bg-[#2C2C5C] rounded-lg overflow-hidden shadow-lg hover:scale-[1.02] hover:shadow-[0_0_10px_#FFD966] transition duration-300">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-64 sm:h-72 md:h-80 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-[#FF6B6B] text-white text-xs px-2 py-1 rounded shadow">
                    🔥 Trending
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-yellow-400">{movie.title}</h3>
                    <p className="text-sm text-gray-300 mt-2 line-clamp-3">{movie.overview}</p>
                  </div>
                </div>
              </Link>

              <div className="p-4">
                <button
                  onClick={() => handleAddToWatchlist(movie)}
                  disabled={alreadyAdded}
                  className={`w-full sm:w-auto mt-4 px-4 py-2 rounded font-semibold transition ${
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

export default FeaturedMovies;
