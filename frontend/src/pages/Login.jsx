import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.username || !formData.password) {
    alert("Please enter username and password");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch(
  `https://school-mamagement-system-1.onrender.com/api/gallery/login/`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: formData.username,
      password: formData.password,
    }),
  }
);

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("isLoggedIn", "true");
localStorage.setItem("isAdmin", data.is_staff ? "true" : "false");

navigate("/dashboard");
    } else {
      alert(data.error || "Invalid username or password");
    }
  } catch (error) {
    console.log("Login Error:", error);
    alert("Server se connection nahi ho raha.");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="login-page">

      {/* Animated background circles */}
      <div className="circle circle-one"></div>
      <div className="circle circle-two"></div>
      <div className="circle circle-three"></div>

      <div className="login-container">

        {/* Left Side */}
        <div className="login-info">
          <div className="school-icon">🏫</div>

          <h1>School Management</h1>

          <p>
            Welcome back! Login to manage your school,
            students, teachers and more.
          </p>

          <div className="features">
            <div>✓ Student Management</div>
            <div>✓ Teacher Management</div>
            <div>✓ School Gallery</div>
            <div>✓ Easy & Secure</div>
          </div>
        </div>

        {/* Login Card */}
        <div className="login-card">

          <div className="lock-icon">🔐</div>

          <h2>Welcome Back!</h2>

          <p className="login-subtitle">
            Login to your account
          </p>

          <form onSubmit={handleSubmit}>

            {/* Username */}
            <div className="input-group">
              <label>Username</label>

              <div className="input-box">
                <span>👤</span>

                <input
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password */}
            <div className="input-group">
              <label>Password</label>

              <div className="input-box">
                <span>🔑</span>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="show-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Remember */}
            <div className="login-options">
              <label>
                <input type="checkbox" />
                Remember me
              </label>

             <button
  type="button"
  className="forgot-password"
  onClick={() => navigate("/forgot-password")}
>
  Forgot Password?
</button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Logging in...
                </>
              ) : (
                <>
                  🔐 Login
                </>
              )}
            </button>

          </form>

          <div className="secure-text">
            🔒 Your information is secure
          </div>
          <div className="register-link">
  Don't have an account?
  <button
    type="button"
    onClick={() => navigate("/register")}
  >
    Create Account
  </button>
</div>

        </div>
      </div>

     {/* CSS */}
      <style>{`

        * {
          box-sizing: border-box;
        }

        .login-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 20px;
          position: relative;
          overflow: hidden;
          background: linear-gradient(
            135deg,
            #eaf4ff,
            #f8fbff,
            #dceeff
          );
          font-family: Arial, sans-serif;
        }

        /* Background animation */

        .circle {
          position: absolute;
          border-radius: 50%;
          filter: blur(2px);
          animation: float 6s ease-in-out infinite;
          z-index: 0;
        }

        .circle-one {
          width: 250px;
          height: 250px;
          background: rgba(13, 110, 253, 0.18);
          top: -80px;
          left: -80px;
        }

        .circle-two {
          width: 200px;
          height: 200px;
          background: rgba(0, 180, 255, 0.15);
          right: -60px;
          bottom: -50px;
          animation-delay: 1.5s;
        }

        .circle-three {
          width: 120px;
          height: 120px;
          background: rgba(13, 110, 253, 0.12);
          right: 20%;
          top: 10%;
          animation-delay: 3s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-25px);
          }
        }

        /* Main container */

        .login-container {
          width: 100%;
          max-width: 950px;
          min-height: 560px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(15px);
          border-radius: 25px;
          overflow: hidden;
          box-shadow: 0 25px 70px rgba(0, 70, 150, 0.18);
          position: relative;
          z-index: 1;
          animation: containerShow 0.8s ease;
        }

        @keyframes containerShow {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.96);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Left section */

        .login-info {
          padding: 60px 45px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: white;
          background: linear-gradient(
            135deg,
            #0062d9,
            #008cff,
            #0054bd
          );
          position: relative;
          overflow: hidden;
        }

        .login-info::before {
          content: "";
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.15);
          right: -120px;
          top: -100px;
          animation: rotateCircle 10s linear infinite;
        }

        .login-info::after {
          content: "";
          position: absolute;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.1);
          left: -100px;
          bottom: -80px;
        }

        @keyframes rotateCircle {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        .school-icon {
          font-size: 65px;
          margin-bottom: 20px;
          animation: schoolBounce 2s infinite;
        }

        @keyframes schoolBounce {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-8px);
          }
        }

        .login-info h1 {
          font-size: 35px;
          margin-bottom: 15px;
          font-weight: 700;
        }

        .login-info p {
          font-size: 17px;
          line-height: 1.7;
          opacity: 0.9;
          max-width: 400px;
        }

        .features {
          margin-top: 25px;
          line-height: 2.2;
          font-size: 15px;
        }

        /* Login card */

        .login-card {
          padding: 55px 50px;
          background: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          animation: cardShow 1s ease;
        }

        @keyframes cardShow {
          from {
            opacity: 0;
            transform: translateX(30px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .lock-icon {
          font-size: 48px;
          text-align: center;
          margin-bottom: 10px;
          animation: lockPulse 2s infinite;
        }

        @keyframes lockPulse {
          0%, 100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.12);
          }
        }

        .login-card h2 {
          text-align: center;
          color: #075dcc;
          font-size: 30px;
          margin: 5px 0;
        }

        .login-subtitle {
          text-align: center;
          color: #777;
          margin-bottom: 30px;
        }

        /* Input */

        .input-group {
          margin-bottom: 20px;
        }

        .input-group label {
          display: block;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }

        .input-box {
          display: flex;
          align-items: center;
          border: 2px solid #e4e9f0;
          border-radius: 12px;
          padding: 0 13px;
          transition: all 0.3s ease;
          background: #fafcff;
        }

        .input-box:focus-within {
          border-color: #087cf0;
          box-shadow: 0 0 0 4px rgba(8,124,240,0.10);
          transform: translateY(-2px);
        }

        .input-box span {
          font-size: 19px;
          margin-right: 10px;
        }

        .input-box input {
          width: 100%;
          border: none;
          outline: none;
          padding: 14px 5px;
          font-size: 15px;
          background: transparent;
        }

        .show-btn {
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 17px;
        }

        /* Options */

        .login-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 5px 0 25px;
          font-size: 13px;
        }

        .login-options label {
          color: #555;
        }

        .login-options input {
          margin-right: 5px;
        }

        .login-options a {
          color: #087cf0;
          text-decoration: none;
          font-weight: 600;
        }

        /* Button */

        .login-btn {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 12px;
          color: white;
          background: linear-gradient(
            90deg,
            #006ee6,
            #00a2ff,
            #006ee6
          );
          background-size: 200% auto;
          font-size: 17px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px rgba(0,110,230,0.25);
        }

        .login-btn:hover {
          background-position: right center;
          transform: translateY(-3px);
          box-shadow: 0 12px 25px rgba(0,110,230,0.35);
        }

        .login-btn:active {
          transform: scale(0.97);
        }

        .login-btn:disabled {
          opacity: 0.8;
          cursor: not-allowed;
        }

        .spinner {
          display: inline-block;
          width: 18px;
          height: 18px;
          border: 3px solid rgba(255,255,255,0.4);
          border-top-color: white;
          border-radius: 50%;
          margin-right: 8px;
          vertical-align: middle;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .secure-text {
          text-align: center;
          color: #888;
          font-size: 12px;
          margin-top: 20px;
        }

        /* Mobile */

        @media (max-width: 768px) {

          .login-container {
            grid-template-columns: 1fr;
            max-width: 500px;
          }

          .login-info {
            padding: 35px 30px;
            text-align: center;
          }

          .login-info h1 {
            font-size: 28px;
          }

          .login-info p {
            margin: auto;
          }

          .features {
            display: none;
          }

          .login-card {
            padding: 40px 30px;
          }
        }

        .register-link {
  text-align: center;
  margin-top: 15px;
  color: #666;
  font-size: 14px;
}

.register-link button {
  border: none;
  background: none;
  color: #087cf0;
  font-weight: bold;
  cursor: pointer;
  margin-left: 5px;
}

.register-link button:hover {
  text-decoration: underline;
}

      `}</style>
    </div>
  );
}

export default Login;