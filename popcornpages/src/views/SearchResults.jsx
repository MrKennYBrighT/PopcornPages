import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const API_KEY = 'fc70d3012c4f8313d3da7babb9903731';
const BASE_URL = 'https://api.themoviedb.org/3';

const SearchResults = () => {
  const { query } = useParams();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const [recentSearches, setRecentSearches] = useState(() => {
    const stored = localStorage.getItem('recentSearches');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    if (query && !recentSearches.includes(query)) {
      const updated = [query, ...recentSearches].slice(0, 10);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    }
  }, [query, recentSearches]);

  const handleRemoveSearch = (termToRemove) => {
    const updated = recentSearches.filter((term) => term !== termToRemove);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleClearAll = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
        const data = await res.json();
        setResults(data.results);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  let content;
  if (loading) {
    content = <p className="text-gray-400 text-center">Loading...</p>;
  } else if (results.length === 0) {
    content = <p className="text-gray-400 text-center">No results found.</p>;
  } else {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {results.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            showTrailer={true}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-8 py-12 bg-[#1C1C3C] text-white min-h-screen">
      <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-6 text-center sm:text-left">
        Search Results for: <span className="text-white">{query}</span>
      </h2>

      {recentSearches.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Recent Searches:</h3>
          <div className="flex flex-wrap gap-3">
            {recentSearches.map((term) => (
              <div
                key={term}
                className="flex items-center gap-2 bg-[#2C2C5C] px-3 py-1 rounded-full text-white transition-opacity duration-300 hover:opacity-80"
              >
                <span className="text-sm">{term}</span>
                <button
                  onClick={() => handleRemoveSearch(term)}
                  className="text-yellow-400 hover:text-red-400 font-bold text-sm"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          {recentSearches.length > 3 && (
            <button
              onClick={handleClearAll}
              className="mt-4 text-sm text-red-400 hover:text-red-600 underline"
            >
              Clear All
            </button>
          )}
        </div>
      )}

      {content}
    </div>
  );
};

export default SearchResults;
