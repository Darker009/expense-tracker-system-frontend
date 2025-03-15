import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ user, logout }) {
  const navigate = useNavigate();

  // Function to collapse navbar
  const collapseNavbar = () => {
    const navbarCollapse = document.getElementById("navbarNav");
    if (navbarCollapse?.classList.contains("show")) {
      new window.bootstrap.Collapse(navbarCollapse).hide();
    }
  };

  const handleLogout = () => {
    logout();
    collapseNavbar();
    navigate("/login");
  };

  // Collapse navbar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbarCollapse = document.getElementById("navbarNav");
      if (navbarCollapse?.classList.contains("show") && !navbarCollapse.contains(event.target)) {
        new window.bootstrap.Collapse(navbarCollapse).hide();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top shadow-sm">
      <div className="container">
        <button
          className="navbar-brand btn btn-link text-white fw-bold"
          onClick={() => {
            collapseNavbar();
            navigate("/");
          }}
        >
          Expense Tracker System
        </button>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            {user ? (
              <>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link text-white"
                    onClick={() => {
                      collapseNavbar();
                      navigate("/dashboard");
                    }}
                  >
                    Dashboard
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link text-white"
                    onClick={() => {
                      collapseNavbar();
                      navigate("/profile");
                    }}
                  >
                    Profile
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-outline-light"
                  onClick={() => {
                    collapseNavbar();
                    navigate("/login");
                  }}
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
