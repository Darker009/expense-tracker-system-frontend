import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
      <div className="container-fluid">
        {/* Navbar Brand */}
        <Link className="navbar-brand fw-bold" to="/">Expense Tracker System</Link>

        {/* Hamburger Menu */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Placeholder for Future Hamburger Menu Options */}
            <li className="nav-item d-lg-none">
              <span className="nav-link disabled">More Options</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
