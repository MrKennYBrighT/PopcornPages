import React, { useEffect } from 'react';
import usePopStore from '../store/popStore';
import { useWatchlistStore } from '../store/watchlistStore';
import { toast } from 'react-hot-toast';

const FeaturedMovies = () => {
  const { movies, setMovies } = usePopStore();
  const { addToWatchlist, watchlist } = useWatchlistStore();

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
    addToWatchlist(movie);
    toast.success(`${movie.title} added to your watchlist!`);
  };

  return (
    <section className="px-8 py-12 bg-[#1C1C3C] text-white">
      <h2 className="text-3xl font-bold text-[#FF6B6B] mb-8">Trending This Week</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {movies.map((movie) => {
          const alreadyAdded = isInWatchlist(movie.id);

          return (
            <div
              key={movie.id}
              className="relative bg-[#2C2C5C] rounded-lg overflow-hidden shadow-lg hover:scale-105 hover:shadow-[0_0_10px_#FFD966] transition"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-80 object-cover"
              />
              <div className="absolute top-2 right-2 bg-[#FF6B6B] text-white text-xs px-2 py-1 rounded shadow">
                🔥 Trending
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-yellow-400">{movie.title}</h3>
                <p className="text-sm text-gray-300 mt-2 line-clamp-3">{movie.overview}</p>

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

export default FeaturedMovies;
