import { Outlet } from "react-router-dom";

import Footer from "@/shared/layouts/public/Footer";
import AppHeader from "@/shared/layouts/public/AppHeader";

export default function AppLayout() {
  return (
    <>
      <AppHeader />
      <Outlet />
      <Footer />
    </>
  );
}
