import React, { useState, useEffect } from "react";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import { getStocks, getMyInfo } from "../helpers/api_helper";
import { getCurrentUser } from "../helpers/localStorage_helper";

const Dashboard = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        navigate("/");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      console.log(getCurrentUser());
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
      setRole(userInfo.data.role);
    })();
  });

  return (
    <>
      <div className="overflow-y-hidden">
        <Topbar />
        <div className="flex overflow-hidden bg-custom-yellow pt-16">
          <Sidebar role={role} />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
