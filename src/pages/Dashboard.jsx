import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <>
      <div>
        <Topbar />
        <div className="flex overflow-hidden bg-white pt-16">
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
