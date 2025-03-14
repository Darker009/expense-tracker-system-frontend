import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Savings() {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    accountNumber: "",
    panNumber: "",
    aadhaarNumber: "",
    totalBalance: "",
    address: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Retrieve and validate the userId from localStorage
    const userIdStr = localStorage.getItem("userId");
    if (!userIdStr || userIdStr === "undefined") {
      setError("User ID not found. Please log in again.");
      return;
    }
    // Convert the userId to a number
    const userId = Number(userIdStr);
    if (isNaN(userId)) {
      setError("User ID is invalid. Please log in again.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/api/savings/register/${userId}`,
        {
          ...formData,
          totalBalance: Number(formData.totalBalance), // ensure numeric conversion if needed
        },
        {
          headers: {
            Authorization: `Bearer ${userId}`, // Pass userId as token if needed
          },
        }
      );

      navigate("/dashboard"); // Redirect to dashboard after successful submission
    } catch (err) {
      console.error("Error saving savings:", err.response ? err.response.data : err.message);
      setError("Failed to save data. Please try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6">
        <div className="card p-4 shadow-lg">
          <h2 className="text-center mb-3">Enter Savings Details</h2>
          {error && <p className="text-danger text-center">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-control"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Account Number</label>
              <input
                type="text"
                className="form-control"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">PAN Number</label>
              <input
                type="text"
                className="form-control"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Aadhaar Number</label>
              <input
                type="text"
                className="form-control"
                name="aadhaarNumber"
                value={formData.aadhaarNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Total Balance</label>
              <input
                type="number"
                className="form-control"
                name="totalBalance"
                value={formData.totalBalance}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Submit & Proceed to Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Savings;
