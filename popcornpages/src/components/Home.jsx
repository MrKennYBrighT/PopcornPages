import React from 'react';
import Hero from '../components/Hero';
import FeaturedMovies from '../components/FeaturedMovies';
import PageWrapper from '../components/PageWrapper';

const Home = () => {
  return (
    <div className="bg-[#1C1C3C] text-white">
      <Hero />

      {/* Removed Popcornpages heading, tagline, and Browse Movies button */}

      {/* Removed LoginForm from landing page */}

      <PageWrapper>
        <FeaturedMovies />
      </PageWrapper>
    </div>
  );
};

export default Home;
