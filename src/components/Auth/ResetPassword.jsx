import React, { useState } from "react";
import axios from "axios";

const ResetPassword = ({ match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const resetPasswordToken = match.params.token;
  console.log(hello, "resetPasswordToken") // Assuming the token comes from URL

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "https://amuma.nodejsdapldevelopments.com/api/auth/reset-password",
        { token: resetPasswordToken, password }
      );
      setMessage("Password reset successful. You can now login.");
    } catch (err) {
      setMessage("Error resetting password.");
      console.error(err.response?.data);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>   
      </form>
    </div>
  );
};

export default ResetPassword;
