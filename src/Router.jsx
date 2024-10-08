import { createBrowserRouter, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import CreateRole from "./pages/CreateRole";
import CreateBoostPerPage from "./pages/CreateBoostPerPage";
import LoginForm from "./pages/Login";
import MinimalLayout from "./layouts/MainLayout"; // Assuming these paths
import MainLayout from "./layouts/MainLayout"; // Assuming these paths

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/",
    element: <MainLayout />, // MainLayout will handle nested routes
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "role-create",
        element: <CreateRole />,
      },
      {
        path: "role-create/:guid",
        element: <CreateRole />,
      },
      // Different
      {
        path: "boost-per-page",
        element: <CreateBoostPerPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />, // Redirect to home on unknown routes
  },
]);
