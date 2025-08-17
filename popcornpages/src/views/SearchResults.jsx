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

  return (
    <div className="px-8 py-12 bg-[#1C1C3C] text-white min-h-screen">
      {/* 🔍 Search Title */}
      <h2 className="text-3xl font-bold text-yellow-400 mb-6">
        Search Results for: <span className="text-white">{query}</span>
      </h2>

      {/* ⏳ Loading / ❌ No Results / ✅ Results */}
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : results.length === 0 ? (
        <p className="text-gray-400">No results found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {results.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              showTrailer={true} // 🔥 Bonus: Show trailer button
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
