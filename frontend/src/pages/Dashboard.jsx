import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("isAdmin");
  navigate("/login");
};

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2>🏫 School MS</h2>

        <button onClick={() => navigate("/dashboard")}>
          🏠 Dashboard
        </button>

        {isAdmin && (
  <>
    <button onClick={() => navigate("/students")}>
      👨‍🎓 Students
    </button>

    <button onClick={() => navigate("/teachers")}>
      👩‍🏫 Teachers
    </button>

    <button onClick={() => navigate("/classes")}>
      📚 Classes
    </button>

    <button onClick={() => navigate("/fees")}>
      💰 Fees
    </button>

    <button onClick={() => navigate("/gallery")}>
      🖼️ Gallery
    </button>
  </>
)}
        <button className="logout" onClick={handleLogout}>
          🚪 Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">

        <div className="topbar">
          <div>
            <h1>School Management Dashboard</h1>
            <p>Welcome to your school management system</p>
          </div>

          <button className="logout-top" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="dashboard-cards">

          <div
            className="dashboard-card"
            onClick={() => navigate("/students")}
          >
            <span>👨‍🎓</span>
            <h3>Students</h3>
            <p>Manage students</p>
          </div>

          <div
            className="dashboard-card"
            onClick={() => navigate("/teachers")}
          >
            <span>👩‍🏫</span>
            <h3>Teachers</h3>
            <p>Manage teachers</p>
          </div>

          <div
            className="dashboard-card"
            onClick={() => navigate("/classes")}
          >
            <span>📚</span>
            <h3>Classes</h3>
            <p>Manage classes</p>
          </div>

          <div
            className="dashboard-card"
            onClick={() => navigate("/fees")}
          >
            <span>💰</span>
            <h3>Fees</h3>
            <p>Manage fees</p>
          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;