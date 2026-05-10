import { Navigate, Route, Routes } from "react-router-dom";

import LoginForm from "@/features/auth/ui/LoginForm";
import AdminLayout from "@/shared/layouts/admin/AdminLayout";
import AppLayout from "@/shared/layouts/public/AppLayout";
import ProtectedRoute from "@/shared/routes/ProtectedRoute";
import ChangePasswordPage from "@/pages/admin/account/ChangePasswordPage";
import ManualsPage from "@/pages/admin/account/ManualsPage";
import ProfilePage from "@/pages/admin/account/ProfilePage";
import HomePage from "@/pages/admin/dashboard/HomePage";
import AdminThaiFoodPage from "@/pages/admin/menu/AdminThaiFoodPage";
import ThaiFoodPage from "@/pages/public/menu/ThaiFoodPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index path="/" element={<ThaiFoodPage />} />
      </Route>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/Login" element={<Navigate to="/login" replace />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index path="/dashboard" element={<HomePage />} />
          <Route path="/menus" element={<AdminThaiFoodPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/manuals" element={<ManualsPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
