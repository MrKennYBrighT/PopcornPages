// components/RecentSearches.jsx
import React, { useState } from 'react';


const RecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState(() => {
    const stored = localStorage.getItem('recentSearches');
    return stored ? JSON.parse(stored) : [];
  });

  const handleRemoveSearch = (termToRemove) => {
    const updated = recentSearches.filter((term) => term !== termToRemove);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleClearAll = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  if (recentSearches.length === 0) return null;

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-white mb-4">Recent Searches:</h3>
      <div className="flex flex-wrap gap-3">
        {recentSearches.map((term) => (
          <div
            key={term}
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
  );
};

export default RecentSearches;
