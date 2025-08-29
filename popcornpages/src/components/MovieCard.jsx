// Importing React and PropTypes for component and type checking
import React from 'react';
import PropTypes from 'prop-types';
// Importing navigation and linking utilities
import { Link, useNavigate } from 'react-router-dom';
// Custom hook to access authentication state
import { useAuthStore } from '../store/useAuthStore';
// Toast notifications for user feedback
import { toast } from 'react-hot-toast';

// MovieCard component to display individual movie details
const MovieCard = ({ movie, onRemove, isInWatchlist, onAdd, buttonLabel }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleWatchlistClick = (e, action) => {
    e.stopPropagation();
    e.preventDefault();

    if (!user) {
      toast(
        (t) => (
          <span className="flex flex-col gap-2">
            <span className="text-white">Create an account or login to add movies to your watchlist!</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  navigate('/signup');
                }}
                className="px-3 py-1 bg-yellow-400 text-[#1C1C3C] rounded font-semibold"
              >
                Sign Up
              </button>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  navigate('/login');
                }}
                className="px-3 py-1 border border-yellow-400 text-yellow-400 rounded font-semibold"
              >
                Login
              </button>
            </div>
          </span>
        ),
        {
          duration: 5000,
          style: {
            background: '#2C2C5C',
            color: 'white',
          },
        }
      );
      return;
    }

    if (action === 'add') {
      if (isInWatchlist) {
        toast.error('This movie is already in your watchlist!');
      } else {
        onAdd();
        toast.success('Added to your watchlist!');
      }
    } else if (action === 'remove') {
      onRemove();
      toast('Removed from your watchlist.', {
        icon: '🗑️',
        style: {
          background: '#2C2C5C',
          color: 'white',
        },
      });
    }
  };

  return (
    <div className="relative bg-[#2C2C5C] rounded-lg overflow-hidden shadow-lg hover:scale-[1.02] hover:shadow-[0_0_10px_#FFD966] transition duration-300">
      {isInWatchlist && (
        <div className="absolute top-2 right-2 bg-yellow-400 text-[#1C1C3C] px-2 py-1 text-xs font-bold rounded">
          Saved
        </div>
      )}

      <Link to={`/movie/${movie.id}`} className="block">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-64 sm:h-72 md:h-80 object-cover"
        />
      </Link>

      <div className="p-4">
        <h3 className="text-lg sm:text-xl font-semibold text-yellow-400">{movie.title}</h3>
        <p className="text-sm text-gray-300 mt-2 line-clamp-3">{movie.overview}</p>

        {isInWatchlist ? (
          <button
            onClick={(e) => handleWatchlistClick(e, 'remove')}
            className="w-full sm:w-auto mt-4 px-4 py-2 rounded font-semibold bg-red-500 text-white hover:bg-red-400 transition"
          >
            {buttonLabel || 'Remove from Watchlist'}
          </button>
        ) : (
          <button
            onClick={(e) => handleWatchlistClick(e, 'add')}
            className="w-full sm:w-auto mt-4 px-4 py-2 rounded font-semibold bg-yellow-400 text-[#1C1C3C] hover:bg-yellow-300 transition"
          >
            Add to Watchlist
          </button>
        )}
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    overview: PropTypes.string,
    poster_path: PropTypes.string,
  }).isRequired,
  onRemove: PropTypes.func,
  onAdd: PropTypes.func,
  isInWatchlist: PropTypes.bool,
  buttonLabel: PropTypes.string,
};

export default MovieCard;
