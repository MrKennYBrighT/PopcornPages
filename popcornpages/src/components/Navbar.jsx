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
    // Navigation bar container with background, padding, and layout styling
    <nav className="bg-[#1C1C3C] text-white px-6 py-4 flex justify-between items-center shadow-md">
      
      {/* Branding/logo section */}
      <div className="text-yellow-400 font-bold text-xl">🍿 PopcornPages</div>

      {/* Navigation links */}
      <div className="space-x-4 flex items-center">
        {/* Static links available to all users */}
        <Link to="/">Home</Link>
        <Link to="/watchlist">Watchlist</Link>
        <Link to="/trending">Trending</Link>
        <Link to="/browse">Browse</Link>

        {/* Conditional rendering based on authentication status */}
        {user ? (
          <>
            {/* Authenticated user links */}
            <Link to="/dashboard">Dashboard</Link>
            {/* Display user's name or email */}
            <span className="text-yellow-400 font-medium">Hi, {user.displayName || user.email}</span>
            {/* Logout button */}
            <button onClick={logout} className="text-red-400 hover:underline">Logout</button>
          </>
        ) : (
          <>
            {/* Guest user links */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

// Exporting the Navbar component
export default Navbar;
