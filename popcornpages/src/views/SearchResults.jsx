import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

// TMDB API configuration
const API_KEY = 'fc70d3012c4f8313d3da7babb9903731';
const BASE_URL = 'https://api.themoviedb.org/3';

const SearchResults = () => {
  const { query } = useParams(); // Get search query from URL params

  // Local state for search results and loading status
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Recent searches with localStorage persistence
  const [recentSearches, setRecentSearches] = useState(() => {
    const stored = localStorage.getItem('recentSearches');
    return stored ? JSON.parse(stored) : [];
  });

  // Add current query to recent searches
  useEffect(() => {
    if (query && !recentSearches.includes(query)) {
      const updated = [query, ...recentSearches].slice(0, 10);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    }
  }, [query, recentSearches]); // ✅ Fixed missing dependency

  // Remove individual search
  const handleRemoveSearch = (termToRemove) => {
    const updated = recentSearches.filter((term) => term !== termToRemove);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Clear all searches
  const handleClearAll = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // Fetch search results when query changes
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
        const data = await res.json();
        setResults(data.results); // Update results state
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false); // Stop loading regardless of outcome
      }
    };

    fetchSearchResults();
  }, [query]);

  // Extracted ternary logic into independent statement
  let content;
  if (loading) {
    content = <p className="text-gray-400">Loading...</p>;
  } else if (results.length === 0) {
    content = <p className="text-gray-400">No results found.</p>;
  } else {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {results.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            showTrailer={true} // 🔥 Bonus: Show trailer button
          />
        ))}
      </div>
    );
  }

  return (
    <div className="px-8 py-12 bg-[#1C1C3C] text-white min-h-screen">
      {/* 🔍 Search Title */}
      <h2 className="text-3xl font-bold text-yellow-400 mb-6">
        Search Results for: <span className="text-white">{query}</span>
      </h2>

      {/* 🕵️ Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Recent Searches:</h3>
          <div className="flex flex-wrap gap-3">
            {recentSearches.map((term) => (
              <div
                key={term} // ✅ Use term instead of index
                className="flex items-center gap-2 bg-[#2C2C5C] px-3 py-1 rounded-full text-white transition-opacity duration-300 hover:opacity-80"
              >
                <span>{term}</span>
                <button
                  onClick={() => handleRemoveSearch(term)}
                  className="text-yellow-400 hover:text-red-400 font-bold"
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

      {/* ⏳ Loading / ❌ No Results / ✅ Results */}
      {content}
    </div>
  );
};

export default SearchResults;
