import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home'; // Corrected path
import FeaturedMovies from './components/FeaturedMovies';
import ReactionBox from './components/ReactionBox';

function App() {
  return (
    <Router>
      {/* Full screen background with default font and white text */}
      <div className="bg-[#1C1C3C] min-h-screen text-white font-inter">
        
        {/* Show the Navbar at the top */}
        <Navbar />

        {/* Define routes for different pages */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <FeaturedMovies />
                <ReactionBox />
              </>
            }
          />
          {/* Future routes like /profile, /watchlist, etc. will go here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
