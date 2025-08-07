import React from "react";
import AppLayout from "./layout/AppLayout";
import Login from "./components/login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import AdminLayout from "./layout/AdminLayout";
const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route
            element={
              // <ProtectedRoute>
              <AppLayout />
              // </ProtectedRoute>
            }
          ></Route> */}
          <Route path="/" element={<AppLayout />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/dashboard" element={<AdminLayout />} />
          <Route path="/dashboard" element={<AdminLayout />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
