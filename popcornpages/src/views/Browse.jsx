// src/views/Browse.jsx
import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { useWatchlistStore } from '../store/watchlistStore';
import SearchBar from '../components/SearchBar';

const Browse = () => {
  // Local state to hold fetched movies
  const [movies, setMovies] = useState([]);

  // Access watchlist store actions and state
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlistStore();

  // Fetch popular movies from TMDB API on component mount
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=fc70d3012c4f8313d3da7babb9903731`
      );
      const data = await res.json();
      setMovies(data.results); // Update local state with fetched movies
    };
    fetchMovies();
  }, []);

  return (
    <div className="px-8 py-12 bg-[#1C1C3C] text-white min-h-screen">
      {/* Page Title */}
      <h2 className="text-3xl font-bold text-yellow-400 mb-8">Browse Movies</h2>

      {/* 🔍 SearchBar Component */}
      <div className="mb-10">
        <SearchBar />
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {movies.map((movie) => {
          // Check if movie is already in the watchlist
          const isInWatchlist = watchlist.some((m) => m.id === movie.id);

          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              isInWatchlist={isInWatchlist}
              onAdd={() => addToWatchlist(movie)} // Add to watchlist handler
              onRemove={() => removeFromWatchlist(movie.id)} // Remove from watchlist handler
              buttonLabel={isInWatchlist ? "Already in Watchlist" : "Add to Watchlist"} // 👈 Updated label
            />
          );
        })}
      </div>
    </div>
  );
};

export default Browse;
