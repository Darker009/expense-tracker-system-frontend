import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Password validation
    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8080/api/users/register", {
        name: user.name,
        email: user.email,
        password: user.password,
      });

      alert(response.data.message || "Registration Successful! Please login.");
      navigate("/login"); // Redirect to login page
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-4">
        <div className="card p-4 shadow-lg">
          <h2 className="text-center mb-3">Register</h2>

          {/* Display error message if exists */}
          {error && <p className="text-danger text-center">{error}</p>}

          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={user.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Field */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={user.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                value={user.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          {/* Login Button Below Form */}
          <div className="text-center mt-3">
            <p>Already have an account?</p>
            <button onClick={() => navigate("/login")} className="btn btn-outline-primary w-100">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
