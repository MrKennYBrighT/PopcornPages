import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Component imports
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
import Browse from './views/Browse';
import ProtectedRoute from './components/ProtectedRoute';
import SearchResults from './views/SearchResults'; // ✅ added

// Store imports
import { useAuthStore } from './store/useAuthStore';
import { useWatchlistStore } from './store/watchlistStore'; // ✅ added

function AppContent() {
  const location = useLocation();

  // Pages where footer should be hidden
  const hideFooterOn = ['/login', '/signup'];

  // Access auth and watchlist store
  const { loading, user } = useAuthStore();
  const { loadWatchlist } = useWatchlistStore(); // ✅ added

  // Load watchlist when user is authenticated
  useEffect(() => {
    if (user) {
      loadWatchlist(); // ✅ load watchlist when user is present
    }
  }, [user, loadWatchlist]); // ✅ fixed dependency warning

  // Show loading screen while auth state is initializing
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#1C1C3C] text-white">
        <p className="text-gray-400 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1C1C3C] min-h-screen text-white font-inter flex flex-col">
      {/* Toast notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Main content area */}
      <div className="flex-grow">
        <Routes>
          {/* 🏠 Home Route */}
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

          {/* 🧑‍💼 Dashboard (Protected) */}
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

          {/* 📺 Watchlist (Protected) */}
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

          {/* 🔍 Browse */}
          <Route
            path="/browse"
            element={
              <>
                <Navbar />
                <Browse />
              </>
            }
          />

          {/* 🔥 Trending */}
          <Route
            path="/trending"
            element={
              <>
                <Navbar />
                <Trending />
              </>
            }
          />

          {/* 🔐 Login */}
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

          {/* 📝 Signup */}
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

          {/* 🎬 Movie Detail */}
          <Route
            path="/movie/:id"
            element={
              <>
                <Navbar />
                <MovieDetail />
              </>
            }
          />

          {/* 🔎 Search Results */}
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

      {/* 📎 Footer (conditionally hidden) */}
      {!hideFooterOn.includes(location.pathname) && <Footer />}
    </div>
  );
}

// Wrap AppContent with Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
