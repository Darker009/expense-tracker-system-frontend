import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [userId, setUserId] = useState(""); // Manual user ID entry
  const [savings, setSavings] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUserData = async () => {
    if (!userId) return;
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
      if (response.data.active) {
        setSavings(response.data.savings || 0);
        setExpenses(response.data.expenses || 0);
      } else {
        setError("User is deactivated. Access denied.");
      }
    } catch (err) {
      setError("User not found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="col-md-8">
        <div className="card shadow-lg p-4 text-center">
          <h2 className="mb-4">Dashboard</h2>
          <p>Welcome to your Expense Tracker Dashboard.</p>

          {/* User ID Input */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control text-center"
              placeholder="Enter User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <button className="btn btn-primary mt-2" onClick={fetchUserData} disabled={loading}>
              {loading ? "Loading..." : "Fetch Data"}
            </button>
          </div>

          {error && <p className="text-danger">{error}</p>}

          {/* Savings & Expenses Display */}
          {!error && userId && (
            <div className="row mt-4">
              <div className="col-md-6">
                <div className="card text-white bg-primary mb-3 shadow">
                  <div className="card-body">
                    <h5 className="card-title">Total Savings</h5>
                    <p className="card-text">₹ {savings}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card text-white bg-danger mb-3 shadow">
                  <div className="card-body">
                    <h5 className="card-title">Total Expenses</h5>
                    <p className="card-text">₹ {expenses}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-3">
            <button className="btn btn-success me-2">Add Income</button>
            <button className="btn btn-warning">Add Expense</button>
          </div>

          <div className="mt-4">
            <Link to="/profile" className="btn btn-info">
              Go to Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
