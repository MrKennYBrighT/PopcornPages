import React from 'react';
import Hero from '../components/Hero';
import FeaturedMovies from '../components/FeaturedMovies';

const Home = () => {
  return (
    <div className="bg-[#1C1C3C] text-white">
      <Hero />

      <div className="flex flex-col items-center justify-center min-h-[40vh] px-4">
        <h1 className="text-5xl font-bold mb-6 text-yellow-400">Popcornpages 🍿</h1>
        <p className="text-lg text-center max-w-xl text-gray-300">
          Dive into a world of cinema. Discover trending movies, 
          explore timeless classics, and build your personal 
          watchlist—all in one place.
        </p>
        <button className="mt-8 px-6 py-3 bg-yellow-400 text-[#1C1C3C] font-semibold rounded hover:bg-yellow-300 transition">
          Browse Movies
        </button>
      </div>

      <FeaturedMovies />
    </div>
  );
};

export default Home;
