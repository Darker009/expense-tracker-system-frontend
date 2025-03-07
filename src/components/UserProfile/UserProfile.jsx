import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import profileImg from "../../assets/profile.jpg";

function UserProfile({ userId, onLogout }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ name: "", email: "" });

  useEffect(() => {
    axios.get(`http://localhost:8080/api/users/${userId}`)
      .then(response => setUser(response.data))
      .catch(error => console.error("Error fetching user:", error));
  }, [userId]);

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:8080/api/users/${userId}`, updatedUser)
      .then(response => {
        alert("Profile updated successfully!");
        setUser(response.data);
        setEditMode(false);
      })
      .catch(error => console.error("Error updating user:", error));
  };

  const handleDeactivate = () => {
    axios.delete(`http://localhost:8080/api/users/${userId}`)
      .then(() => {
        alert("Account deactivated! Please log in again.");
        onLogout();
        navigate("/login");
      })
      .catch(error => console.error("Error deactivating account:", error));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6">
        <div className="card shadow-lg p-4 text-center">
          <h2 className="mb-3">User Profile</h2>

          {user && (
            <div className="mb-3">
              <img src={profileImg} alt="User Avatar" className="rounded-circle mb-3" width="100" />
              {!editMode ? (
                <>
                  <h5 className="fw-bold">{user.name}</h5>
                  <p className="text-muted">{user.email}</p>
                </>
              ) : (
                <div>
                  <input type="text" name="name" className="form-control mb-2" value={updatedUser.name} onChange={handleChange} placeholder="New Name" />
                  <input type="email" name="email" className="form-control" value={updatedUser.email} onChange={handleChange} placeholder="New Email" />
                </div>
              )}
            </div>
          )}

          <div className="mt-3">
            {editMode ? (
              <button className="btn btn-success me-2" onClick={handleUpdate}>Save</button>
            ) : (
              <button className="btn btn-warning me-2" onClick={() => setEditMode(true)}>Edit Profile</button>
            )}
            <button className="btn btn-danger me-2" onClick={handleDeactivate}>Deactivate</button>
            <button className="btn btn-secondary" onClick={onLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
