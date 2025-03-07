import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar({ user, logout }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Handle logout with redirection
  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to welcome page after logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to={user ? "/dashboard" : "/"}>Expense Tracker</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""}`} to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`} to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger ms-3" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/login" ? "active" : ""}`} to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/register" ? "active" : ""}`} to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
