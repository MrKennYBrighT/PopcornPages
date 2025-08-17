// Importing React for component creation
import React from 'react';
// Importing child components used on the homepage
import FeaturedMovies from '../components/FeaturedMovies';
import PageWrapper from '../components/PageWrapper';
import Hero from '../components/Hero'; // ✅ Import Hero
// Navigation hook from React Router
import { useNavigate } from 'react-router-dom';
// Custom hook to access authentication state
import { useAuthStore } from '../store/useAuthStore';
// Toast notifications for user feedback
import toast from 'react-hot-toast';

// Home page component
const Home = () => {
  // Access current user from auth store
  const { user } = useAuthStore();
  const navigate = useNavigate();

  // Handler for "Start Popping" button click
  const handleStartPopping = () => {
    if (user) {
      // If user is logged in, scroll to the reaction box
      const reactionBox = document.getElementById('reaction-box');
      if (reactionBox) {
        reactionBox.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If user is not logged in, show toast with login/signup options
      toast(
        (t) => (
          <span className="flex flex-col gap-2">
            <span className="text-white">Create an account or login to start popping reactions!</span>
            <div className="flex gap-2">
              {/* Sign Up button */}
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  navigate('/signup');
                }}
                className="px-3 py-1 bg-yellow-400 text-[#1C1C3C] rounded font-semibold"
              >
                Sign Up
              </button>
              {/* Login button */}
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  navigate('/login');
                }}
                className="px-3 py-1 border border-yellow-400 text-yellow-400 rounded font-semibold"
              >
                Login
              </button>
            </div>
          </span>
        ),
        {
          duration: 5000,
          style: {
            background: '#2C2C5C',
            color: 'white',
          },
        }
      );
    }
  };

  return (
    // Main container with dark background and white text
    <div className="bg-[#1C1C3C] text-white">
      {/* ✅ Use Hero component instead of duplicating layout */}
      <Hero handleStartPopping={handleStartPopping} />

      {/* PageWrapper provides consistent layout styling */}
      <PageWrapper>
        {/* Display trending movies */}
        <FeaturedMovies />
        {/* Scroll target for reactions */}
        <div id="reaction-box" />
      </PageWrapper>
    </div>
  );
};

// Exporting the Home component
export default Home;
