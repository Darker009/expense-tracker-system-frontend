import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const userId = localStorage.getItem("userId"); // Check if user is logged in
  return userId ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
