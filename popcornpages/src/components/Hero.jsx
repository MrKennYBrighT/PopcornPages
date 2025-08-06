import React from 'react';

const Hero = () => {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center text-center bg-gradient-to-br from-[#1C1C3C] to-[#2C2C5C] text-white px-4">
      <div className="z-10">
        <h1 className="text-5xl font-bold mb-4 text-yellow-400">Unlimited Movies, One Popcorn</h1>
        <p className="text-lg text-gray-300 max-w-xl mx-auto">
          Search your favorite films, explore new releases, and track what you’ve watched. Popcornpages is your personal movie vault.
        </p>
        <div className="mt-6">
          <input
            type="text"
            placeholder="Search movies..."
            className="px-4 py-2 rounded-l bg-white text-black w-64 focus:outline-none"
          />
          <button className="px-4 py-2 rounded-r bg-yellow-400 text-[#1C1C3C] font-semibold hover:bg-yellow-300 transition">
            Search
          </button>
        </div>
      </div>

      {/* Optional: Add a background image overlay */}
      <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-10"></div>
    </section>
  );
};

export default Hero;
