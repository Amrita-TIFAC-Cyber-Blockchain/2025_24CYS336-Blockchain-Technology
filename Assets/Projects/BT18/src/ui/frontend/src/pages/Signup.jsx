import React, { useState } from "react";
import API from "../api/axios";
import "../styles/auth.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Student",
    wallet: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/signup", formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />
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

        <select name="role" onChange={handleChange} required>
          <option value="Student">Student</option>
          <option value="Institution">Institution</option>
        </select>

        {(formData.role === "Institution" || formData.role === "Student") && (
          <input
            type="text"
            name="wallet"
            placeholder="Ethereum Wallet (0x...)"
            value={formData.wallet}
            onChange={handleChange}
            required
          />
        )}

        <button type="submit">Register</button>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default Signup;
