import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import { getStocks, getMyInfo } from "../helpers/api_helper";
import { getCurrentUser } from "../helpers/localStorage_helper";

const Dashboard = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    (async () => {
      const stocks = await getStocks();
      localStorage.setItem(
        "stocks",
        stocks ? JSON.stringify(stocks.data) : null
      );
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const userInfo = await getMyInfo();
      console.log(userInfo.data);
      setRole(userInfo.data.role);
    })();
  });

  return (
    <>
      <div className="overflow-y-hidden">
        <Topbar />
        <div className="flex overflow-hidden bg-white pt-16">
          <Sidebar role={role} />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
