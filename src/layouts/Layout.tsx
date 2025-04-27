import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col bg-body min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="p-4">
          {" "}
          <Outlet /> {/* RENDERS CHILD ROUTES */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
