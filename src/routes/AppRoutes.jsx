import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Welcome from "../components/Welcome/Welcome";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Dashboard from "../components/Dashboard/Dashboard";
import UserProfile from "../components/UserProfile/UserProfile";

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
            localStorage.removeItem("user"); // Remove invalid user
          }
        }
      } catch (error) {
        localStorage.removeItem("user"); // Remove corrupted data
      }
    }, []);
  
    const login = (userData) => {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    };
  
    const logout = () => {
      setUser(null);
      localStorage.removeItem("user");
    };
  
    return (
      <Router>
        <Navbar user={user} logout={logout} />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <UserProfile onLogout={logout} /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    );
  }
  
export default AppRoutes;
