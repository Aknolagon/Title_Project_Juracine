import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import App from "./App";
import About from "./pages/About";
import ErrorPage from "./pages/ErrorPage";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Series from "./pages/Series";
import Welcome from "./pages/Welcome";
import DashboardAdmin from "./pages/DashboardAdmin";
// import { AuthContextProvider } from "./contexts/AuthContext";

const isAuthentificated = () => {
  const userToken = localStorage.getItem("userToken");
  return !!userToken;
};

const isAdmin = () => {
  return true;
};

const AdminRoute = () => {
  return isAuthentificated() && isAdmin();
};

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "/home",
        element: isAuthentificated() ? <Home /> : <Navigate to="/" />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/movies",
        element: isAuthentificated() ? <Movies /> : <Navigate to="/" />,
      },
      {
        path: "/series",
        element: isAuthentificated() ? <Series /> : <Navigate to="/" />,
      },
      {
        path: "/favorites",
        element: isAuthentificated() ? <Favorites /> : <Navigate to="/" />,
      },
      {
        path: "/profile/:id",
        element: isAuthentificated() ? <Profile /> : <Navigate to="/" />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/dashboard",
        element: AdminRoute() ? <DashboardAdmin /> : <Navigate to="/" />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
