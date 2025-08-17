// Importing React for component creation
import React from 'react';
// Importing navigation utilities from React Router
import { Navigate, useLocation } from 'react-router-dom';
// Custom hook to access authentication state
import { useAuthStore } from '../store/useAuthStore'; // ✅ Use correct store
// PropTypes for type checking
import PropTypes from 'prop-types';

// Component to protect routes from unauthenticated access
const ProtectedRoute = ({ children }) => {
  // Access current user from auth store
  const { user } = useAuthStore(); // ✅ Pull user from useAuthStore
  // Get current location to redirect back after login
  const location = useLocation();

  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If user is authenticated, render the protected content
  return children;
};

// Prop type validation for children prop
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

// Exporting the ProtectedRoute component
export default ProtectedRoute;
