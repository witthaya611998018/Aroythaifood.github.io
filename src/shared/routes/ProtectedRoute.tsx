import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAppSelector } from "@/app/hooks";

const ProtectedRoute = () => {
  const location = useLocation();
  const { token, user, loading } = useAppSelector((state) => state.auth);

  if (token && !user) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-gray-600">
        {loading ? "Loading session..." : "Preparing your session..."}
      </div>
    );
  }

  const isAuthenticated = Boolean(token && user);
  const isAdmin = user?.role === "admin";

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
