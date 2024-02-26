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
import { UserProvider } from "./contexts/UserContext";

const isAuthentificated = () => {
  const userToken = sessionStorage.getItem("userToken");
  return !!userToken;
};

const isAdministrator = () => {
  if (isAuthentificated() === true) {
    const decodedToken = JSON.parse(
      atob(sessionStorage.getItem("userToken").split(".")[1])
    );
    return decodedToken.isAdmin;
  }
  return false;
};

const router = createBrowserRouter([
  {
    element: (
      <UserProvider>
        <App />,
      </UserProvider>
    ),
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
        element: isAdministrator() ? <DashboardAdmin /> : <Navigate to="/" />,
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
