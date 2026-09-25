import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // Login nahi hai
  if (isLoggedIn !== "true") {
    return <Navigate to="/login" replace />;
  }

  // Admin-only page hai aur user admin nahi hai
  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;