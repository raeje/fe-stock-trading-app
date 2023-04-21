import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Storefront,
  AccountBalanceWallet,
  Receipt,
  PointOfSale,
} from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ContactsIcon from "@mui/icons-material/Contacts";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { removeCurrentUser } from "../helpers/localStorage_helper";
import { getMyInfo } from "../helpers/api_helper";

const Item = ({ path, name, icon }) => {
  const LINK_ACTIVE_CLASS_NAME =
    "font-bold rounded-lg flex items-center p-2 bg-custom-red text-white";
  const LINK_INACTIVE_CLASS_NAME =
    "text-white font-normal rounded-lg flex items-center p-2 hover:bg-custom-yellow hover:text-black";
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

const Sidebar = ({ role }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      const userInfo = await getMyInfo();
      setUser(userInfo.data);
    })();
  }, []);

  return (
    <>
      <aside
        id="sidebar"
        className="fixed hidden z-20 h-full top-0 left-0 pt-16 lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
        aria-label="Sidebar"
      >
        <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
          <div className="bg-slate-700 flex-1 flex flex-col pt-5 pb-4 box-border overflow-y-auto">
            <div className="flex-1 px-3 space-y-1 relative">
              <div className="font-bold rounded-lg flex flex-col py-4 pl-6 bg-custom-cyan text-gray-500 my-6">
                <span className="text-xl text-custom-red">{user?.name}</span>
                <span className="text-sm">{role.toUpperCase()}</span>
              </div>
              <div className="w-full">
                <div className="bg-custom-yellow h-[1.5px] w-4/5 my-6 mx-auto"></div>
              </div>
              <Item
                path="/dashboard/market"
                name="Market"
                icon={<Storefront />}
              />
              <div className="w-full">
                <div className="bg-custom-yellow h-[1.5px] w-4/5 my-6 mx-auto"></div>
              </div>
              {role === "admin" ? (
                <>
                  <Item
                    path="/dashboard/create-user"
                    name="Create User"
                    icon={<PersonAddIcon />}
                  />
                  <Item
                    path="/dashboard/all-users"
                    name="All Users"
                    icon={<ContactsIcon />}
                  />
                  <Item
                    path="/dashboard/approved-users"
                    name="Approved Users"
                    icon={<PeopleAltIcon />}
                  />
                  <Item
                    path="/dashboard/pending-users"
                    name="Pending Users"
                    icon={<PeopleOutlineIcon />}
                  />
                  <Item
                    path="/dashboard/all-transactions"
                    name="All Transactions"
                    icon={<Receipt />}
                  />
                </>
              ) : (
                <>
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
                </>
              )}
              <NavLink
                to={{
                  pathname: "/",
                }}
                className="text-gray-400 font-normal rounded-lg flex items-center p-2 hover:text-custom-red w-7/8 absolute bottom-0"
                onClick={() => removeCurrentUser()}
              >
                <ExitToAppIcon />
                <span className="ml-3">Logout</span>
              </NavLink>
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
