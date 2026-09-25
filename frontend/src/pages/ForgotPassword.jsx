import React, { useState } from "react";

function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    if (!username || !newPassword) {
      setMessage("Username aur new password enter karo.");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/gallery/reset-password/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            new_password: newPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Password successfully reset ho gaya.");
        setUsername("");
        setNewPassword("");
      } else {
        setMessage(data.error || "Password reset nahi hua.");
      }
    } catch (error) {
      setMessage("Server se connection nahi ho raha.");
    }
  };

  return (
    <div className="forgot-container">
      <h2>🔐 Forgot Password</h2>

      <form onSubmit={handleReset}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button type="submit">
          Reset Password
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;