import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';

const API_KEY = 'fc70d3012c4f8313d3da7babb9903731';
const BASE_URL = 'https://api.themoviedb.org/3';

const SearchBar = ({ onSelectMovie }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('searchHistory');
    if (stored) setHistory(JSON.parse(stored));
  }, []);

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

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  const handleSelect = (movie) => {
    setQuery('');
    setSuggestions([]);
    const updatedHistory = [movie.title, ...history.filter((h) => h !== movie.title)].slice(0, 5);
    setHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));

    if (onSelectMovie) {
      onSelectMovie(movie);
    } else {
      navigate(`/search/${encodeURIComponent(movie.title)}`);
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for movies..."
        className="w-full px-4 py-2 rounded bg-[#2C2C5C] text-white placeholder-yellow-400 focus:outline-none"
      />

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

      {history.length > 0 && (
        <div className="mt-4 text-sm text-gray-400">
          <p className="mb-1">Recent Searches:</p>
          <div className="flex flex-wrap gap-2">
            {history.map((item) => (
              <button
                key={`history-${item}`}
                type="button"
                onClick={() => setQuery(item)}
                className="bg-[#2C2C5C] px-2 py-1 rounded cursor-pointer hover:bg-[#FF6B6B]"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  onSelectMovie: PropTypes.func,
};

export default SearchBar;
