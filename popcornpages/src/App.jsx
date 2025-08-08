import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './components/Home';
import ReactionBox from './components/ReactionBox';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Watchlist from './views/Watchlist';
import Trending from './views/Trending';
import LoginForm from './components/LoginForm';
import Signup from './components/Signup';
import MovieDetail from './views/MovieDetail';
import PageWrapper from './components/PageWrapper';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function AppContent() {
  const location = useLocation();
  const hideFooterOn = ['/login', '/signup'];

  return (
    <div className="bg-[#1C1C3C] min-h-screen text-white font-inter flex flex-col">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <ReactionBox />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Navbar />
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/watchlist"
            element={
              <>
                <Navbar />
                <Watchlist />
              </>
            }
          />
          <Route
            path="/trending"
            element={
              <>
                <Navbar />
                <Trending />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <PageWrapper fullWidth center>
                <Navbar />
                <LoginForm />
              </PageWrapper>
            }
          />
          <Route
            path="/signup"
            element={
              <PageWrapper fullWidth center>
                <Navbar />
                <Signup />
              </PageWrapper>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <>
                <Navbar />
                <MovieDetail />
              </>
            }
          />
        </Routes>
      </div>

      {/* Conditionally render footer */}
      {!hideFooterOn.includes(location.pathname) && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
