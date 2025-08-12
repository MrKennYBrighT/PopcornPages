// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useUserStore from '../store/userStore';
import PropTypes from 'prop-types'; // ✅ Added PropTypes

const ProtectedRoute = ({ children }) => {
  const user = useUserStore((state) => state.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // ✅ Props validation added
};

export default ProtectedRoute;
