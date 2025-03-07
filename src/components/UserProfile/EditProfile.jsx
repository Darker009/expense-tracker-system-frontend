import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EditProfile() {
  const navigate = useNavigate();
  const [userNumber, setUserNumber] = useState("");
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUserNumberChange = (e) => {
    setUserNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!userNumber) {
      setError("Please enter your User Number.");
      return;
    }

    if (!formData.name.trim() || !formData.password.trim()) {
      setError("Name and Password fields cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      await axios.put(`http://localhost:8080/api/users/${userNumber}`, formData);
      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6">
        <div className="card shadow-lg p-4">
          <h2 className="text-center mb-3">Edit Profile</h2>
          {error && <p className="text-danger text-center">{error}</p>}
          
          <form onSubmit={handleSubmit}>
            {/* User Number */}
            <div className="mb-3">
              <label className="form-label fw-bold">User Number</label>
              <input
                type="text"
                className="form-control"
                value={userNumber}
                onChange={handleUserNumberChange}
                required
                autoFocus
              />
            </div>

            {/* Name Field */}
            <div className="mb-3">
              <label className="form-label fw-bold">New Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <label className="form-label fw-bold">New Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Save Button */}
            <button type="submit" className="btn btn-success w-100" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>

          {/* Cancel Button */}
          <button className="btn btn-secondary mt-3 w-100" onClick={() => navigate("/profile")}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
