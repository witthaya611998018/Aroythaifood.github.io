// import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Thaifood from "../pages/menu/ThaiFood";
export default function AppLayout() {
  return (
    <>
      <Header />
      <div className="bg-[#ffffff] relative min-h-screen flex flex-col">
        <Thaifood />
        <Footer />
      </div>
    </>
  );
}
