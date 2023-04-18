import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import { getStocks } from "../helpers/api_helper";

const Dashboard = () => {
  useEffect(() => {
    (async () => {
      const stocks = await getStocks();
      localStorage.setItem(
        "stocks",
        stocks ? JSON.stringify(stocks.data) : null
      );
    })();
  }, []);

  return (
    <>
      <div className="overflow-y-hidden">
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
