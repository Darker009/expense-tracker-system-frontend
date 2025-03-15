import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Welcome from "../components/Welcome/Welcome";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Dashboard from "../components/Dashboard/Dashboard";
import UserProfile from "../components/UserProfile/UserProfile";
import Savings from "../components/Savings/Savings";
import Expense from "../components/Expense/Expense";
import Balance from "../components/Balance/Balance";
import Report from "../components/Report/Report";

// Protected Route Component
function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");
  console.log("Checking user for protected route:", user); // Debugging
  return user ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.userId) {
          setUser(parsedUser);
        } else {
          localStorage.clear();
        }
      }
    } catch {
      localStorage.clear();
    }
    console.log("User state on mount:", user); // Debugging
  }, []);

  const login = (userData) => {
    console.log("User logging in:", userData); // Debugging
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("userId", userData.userId);
  };

  const logout = () => {
    console.log("Logging out..."); // Debugging
    setUser(null);
    localStorage.clear();
    console.log("User after logout:", localStorage.getItem("user")); // Debugging
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar user={user} logout={logout} />
        <div className="flex-grow-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login onLogin={login} />} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><UserProfile userNumber={user?.userId} onLogout={logout} /></ProtectedRoute>} />
            <Route path="/savings" element={<ProtectedRoute><Savings /></ProtectedRoute>} />
            <Route path="/expense" element={<ProtectedRoute><Expense /></ProtectedRoute>} />
            <Route path="/balance" element={<ProtectedRoute><Balance /></ProtectedRoute>} />
            <Route path="/report" element={<ProtectedRoute><Report /></ProtectedRoute>} />

            {/* Catch-all: Redirect unknown routes */}
            <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default AppRoutes;
