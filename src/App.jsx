import React from "react";
import styles from "./App.module.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Homepage from "./components/pages/Homepage";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import RootUserLayout from "./components/pages/RootUser/RootUserLayout";
import ErrorPage from "./components/layout/ErrorPage";
import DashboardSummary from "./components/pages/Dashboard/DashboardSummary";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootUserLayout />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <Homepage /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/dashboard", element: <DashboardSummary /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
