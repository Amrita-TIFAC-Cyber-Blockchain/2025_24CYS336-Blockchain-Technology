import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles/auth.css";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login form submitted", formData);

    try {
      const res = await API.post("/auth/login", formData);
      const { token, user } = res.data;

      // store auth details
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("wallet", res.data.user.wallet);


      // update app-level state
      onLogin(user);

      // redirect based on role
      const role = user.role.toLowerCase();
      navigate(`/${role}`);
    } catch (err) {
      console.error("Login failed:", err);
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        {message && <p style={{ color: "red" }}>{message}</p>}
      </form>
    </div>
  );
};

export default Login;
