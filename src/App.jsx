import React from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import {
  Market,
  Portfolio,
  Orders,
  Transactions,
  Signup,
  Login,
} from "./pages";
import {
  CreateUser,
  ViewAllUsers,
  ViewApprovedUsers,
  ViewPendingUsers,
  ViewTransactions,
} from "./pages/admin";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      {
        path: "/dashboard/all-users",
        element: <ViewAllUsers />,
      },
      {
        path: "/dashboard/approved-users",
        element: <ViewApprovedUsers />,
      },
      {
        path: "/dashboard/pending-users",
        element: <ViewPendingUsers />,
      },
      {
        path: "/dashboard/all-transactions",
        element: <ViewTransactions />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />{" "}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
