import React from "react";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      }}
    >
      <div
        className="text-center p-5 rounded shadow"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          maxWidth: "600px",
          width: "90%",
        }}
      >
        <h1 className="display-3 fw-bold text-white">Welcome to Expense Tracker</h1>
        <p className="fs-4 text-white mt-3">
          Manage your expenses effortlessly and take control of your finances.
        </p>
        <div className="d-grid gap-3 d-sm-flex justify-content-center mt-4">
          <Link to="/login" className="btn btn-primary btn-lg px-4">
            Login
          </Link>
          <Link to="/register" className="btn btn-outline-light btn-lg px-4">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
