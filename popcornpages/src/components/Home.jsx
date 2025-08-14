import React from 'react';
import FeaturedMovies from '../components/FeaturedMovies';
import PageWrapper from '../components/PageWrapper';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import Hero from '../components/Hero'; // ✅ Import Hero

const Home = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleStartPopping = () => {
    if (user) {
      const reactionBox = document.getElementById('reaction-box');
      if (reactionBox) {
        reactionBox.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      toast(
        (t) => (
          <span className="flex flex-col gap-2">
            <span className="text-white">Create an account or login to start popping reactions!</span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  navigate('/signup');
                }}
                className="px-3 py-1 bg-yellow-400 text-[#1C1C3C] rounded font-semibold"
              >
                Sign Up
              </button>
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
    <div className="bg-[#1C1C3C] text-white">
      {/* ✅ Use Hero component instead of duplicating layout */}
      <Hero handleStartPopping={handleStartPopping} />

      <PageWrapper>
        <FeaturedMovies />
        <div id="reaction-box" />
      </PageWrapper>
    </div>
  );
};

export default Home;
