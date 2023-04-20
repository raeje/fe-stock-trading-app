import React from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import ContentTemplate from "./components/ContentTemplate";
import {
  Market,
  Portfolio,
  Orders,
  Transactions,
  Signup,
  Login,
} from "./pages";
import { CreateUser } from "./pages/admin";
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
    path: "/login",
    element: <Login />,
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
        path: "/dashboard/transactions",
        element: <Transactions />,
      },
      {
        path: "/dashboard/create-user",
        element: <CreateUser />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
