// Importing React and hooks for state and side effects
import React, { useState, useEffect } from 'react';
// PropTypes for type checking
import PropTypes from 'prop-types';
// Navigation hook from React Router
import { useNavigate } from 'react-router-dom';
// Debounce utility to limit API calls
import debounce from 'lodash.debounce';

// API configuration
const API_KEY = 'fc70d3012c4f8313d3da7babb9903731';
const BASE_URL = 'https://api.themoviedb.org/3';

// SearchBar component for movie search functionality
const SearchBar = ({ onSelectMovie }) => {
  // Local state for search query, suggestions, and search history
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState([]);
  const [removingItem, setRemovingItem] = useState(null); // Track item being removed

  const navigate = useNavigate();

  // Load search history from localStorage on component mount
  useEffect(() => {
    const stored = localStorage.getItem('searchHistory');
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  // Fetch movie suggestions from TMDB API with debounce
  const fetchSuggestions = debounce(async (searchTerm) => {
    if (!searchTerm.trim()) return setSuggestions([]);

    try {
      const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}`);
      const data = await res.json();
      setSuggestions(data.results.slice(0, 5)); // Limit to 5 suggestions
    } catch (err) {
      console.error('Search error:', err);
    }
  }, 400);

  // Handle input change and trigger suggestions
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  // Handle selection of a movie from suggestions
  const handleSelect = (movie) => {
    setQuery('');
    setSuggestions([]);

    // Update search history and store in localStorage
    const updatedHistory = [movie.title, ...history.filter((h) => h !== movie.title)].slice(0, 5);
    setHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));

    // Trigger callback or navigate to search results
    if (onSelectMovie) {
      onSelectMovie(movie);
    } else {
      navigate(`/search/${encodeURIComponent(movie.title)}`);
    }
  };

  // Handle removal of a search history item with fade-out
  const handleRemoveHistoryItem = (item) => {
    setRemovingItem(item);
    setTimeout(() => {
      const updated = history.filter((h) => h !== item);
      setHistory(updated);
      localStorage.setItem('searchHistory', JSON.stringify(updated));
      setRemovingItem(null);
    }, 300); // Duration matches fade-out animation
  };

  return (
    // Container for search input and suggestions
    <div className="relative w-full max-w-xl mx-auto">
      {/* Search input field */}
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for movies..."
        className="w-full px-4 py-2 rounded bg-[#2C2C5C] text-white placeholder-yellow-400 focus:outline-none"
      />

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full bg-[#1C1C3C] text-white mt-2 rounded shadow-lg">
          {suggestions.map((movie) => (
            <button
              key={movie.id}
              type="button"
              onClick={() => handleSelect(movie)}
              className="w-full text-left px-4 py-2 hover:bg-[#FF6B6B] cursor-pointer"
            >
              {movie.title}
            </button>
          ))}
        </div>
      )}

      {/* Display recent search history directly under the search bar */}
      {history.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {history.map((item) => (
            <div
              key={`history-${item}`}
              className={`flex items-center bg-[#2C2C5C] text-sm text-gray-300 px-2 py-1 rounded transition-opacity duration-300 ${
                removingItem === item ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <span
                onClick={() => setQuery(item)}
                className="cursor-pointer hover:text-yellow-400"
              >
                {item}
              </span>
              <span
                onClick={() => handleRemoveHistoryItem(item)}
                className="ml-2 text-red-400 hover:text-red-600 cursor-pointer"
              >
                ×
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Prop type validation for optional callback
SearchBar.propTypes = {
  onSelectMovie: PropTypes.func,
};

// Exporting the SearchBar component
export default SearchBar;
