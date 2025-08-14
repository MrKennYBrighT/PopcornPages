import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from 'react-hot-toast';

const MovieCard = ({ movie, onRemove, isInWatchlist, onAdd }) => {
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
            <div className="flex gap-2">
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
      onAdd();
    } else if (action === 'remove') {
      onRemove();
    }
  };

  return (
    <div className="relative bg-[#2C2C5C] rounded-lg overflow-hidden shadow-lg hover:scale-105 hover:shadow-[0_0_10px_#FFD966] transition">
      <Link to={`/movie/${movie.id}`} className="block">
        <img src={posterUrl} alt={movie.title} className="w-full h-80 object-cover" />
      </Link>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-yellow-400">{movie.title}</h3>
        <p className="text-sm text-gray-300 mt-2 line-clamp-3">{movie.overview}</p>
        {isInWatchlist ? (
          <button
            onClick={(e) => handleWatchlistClick(e, 'remove')}
            className="mt-4 px-4 py-2 rounded font-semibold bg-red-500 text-white hover:bg-red-400 transition"
          >
            Remove from Watchlist
          </button>
        ) : (
          <button
            onClick={(e) => handleWatchlistClick(e, 'add')}
            className="mt-4 px-4 py-2 rounded font-semibold bg-yellow-400 text-[#1C1C3C] hover:bg-yellow-300 transition"
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
};

export default MovieCard;