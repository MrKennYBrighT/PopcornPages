// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-[#1C1C3C] text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-yellow-400 font-bold text-xl">🍿 PopcornPages</div>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/watchlist">Watchlist</Link>
        <Link to="/trending">Trending</Link>
        <Link to="/browse">Browse</Link>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={logout} className="text-red-400 hover:underline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
