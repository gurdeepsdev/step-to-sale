import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />; // Redirect to your login/signup page
  }

  return <Outlet />; // This will render the nested <Route> (Account)
};

export default ProtectedRoute;