import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api"; // Import the centralized axios instance

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/users/login", { email, password });
      console.log("Login response data:", response.data);

      if (response.status === 200) {
        const userData = response.data;
        const userId = userData.userId || userData.id;
        
        if (!userId) {
          setError("User ID not found in login response.");
          return;
        }
        
        localStorage.setItem("userId", userId);
        onLogin(userData);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError(err.response?.data?.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-4">
        <div className="card p-4 shadow-lg">
          <h2 className="text-center mb-3">Login</h2>
          {error && <p className="text-danger text-center">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-3">
            <p>Don't have an account?</p>
            <button onClick={() => navigate("/register")} className="btn btn-outline-primary w-100" disabled={loading}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
