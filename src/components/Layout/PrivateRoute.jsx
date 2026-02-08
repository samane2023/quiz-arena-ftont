// src/components/Layout/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const PrivateRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, currentUser } = useAuth();

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  // if (requireAdmin && currentUser.role !== 'admin') {
  //   return <Navigate to="/" replace />;
  // }

  return children;
};

export default PrivateRoute;
