// src/routes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Later we’ll add: Login, Register, Admin, Institution, Student */}
    </Routes>
  );
}

export default AppRoutes;