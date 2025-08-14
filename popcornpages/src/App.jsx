import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './components/Home';
import ReactionBox from './components/ReactionBox';
import Dashboard from './components/Dashboard';
import Watchlist from './views/Watchlist';
import Trending from './views/Trending';
import LoginForm from './components/LoginForm';
import Signup from './components/Signup';
import MovieDetail from './views/MovieDetail';
import PageWrapper from './components/PageWrapper';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useAuthStore } from './store/useAuthStore';
import Browse from './views/Browse';
import ProtectedRoute from './components/ProtectedRoute';
import { useWatchlistStore } from './store/watchlistStore'; // ✅ added
import SearchResults from './views/SearchResults'; // ✅ added

function AppContent() {
  const location = useLocation();
  const hideFooterOn = ['/login', '/signup'];
  const { loading, user } = useAuthStore();
  const { loadWatchlist } = useWatchlistStore(); // ✅ added

  useEffect(() => {
    if (user) {
      loadWatchlist(); // ✅ load watchlist when user is present
    }
  }, [user, loadWatchlist]); // ✅ fixed dependency warning

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#1C1C3C] text-white">
        <p className="text-gray-400 text-lg">Loading...</p>
      </div>
    );
  }

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
                <>
                  <Navbar />
                  <Dashboard />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/watchlist"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Watchlist />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/browse"
            element={
              <>
                <Navbar />
                <Browse />
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
              <>
                <Navbar />
                <PageWrapper fullWidth center>
                  <LoginForm />
                </PageWrapper>
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Navbar />
                <PageWrapper fullWidth center>
                  <Signup />
                </PageWrapper>
              </>
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
          <Route
            path="/search/:query"
            element={
              <>
                <Navbar />
                <SearchResults />
              </>
            }
          /> {/* ✅ added */}
        </Routes>
      </div>

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
