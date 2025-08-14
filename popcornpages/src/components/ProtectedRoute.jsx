import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore'; // ✅ Use correct store
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthStore(); // ✅ Pull user from useAuthStore
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
