import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../stratton-oakmont-logo.svg";
import PersonIcon from "@mui/icons-material/Person";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { getCurrentUser } from "../helpers/localStorage_helper";

const Topbar = () => {
  return (
    <nav className="bg-custom-cyan fixed top-0 z-20 w-full border-b-[1px] border-red-700 shadow-xl">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              id="toggleSidebarMobile"
              aria-expanded="true"
              aria-controls="sidebar"
              className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
            >
              <svg
                id="toggleSidebarMobileHamburger"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                id="toggleSidebarMobileClose"
                className="w-6 h-6 hidden"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <a href="/" className="font-bold flex items-center lg:ml-2.5">
              <img
                src={logo}
                className="h-10 mr-2 bg-custom-red rounded-xl p-[1px] drop-shadow-lg"
                alt="Stratton Oakmont Logo"
              />
              <span className="text-xl self-center whitespace-nowrap text-custom-red font-bold drop-shadow-lg">
                Stratton Oakmont
              </span>
            </a>
          </div>
          <div className="flex items-center">
            <div className="hidden lg:flex items-center">
              <div className="-mb-1">
                <a
                  className="github-button"
                  href="/login"
                  data-color-scheme="no-preference: dark; light: light; dark: light;"
                  data-icon="octicon-star"
                  data-size="large"
                  data-show-count="true"
                  aria-label="Star themesberg/windster-tailwind-css-dashboard on GitHub"
                >
                  Login
                </a>
              </div>
            </div>
            <a
              href="/signup"
              className="hidden sm:inline-flex ml-5 text-white bg-custom-red hover:bg-red-700 text-lg focus:ring-4 focus:ring-cyan-200 font-medium rounded-xl px-5 py-2.5 text-center items-center mr-3"
            >
              <HowToRegIcon className="mr-2" />
              Register
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();

    if (currentUser) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const TextComponent = () => {
    return (
      <div className="h-1/2 w-5/6 flex flex-col gap-16">
        <span className="text-slate-800 text-4xl font-bold">
          Buy, trade, and hold 11,500+ stocks on Stratton Oakmont
        </span>

        <div className="h-2/3 w-2/3 text-center ">
          <div className="w-full flex">
            <a
              href="/signup"
              className="text-white bg-custom-red hover:bg-red-700 w-full p-6 border-0 rounded-xl text-xl"
            >
              <PersonIcon className="h-10" />
              <span className="ml-4 text-white ">Sign up with Email</span>
            </a>
          </div>

          <div className="flex w-full place-items-center my-4">
            <div className="h-[1px] grow bg-custom-cyan"></div>
            <span className="text-gray-700 shrink-1 px-2 text-xs">
              or check source code
            </span>
            <div className="h-[1px] grow bg-custom-cyan"></div>
          </div>

          <div className="flex w-full place-items-center my-4 gap-4 ">
            <a
              href="https://github.com/raeje/stock_trading_app"
              className="bg-gray-600 hover:bg-gray-700 text-white grow p-3 rounded-xl flex place-items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 6a3 3 0 013-3h13.5a3 3 0 013 3v12a3 3 0 01-3 3H5.25a3 3 0 01-3-3V6zm3.97.97a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06zm4.28 4.28a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                  clipRule="evenodd"
                />
              </svg>

              <span className="text-white shrink-1 px-2 text-sm">backend</span>
            </a>

            <a
              href="https://github.com/raeje/fe-stock-trading-app"
              className="bg-gray-600 hover:bg-gray-700 text-white grow p-3 rounded-xl flex place-items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm14.25 6a.75.75 0 01-.22.53l-2.25 2.25a.75.75 0 11-1.06-1.06L15.44 12l-1.72-1.72a.75.75 0 111.06-1.06l2.25 2.25c.141.14.22.331.22.53zm-10.28-.53a.75.75 0 000 1.06l2.25 2.25a.75.75 0 101.06-1.06L8.56 12l1.72-1.72a.75.75 0 10-1.06-1.06l-2.25 2.25z"
                  clipRule="evenodd"
                />
              </svg>

              <span className="text-white shrink-1 px-2 text-sm">frontend</span>
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-screen h-screen bg-custom-yellow flex place-items-center z-0">
      <Topbar />
      <div className="fixed -bottom-12 -right-12 z-10 h-screen flex flex-col-reverse">
        <img
          src={logo}
          className="h-1/2 mr-2 rounded-xl p-[1px] drop-shadow-lg color-red-500"
          alt="Stratton Oakmont Logo"
        />
      </div>
      <div className="grid grid-cols-2 grid-rows-1 place-items-center m-auto content-center w-4/5 h-3/4 shadow-lg rounded-3xl z-20 backdrop-blur-sm">
        <TextComponent />
        <div className=" h-full w-full grid grid-cols-12 grid-rows-12 gap-4">
          <img
            src="./buyorder.png"
            alt="buyorder.png"
            className="shadow-xl col-span-4 row-span-4 col-start-1 row-start-5 object-contain border-2 border-gray-500 rounded-xl"
          />
          <img
            src="./traderpanel.png"
            alt="traderpanel.png"
            className="shadow-xl col-span-8 row-span-4 col-start-3 row-start-2 object-contain border-2 border-gray-500 rounded-xl"
          />
          <img
            src="./market.png"
            alt="market.png"
            className="shadow-xl col-span-5 row-span-5 col-start-5 row-start-5 object-contain border-2 border-gray-500 rounded-xl"
          />
          <img
            src="./adminpanel.png"
            alt="adminpanel.png"
            className="shadow-xl col-span-3 row-span-3 col-start-6 row-start-6 object-contain border-2 border-gray-500 rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
