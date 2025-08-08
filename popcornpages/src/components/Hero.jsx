import React from 'react';

const Hero = () => {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center text-center bg-gradient-to-br from-[#1C1C3C] to-[#2C2C5C] text-white px-4">
      <div className="z-10 max-w-2xl mx-auto">
        <h1 className="text-[48px] md:text-[64px] font-bold mb-4 text-yellow-400 leading-tight">
          Unlimited Movies, One Popcorn
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Search your favorite films, explore new releases, and track what you’ve watched. Popcornpages is your personal movie vault.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <button className="px-6 py-3 bg-yellow-400 text-[#1C1C3C] font-semibold rounded hover:bg-yellow-300 transition">
            Browse Movies
          </button>
          <button className="px-6 py-3 border border-yellow-400 text-yellow-400 font-semibold rounded hover:bg-yellow-400 hover:text-[#1C1C3C] transition">
            Start Popping
          </button>
        </div>
        <div className="mt-8 flex justify-center">
          <input
            type="text"
            placeholder="Search movies..."
            className="px-4 py-2 rounded-l bg-white text-black w-64 placeholder-yellow-400 focus:outline-none"
          />
          <button className="px-4 py-2 rounded-r bg-yellow-400 text-[#1C1C3C] font-semibold hover:bg-yellow-300 transition">
            Search
          </button>
        </div>
      </div>

      <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-10"></div>
    </section>
  );
};

export default Hero;
