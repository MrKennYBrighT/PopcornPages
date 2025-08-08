import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, onRemove, isInWatchlist, onAdd }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className="relative bg-[#2C2C5C] rounded-lg overflow-hidden shadow-lg hover:scale-105 hover:shadow-[0_0_10px_#FFD966] transition">
      <Link to={`/movie/${movie.id}`} className="block">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-80 object-cover"
        />
      </Link>

      <div className="p-4">
        <Link to={`/movie/${movie.id}`}>
          <h3 className="text-xl font-semibold text-yellow-400 hover:underline">
            {movie.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-300 mt-2 line-clamp-3">{movie.overview}</p>

        {isInWatchlist ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onRemove();
            }}
            className="mt-4 px-4 py-2 rounded font-semibold bg-red-500 text-white hover:bg-red-400 transition"
          >
            Remove from Watchlist
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onAdd();
            }}
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
