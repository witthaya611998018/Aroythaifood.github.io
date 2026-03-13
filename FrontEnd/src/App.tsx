import React from "react";
import AppLayout from "./layout/AppLayout";
import Login from "./components/login/Login";
import AdminLayout from "./layout/AdminLayout";
import { Routes, Route } from "react-router-dom"; // ต้องเป็น react-router-dom

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/dashboard" element={<AdminLayout />} />
    </Routes>
  );
};

export default App;
