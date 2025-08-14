import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { useWatchlistStore } from '../store/watchlistStore';
import { Link } from 'react-router-dom';

const Trending = () => {
  const [movies, setMovies] = useState([]);
  const { addToWatchlist, watchlist } = useWatchlistStore();

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(
          'https://api.themoviedb.org/3/trending/movie/week?api_key=fc70d3012c4f8313d3da7babb9903731'
        );
        const data = await res.json();
        setMovies(data.results);
      } catch (err) {
        console.error('Failed to fetch trending movies:', err);
      }
    };
    fetchTrending();
  }, []);

  const isInWatchlist = (id) => watchlist.some((m) => m.id === id);

  return (
    <div className="px-4 py-8 bg-[#1C1C3C] text-white">
      <h1 className="text-3xl font-bold mb-6 text-[#FF6B6B]">🔥 Trending Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="relative">
            <Link to={`/movie/${movie.id}`} className="no-underline text-inherit">
              <MovieCard
                movie={movie}
                onAdd={() => addToWatchlist(movie)}
                isInWatchlist={isInWatchlist(movie.id)}
              />
            </Link>
            <div className="absolute top-2 right-2 bg-[#FF6B6B] text-white text-xs px-2 py-1 rounded shadow">
              🔥 Trending
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;