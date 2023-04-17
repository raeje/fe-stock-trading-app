import React from "react";
import { NavLink } from "react-router-dom";
import {
  Storefront,
  AccountBalanceWallet,
  Receipt,
  PointOfSale,
} from "@mui/icons-material";

const Item = ({ path, name, icon }) => {
  const LINK_ACTIVE_CLASS_NAME =
    "font-bold rounded-lg flex items-center p-2 bg-custom-highlight text-white";
  const LINK_INACTIVE_CLASS_NAME =
    "text-white font-normal rounded-lg flex items-center p-2 hover:bg-yellow-500 hover:text-black";
  return (
    <NavLink
      to={{
        pathname: path,
      }}
      className={({ isActive }) =>
        isActive ? LINK_ACTIVE_CLASS_NAME : LINK_INACTIVE_CLASS_NAME
      }
    >
      {icon}
      <span className="ml-3">{name}</span>
    </NavLink>
  );
};

const Sidebar = () => {
  return (
    <>
      <aside
        id="sidebar"
        className="fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
        aria-label="Sidebar"
      >
        <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
          <div className="bg-custom-light flex-1 flex flex-col pt-5 pb-4 box-border overflow-y-auto">
            <div className="flex-1 px-3 space-y-1">
              <Item
                path="/dashboard/market"
                name="Market"
                icon={<Storefront />}
              />
              <Item
                path="/dashboard/portfolio"
                name="Portfolio"
                icon={<AccountBalanceWallet />}
              />
              <Item
                path="/dashboard/orders"
                name="Orders"
                icon={<PointOfSale />}
              />
              <Item
                path="/dashboard/transactions"
                name="Transactions"
                icon={<Receipt />}
              />
            </div>
          </div>
        </div>
      </aside>

      <div
        className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
        id="sidebarBackdrop"
      ></div>
    </>
  );
};

export default Sidebar;
