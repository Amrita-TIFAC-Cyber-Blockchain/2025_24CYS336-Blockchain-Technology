import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import InstitutionDashboard from "./pages/InstitutionDashboard.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import VerifyCertificate from "./pages/VerifyCertificate.jsx";


const App = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  return (
    <BrowserRouter>
      <Navbar onLogout={() => setUser(null)} />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to={`/${user.role.toLowerCase()}`} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/institution"
          element={
            <ProtectedRoute allowedRoles={["Institution"]}>
              <InstitutionDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["Student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/verify/:token" element={<VerifyCertificate />} />
        <Route path="*" element={<h2>404 Page Not Found</h2>} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
