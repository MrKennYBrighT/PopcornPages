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

  // Close menu after clicking a link (mobile only)
  const handleLinkClick = () => {
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <>
      {/* Soft backdrop overlay for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Navigation bar container with enhanced padding and layout styling */}
      <nav className="bg-[#1C1C3C]/80 backdrop-blur-md text-white px-6 py-4 md:px-10 md:py-8 flex justify-between items-center shadow-md sticky top-0 z-50 transition-all duration-300">
        
        {/* Branding/logo section */}
        <div className="flex items-center space-x-3">
          <img src="/favicon.ico" alt="Popcorn Logo" className="w-8 h-8" />
          <span className="text-yellow-400 font-bold text-2xl">PopcornPages</span>
        </div>

        {/* Desktop navigation links */}
        <div className="hidden md:flex space-x-6 items-center text-lg">
          <Link to="/" className="transition duration-300 text-white hover:!text-[#FFD966]">Home</Link>
          <Link to="/watchlist" className="transition duration-300 text-white hover:!text-[#FFD966]">Watchlist</Link>
          <Link to="/trending" className="transition duration-300 text-white hover:!text-[#FFD966]">Trending</Link>
          <Link to="/browse" className="transition duration-300 text-white hover:!text-[#FFD966]">Browse</Link>

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

        {/* Mobile menu toggle button */}
        <button
          className="md:hidden text-yellow-400 focus:outline-none z-50"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          {/* SVG hamburger icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Slide-in mobile menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-[#1C1C3C]/95 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden flex flex-col space-y-6 px-6 py-8 text-lg`}
        >
          {/* Close button for mobile menu */}
          <button
            className="self-end mb-4 text-yellow-400 focus:outline-none"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            {/* SVG close icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Static links available to all users */}
          <Link to="/" onClick={handleLinkClick} className="transition duration-300 text-white hover:!text-[#FFD966]">Home</Link>
          <Link to="/watchlist" onClick={handleLinkClick} className="transition duration-300 text-white hover:!text-[#FFD966]">Watchlist</Link>
          <Link to="/trending" onClick={handleLinkClick} className="transition duration-300 text-white hover:!text-[#FFD966]">Trending</Link>
          <Link to="/browse" onClick={handleLinkClick} className="transition duration-300 text-white hover:!text-[#FFD966]">Browse</Link>

          {user ? (
            <>
              <Link to="/dashboard" onClick={handleLinkClick} className="transition duration-300 text-white hover:!text-[#FFD966]">Dashboard</Link>
              <span className="text-yellow-400 font-medium">Hi, {user.displayName || user.email}</span>
              <button onClick={() => { logout(); handleLinkClick(); }} className="text-red-400 hover:!text-[#FFD966] transition duration-300">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={handleLinkClick} className="transition duration-300 text-white hover:!text-[#FFD966]">Login</Link>
              <Link to="/signup" onClick={handleLinkClick} className="transition duration-300 text-white hover:!text-[#FFD966]">Signup</Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

// Exporting the Navbar component
export default Navbar;
