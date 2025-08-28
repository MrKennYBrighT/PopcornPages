// src/views/ComingSoon.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ComingSoon = () => {
  return (
    <div className="p-10 text-white bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold text-yellow-400 mb-4">Coming Soon 🚧</h1>
      <p className="text-lg mb-6">Check back later — this feature is on the way!</p>
      <Link to="/" className="text-blue-400 hover:underline">← Back to Home</Link>
    </div>
  );
};

export default ComingSoon;
