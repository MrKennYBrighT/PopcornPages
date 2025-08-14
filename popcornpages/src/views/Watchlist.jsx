import React from 'react';
import { useWatchlistStore } from '../store/watchlistStore';
import MovieCard from '../components/MovieCard';
import PageWrapper from '../components/PageWrapper';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore'; // ✅ Synced auth store

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useWatchlistStore(); // ✅ Removed unused addToWatchlist
  const { user } = useAuthStore(); // ✅ Pull user from correct store

  const handleRemove = (movie) => {
    removeFromWatchlist(movie.id);
    toast.success(
      `${movie.title || 'Movie'} removed from your watchlist 🎉`,
      {
        duration: 3000,
        position: 'top-right',
        style: {
          background: '#333',
          color: '#fff',
          borderRadius: '8px',
        },
      }
    );
  };

  return (
    <PageWrapper>
      <h1 className="text-3xl font-bold mb-2 text-yellow-400">🎬 Your Watchlist</h1>
      {user && (
        <p className="text-gray-300 mb-6">
          Welcome back, <span className="text-yellow-400 font-semibold">{user.displayName || user.email}</span>!
        </p>
      )}

      {watchlist.length === 0 ? (
        <p className="text-gray-400 italic text-center mt-10">
          Your watchlist is empty. Go add some movies!
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {watchlist.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onRemove={() => handleRemove(movie)}
              isInWatchlist={true}
            />
          ))}
        </div>
      )}
    </PageWrapper>
  );
};

export default Watchlist;
