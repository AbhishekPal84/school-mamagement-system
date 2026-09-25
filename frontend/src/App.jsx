import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Classes from "./pages/Classes";
import Fees from "./pages/Fees";
import Gallery from "./pages/Gallery";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";

import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public Pages */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route path="/register"
         element={<Register />} />

        {/* Protected Pages */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
  path="/students"
  element={
    <ProtectedRoute adminOnly={true}>
      <Students />
    </ProtectedRoute>
  }
/>

        <Route
          path="/teachers"
          element={
            <ProtectedRoute>
              <Teachers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/classes"
          element={
            <ProtectedRoute>
              <Classes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/fees"
          element={
            <ProtectedRoute>
              <Fees />
            </ProtectedRoute>
          }
        />

        <Route path="/gallery"
         element={
          <ProtectedRoute>
            <Gallery />
          </ProtectedRoute>
         
         } />

         <Route path="/forgot-password" element={<ForgotPassword />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;