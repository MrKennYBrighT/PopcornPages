// Importing React for component creation
import React, { useState } from 'react';
// Importing Link for navigation between routes
import { Link } from 'react-router-dom';
// Custom hook to access authentication state and logout function
import { useAuthStore } from '../store/useAuthStore';

// Navbar component for site-wide navigation
const Navbar = () => {
  // Access current user and logout function from auth store
  const { user, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    // Navigation bar container with enhanced padding and layout styling
    <nav className="bg-[#1C1C3C]/80 backdrop-blur-md text-white px-6 py-4 md:px-10 md:py-8 flex justify-between items-center shadow-md sticky top-0 z-50 transition-all duration-300">
      
      {/* Branding/logo section */}
      <div className="flex items-center space-x-3">
        <img src="/favicon.ico" alt="Popcorn Logo" className="w-8 h-8" />
        <span className="text-yellow-400 font-bold text-2xl">PopcornPages</span>
      </div>

      {/* Mobile menu toggle button */}
      <button
        className="md:hidden text-yellow-400 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Navigation links */}
      <div className={`flex-col md:flex-row md:flex space-y-4 md:space-y-0 space-x-0 md:space-x-6 items-center text-lg ${menuOpen ? 'flex' : 'hidden'} md:flex`}>
        {/* Static links available to all users */}
        <Link to="/" className="transition duration-300 text-white hover:!text-[#FFD966]">Home</Link>
        <Link to="/watchlist" className="transition duration-300 text-white hover:!text-[#FFD966]">Watchlist</Link>
        <Link to="/trending" className="transition duration-300 text-white hover:!text-[#FFD966]">Trending</Link>
        <Link to="/browse" className="transition duration-300 text-white hover:!text-[#FFD966]">Browse</Link>

        {/* Conditional rendering based on authentication status */}
        {user ? (
          <>
            <Link to="/dashboard" className="transition duration-300 text-white hover:!text-[#FFD966]">Dashboard</Link>
            <span className="text-yellow-400 font-medium">Hi, {user.displayName || user.email}</span>
            <button onClick={logout} className="text-red-400 hover:!text-[#FFD966] transition duration-300">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="transition duration-300 text-white hover:!text-[#FFD966]">Login</Link>
            <Link to="/signup" className="transition duration-300 text-white hover:!text-[#FFD966]">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

// Exporting the Navbar component
export default Navbar;
