import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import defaultProfileImg from "../../assets/profile.jpg";

function UserProfile({ userNumber, onLogout }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ name: "", password: "" });
  const [profileImage, setProfileImage] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/users/${userNumber}`)
      .then(response => {
        setUser(response.data);
        setUpdatedUser({ name: response.data.name, password: "" });
      })
      .catch(error => console.error("Error fetching user:", error));
  }, [userNumber]);

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:8080/api/users/${userNumber}`, updatedUser)
      .then(response => {
        alert("Profile updated successfully!");
        setUser(response.data);
        setEditMode(false);
      })
      .catch(error => console.error("Error updating user:", error));
  };

  const handleDeactivate = () => {
    axios.delete(`http://localhost:8080/api/users/${userNumber}/deactivate`)
      .then(() => {
        alert("Account deactivated! Please log in again.");
        onLogout();
        navigate("/login");
      })
      .catch(error => console.error("Error deactivating account:", error));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6">
        <div className="card shadow-lg p-4 text-center">
          <h2 className="mb-3">User Profile</h2>
          {user && (
            <div className="mb-3">
              <div className="d-flex flex-column align-items-center">
                <img 
                  src={profileImage || defaultProfileImg} 
                  alt="User Avatar" 
                  className="rounded-circle mb-3 shadow" 
                  width="120" height="120"
                />
                {editMode && (
                  <input 
                    type="file" className="form-control mb-3 w-75" 
                    onChange={handleImageChange} 
                  />
                )}
              </div>
              {!editMode ? (
                <>
                  <h5 className="fw-bold">{user.name}</h5>
                  <p className="text-muted">{user.email}</p>
                </>
              ) : (
                <form className="text-start">
                  <div className="mb-3">
                    <label className="fw-bold">Name</label>
                    <input 
                      type="text" name="name" className="form-control"
                      value={updatedUser.name} onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold">New Password</label>
                    <input 
                      type="password" name="password" className="form-control"
                      value={updatedUser.password} onChange={handleChange} 
                      required 
                    />
                  </div>
                </form>
              )}
            </div>
          )}
          <div className="mt-3">
            {!editMode ? (
              <>
                {showOptions ? (
                  <>
                    <button className="btn btn-success me-2" onClick={() => setEditMode(true)}>Update</button>
                    <button className="btn btn-danger me-2" onClick={handleDeactivate}>Deactivate</button>
                    <button className="btn btn-secondary" onClick={() => setShowOptions(false)}>Cancel</button>
                  </>
                ) : (
                  <button className="btn btn-warning me-2" onClick={() => setShowOptions(true)}>Edit Profile</button>
                )}
              </>
            ) : (
              <>
                <button className="btn btn-success me-2" onClick={handleUpdate}>Save</button>
                <button className="btn btn-secondary" onClick={() => setEditMode(false)}>Cancel</button>
              </>
            )}
            {!editMode && <button className="btn btn-secondary mt-2" onClick={onLogout}>Logout</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;