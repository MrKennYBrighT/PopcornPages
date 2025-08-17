// Importing React and PropTypes for type checking
import React from 'react';
import PropTypes from 'prop-types';
// Importing the SearchBar component
import SearchBar from '../components/SearchBar';

// Hero section component with a call-to-action and search functionality
const Hero = ({ handleStartPopping }) => {
  return (
    // Full-height section with gradient background and centered content
    <section className="relative w-full h-[80vh] flex items-center justify-center text-center bg-gradient-to-br from-[#1C1C3C] to-[#2C2C5C] text-white px-4">
      <div className="z-10 max-w-2xl mx-auto flex flex-col items-center">
        
        {/* Main headline */}
        <h1 className="text-[48px] md:text-[64px] font-bold mb-4 text-yellow-400 leading-tight">
          Unlimited Movies, One Popcorn
        </h1>

        {/* Supporting description */}
        <p className="text-lg md:text-xl text-gray-300 mb-8 text-center">
          Search your favorite films, explore new releases, and track what you’ve watched. Popcornpages is your personal movie vault.
        </p>

        {/* ✅ Professionally positioned SearchBar */}
        <div className="w-full max-w-xl mb-8 animate-fade-in">
          <SearchBar />
        </div>

        {/* Action buttons for browsing and starting */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Button to navigate to browse page */}
          <button
            className="px-6 py-3 bg-yellow-400 text-[#1C1C3C] font-semibold rounded hover:bg-yellow-300 transition"
            onClick={() => window.location.href = '/browse'}
          >
            Browse Movies
          </button>

          {/* Button to trigger custom action passed via props */}
          <button
            onClick={handleStartPopping}
            className="px-6 py-3 border border-yellow-400 text-yellow-400 font-semibold rounded hover:bg-yellow-400 hover:text-[#1C1C3C] transition"
          >
            Start Popping
          </button>
        </div>
      </div>

      {/* Background image with low opacity for subtle visual effect */}
      <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-10"></div>
    </section>
  );
};

// Prop type validation for the handleStartPopping function
Hero.propTypes = {
  handleStartPopping: PropTypes.func,
};

// Exporting the Hero component
export default Hero;
