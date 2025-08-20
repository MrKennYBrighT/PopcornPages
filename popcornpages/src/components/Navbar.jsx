// Importing React for component creation
import React from 'react';
// Importing Link for navigation between routes
import { Link } from 'react-router-dom';
// Custom hook to access authentication state and logout function
import { useAuthStore } from '../store/useAuthStore';

// Navbar component for site-wide navigation
const Navbar = () => {
  // Access current user and logout function from auth store
  const { user, logout } = useAuthStore();

  return (
    // Navigation bar container with enhanced padding and layout styling
    <nav className="bg-[#1C1C3C]/80 backdrop-blur-md text-white px-10 py-8 flex justify-between items-center shadow-md sticky top-0 z-50 transition-all duration-300">
      
      {/* Branding/logo section */}
      <div className="flex items-center space-x-3">
        <img src="/favicon.ico" alt="Popcorn Logo" className="w-8 h-8" />
        <span className="text-yellow-400 font-bold text-2xl">PopcornPages</span>
      </div>

      {/* Navigation links */}
      <div className="space-x-6 flex items-center text-lg">
        {/* Static links available to all users */}
        <Link to="/" className="text-white transition duration-300 hover:text-yellow-400">Home</Link>
        <Link to="/watchlist" className="text-white transition duration-300 hover:text-yellow-400">Watchlist</Link>
        <Link to="/trending" className="text-white transition duration-300 hover:text-yellow-400">Trending</Link>
        <Link to="/browse" className="text-white transition duration-300 hover:text-yellow-400">Browse</Link>

        {/* Conditional rendering based on authentication status */}
        {user ? (
          <>
            <Link to="/dashboard" className="text-white transition duration-300 hover:text-yellow-400">Dashboard</Link>
            <span className="text-yellow-400 font-medium">Hi, {user.displayName || user.email}</span>
            <button onClick={logout} className="text-red-400 hover:text-yellow-400 transition duration-300">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white transition duration-300 hover:text-yellow-400">Login</Link>
            <Link to="/signup" className="text-white transition duration-300 hover:text-yellow-400">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

// Exporting the Navbar component
export default Navbar;
