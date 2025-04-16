import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ setAdmin }) => {
  const [isLogin, setIsLogin] = useState(true);  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_URL = "http://localhost:5000";  

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("adminToken", data.token);
        setAdmin(true); 
        navigate("/admin-dashboard");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong, please try again.");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/admin/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLogin(true);  
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong, please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">{isLogin ? "Admin Login" : "Admin Register"}</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit}>
        {!isLogin && (
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <div className="text-center mt-3">
        <button className="btn btn-link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Register here" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
