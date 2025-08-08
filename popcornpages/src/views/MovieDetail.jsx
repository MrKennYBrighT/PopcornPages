import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useWatchlistStore } from '../store/watchlistStore';
import { toast } from 'react-hot-toast';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlistStore();

  const isInWatchlist = watchlist.some((item) => item.id === parseInt(id));

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_API_KEY`
      );
      const data = await res.json();
      setMovie(data);
    };

    fetchMovie();
  }, [id]);

  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      removeFromWatchlist(movie.id);
      toast.success(`${movie.title} removed from watchlist`);
    } else {
      addToWatchlist(movie);
      toast.success(`${movie.title} added to watchlist`);
    }
  };

  if (!movie) return <p className="text-center text-gray-400">Loading...</p>;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 bg-[#1C1C3C] text-white rounded-lg shadow-lg">
      <img
        src={posterUrl}
        alt={movie.title}
        className="w-full md:w-1/3 rounded-lg object-cover"
      />

      <div className="flex-1">
        <h1 className="text-4xl font-bold text-yellow-400 mb-2">{movie.title}</h1>
        {movie.tagline && (
          <p className="italic text-gray-300 mb-4">"{movie.tagline}"</p>
        )}
        <p className="text-lg leading-relaxed mb-6">{movie.overview}</p>

        <button
          onClick={handleWatchlistToggle}
          className={`px-6 py-2 rounded font-semibold transition ${
            isInWatchlist
              ? 'bg-red-500 hover:bg-red-400 text-white'
              : 'bg-yellow-400 hover:bg-yellow-300 text-[#1C1C3C]'
          }`}
        >
          {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
        </button>
      </div>
    </div>
  );
};

export default MovieDetail;
