import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col bg-body min-h-screen">
      <NavBar />
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
