import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import Home from "../pages/Dashboard/Home";
import { useState } from "react";
const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar collapsed={sidebarCollapsed} />
      <div className="flex-1 flex flex-col">
        <AdminHeader
          onToggleSidebar={() => setSidebarCollapsed((prev) => !prev)}
        />
        <main className="flex-1 p-8">
          {/* <div className="w-full h-[500px] rounded-xl border border-dashed border-gray-200 bg-[repeating-linear-gradient(135deg,#f3f4f6_0px,#f3f4f6_8px,#fff_8px,#fff_16px)]" /> */}
          <Home />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
