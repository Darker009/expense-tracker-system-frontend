import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer"; // Import the Footer component
import Welcome from "../components/Welcome/Welcome";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Dashboard from "../components/Dashboard/Dashboard";
import UserProfile from "../components/UserProfile/UserProfile";
import Savings from "../components/Savings/Savings";
import Expense from "../components/Expense/Expense";
import Balance from "../components/Balance/Balance";
import Report from "../components/Report/Report";

function AppRoutes() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    try {
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.email) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem("user");
        }
      }
    } catch (error) {
      localStorage.removeItem("user");
    }
  }, []);
  
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
  };
  
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar user={user} logout={logout} />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login onLogin={login} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/savings" element={<Savings />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/balance" element={<Balance />} />
            <Route path="/report" element={<Report />} />
            <Route path="/profile" element={user ? <UserProfile onLogout={logout} /> : <Navigate to="/login" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default AppRoutes;
