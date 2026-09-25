import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    full_name: "",
    father_name: "",
    date_of_birth: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    class_name: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.username ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.full_name ||
      !formData.father_name ||
      !formData.date_of_birth ||
      !formData.gender ||
      !formData.phone ||
      !formData.email ||
      !formData.address ||
      !formData.class_name
    ) {
      alert("Please fill all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/gallery/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
            full_name: formData.full_name,
            father_name: formData.father_name,
            date_of_birth: formData.date_of_birth,
            gender: formData.gender,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            class_name: formData.class_name,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (error) {
      console.log("Registration Error:", error);
      alert("Server se connection nahi ho raha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">

        <div className="register-header">
          <div className="register-icon">🎓</div>
          <h1>Student Registration</h1>
          <p>Create your student account</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="full_name"
                placeholder="Enter full name"
                value={formData.full_name}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Father's Name</label>
              <input
                type="text"
                name="father_name"
                placeholder="Enter father's name"
                value={formData.father_name}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Class / Course</label>
              <input
                type="text"
                name="class_name"
                placeholder="Enter class or course"
                value={formData.class_name}
                onChange={handleChange}
              />
            </div>

            <div className="input-group full-width">
              <label>Address</label>
              <textarea
                name="address"
                placeholder="Enter full address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

          </div>

          <button
            type="submit"
            className="register-btn"
            disabled={loading}
          >
            {loading ? "Registering..." : "🎓 Register"}
          </button>

        </form>

        <div className="login-link">
          Already have an account?
          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>

      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .register-page {
          min-height: 100vh;
          padding: 40px 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #eaf4ff, #f8fbff, #dceeff);
          font-family: Arial, sans-serif;
        }

        .register-container {
          width: 100%;
          max-width: 900px;
          background: white;
          padding: 40px;
          border-radius: 22px;
          box-shadow: 0 20px 60px rgba(0, 70, 150, 0.18);
        }

        .register-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .register-icon {
          font-size: 55px;
          margin-bottom: 10px;
        }

        .register-header h1 {
          color: #075dcc;
          margin: 0;
          font-size: 30px;
        }

        .register-header p {
          color: #777;
          margin-top: 8px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
        }

        .input-group label {
          font-weight: 600;
          margin-bottom: 7px;
          color: #333;
        }

        .input-group input,
        .input-group select,
        .input-group textarea {
          width: 100%;
          padding: 13px;
          border: 2px solid #e4e9f0;
          border-radius: 10px;
          outline: none;
          font-size: 15px;
          background: #fafcff;
        }

        .input-group input:focus,
        .input-group select:focus,
        .input-group textarea:focus {
          border-color: #087cf0;
          box-shadow: 0 0 0 3px rgba(8, 124, 240, 0.1);
        }

        .full-width {
          grid-column: 1 / -1;
        }

        .register-btn {
          width: 100%;
          margin-top: 25px;
          padding: 14px;
          border: none;
          border-radius: 11px;
          background: linear-gradient(90deg, #006ee6, #00a2ff);
          color: white;
          font-size: 17px;
          font-weight: bold;
          cursor: pointer;
        }

        .register-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .login-link {
          text-align: center;
          margin-top: 22px;
          color: #666;
        }

        .login-link button {
          border: none;
          background: none;
          color: #087cf0;
          font-weight: bold;
          cursor: pointer;
          margin-left: 5px;
        }

        @media (max-width: 700px) {
          .register-container {
            padding: 25px 20px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .full-width {
            grid-column: auto;
          }

          .register-header h1 {
            font-size: 25px;
          }
        }
      `}</style>
    </div>
  );
}

export default Register;