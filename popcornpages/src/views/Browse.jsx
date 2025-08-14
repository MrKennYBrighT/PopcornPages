// src/views/Browse.jsx
import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { useWatchlistStore } from '../store/watchlistStore';
import SearchBar from '../components/SearchBar';

const Browse = () => {
  const [movies, setMovies] = useState([]);
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlistStore();

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=fc70d3012c4f8313d3da7babb9903731`
      );
      const data = await res.json();
      setMovies(data.results);
    };
    fetchMovies();
  }, []);

  return (
    <div className="px-8 py-12 bg-[#1C1C3C] text-white min-h-screen">
      <h2 className="text-3xl font-bold text-yellow-400 mb-8">Browse Movies</h2>
      {/* 🔍 SearchBar Component */}
      <div className="mb-10">
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {movies.map((movie) => {
          const isInWatchlist = watchlist.some((m) => m.id === movie.id);
          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              isInWatchlist={isInWatchlist}
              onAdd={() => addToWatchlist(movie)}
              onRemove={() => removeFromWatchlist(movie.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Browse;