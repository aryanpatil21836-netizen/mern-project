import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // login nahi hai
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  // admin route hai but user admin nahi hai
  if (adminOnly && !userInfo.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;