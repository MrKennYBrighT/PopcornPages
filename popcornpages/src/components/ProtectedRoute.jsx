import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from '../store/userStore';

const ProtectedRoute = ({ children }) => {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
