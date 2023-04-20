import React from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import ContentTemplate from "./components/ContentTemplate";
import { Market, Portfolio, Orders, Transactions, Signup } from "./pages";
import { BrowserRouter } from "react-router-dom";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/market",
        element: <Market />,
      },
      {
        path: "/dashboard/portfolio",
        element: <Portfolio />,
      },
      {
        path: "/dashboard/orders",
        element: <Orders />,
      },
      {
        path: "/dashboard/Transactions",
        element: <Transactions />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
