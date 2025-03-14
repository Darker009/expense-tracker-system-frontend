import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // Function to collapse the navbar if it's open
  const collapseNavbar = () => {
    const navbarCollapse = document.getElementById("navbarNav");
    if (navbarCollapse && navbarCollapse.classList.contains("show")) {
      new window.bootstrap.Collapse(navbarCollapse, { toggle: false }).hide();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    collapseNavbar();
    navigate("/login");
  };

  // Collapse the navbar when clicking outside of it
  useEffect(() => {
    const handleDocumentClick = (event) => {
      const navbarCollapse = document.getElementById("navbarNav");
      // Check if the navbar is open and the click target is not inside it
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        if (!navbarCollapse.contains(event.target)) {
          new window.bootstrap.Collapse(navbarCollapse, { toggle: false }).hide();
        }
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
      <div className="container-fluid">
        {/* Navbar Brand */}
        <Link className="navbar-brand fw-bold" to="/" onClick={collapseNavbar}>
          Expense Tracker System
        </Link>
        {/* Hamburger Menu for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Navbar Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            {userId && (
              <li className="nav-item me-3">
                <Link className="nav-link" to="/dashboard" onClick={collapseNavbar}>
                  Dashboard
                </Link>
              </li>
            )}
            {userId && (
              <li className="nav-item me-3">
                <Link className="nav-link" to="/profile" onClick={collapseNavbar}>
                  Profile
                </Link>
              </li>
            )}
            <li className="nav-item">
              {userId ? (
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <Link className="btn btn-primary" to="/login" onClick={collapseNavbar}>
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
