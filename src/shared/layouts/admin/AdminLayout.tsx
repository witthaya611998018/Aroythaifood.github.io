import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import AdminHeader from "@/shared/layouts/admin/AdminHeader";
import AdminSidebar from "@/shared/layouts/admin/AdminSidebar";

const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const handleToggleSidebar = () => {
    if (window.matchMedia("(max-width: 1023px)").matches) {
      setMobileSidebarOpen((prev) => !prev);
      return;
    }

    setSidebarCollapsed((prev) => !prev);
  };

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMobileSidebarOpen(false);
      }
    };

    desktopMediaQuery.addEventListener("change", handleDesktopChange);
    if (desktopMediaQuery.matches) {
      setMobileSidebarOpen(false);
    }

    return () => {
      desktopMediaQuery.removeEventListener("change", handleDesktopChange);
    };
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (mobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileSidebarOpen]);

  useEffect(() => {
    const updateHeaderHeight = () => {
      setHeaderHeight(headerRef.current?.offsetHeight ?? 0);
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);

    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="hidden shrink-0 lg:block">
        <AdminSidebar collapsed={sidebarCollapsed} />
      </div>
      <div
        className={`fixed left-0 bottom-0 z-40 transition-transform duration-300 ease-in-out lg:hidden ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ top: headerHeight }}
      >
        <AdminSidebar onNavigate={() => setMobileSidebarOpen(false)} />
      </div>
      {mobileSidebarOpen ? (
        <button
          type="button"
          aria-label="Close Sidebar"
          className="fixed left-0 right-0 bottom-0 z-30 bg-black/40 lg:hidden"
          style={{ top: headerHeight }}
          onClick={() => setMobileSidebarOpen(false)}
        />
      ) : null}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col transition-all duration-300 ease-in-out">
        <div ref={headerRef}>
          <AdminHeader onToggleSidebar={handleToggleSidebar} />
        </div>
        <div className="mx-auto flex-1 w-full max-w-screen-2xl p-4 md:p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
