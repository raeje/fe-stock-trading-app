import React from "react";
import Dashboard from "./pages/Dashboard";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import ContentTemplate from "./components/ContentTemplate";
import { Market, Portfolio } from "./pages";
import { BrowserRouter } from "react-router-dom";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
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
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
