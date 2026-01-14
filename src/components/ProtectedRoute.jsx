import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
  // If the user is not logged in, redirect them to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // If they are logged in, show the page (children)
  return children;
};

export default ProtectedRoute;