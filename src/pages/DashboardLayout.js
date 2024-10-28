import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useGlobalContext } from "../features/context";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <div>
      <div className="flex ">
        <div className="w-[16%] h-full border-blue-500">
          <Sidebar />
        </div>
        <div className="w-full">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
