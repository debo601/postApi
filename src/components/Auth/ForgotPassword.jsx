
import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://amuma.nodejsdapldevelopments.com/api/auth/ForgotPasswordRequest",
        { email }
      );
      setMessage("Password reset link sent to your email.");
    } catch (err) {
      setMessage("Error sending reset link.");
      console.error(err.response?.data);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
