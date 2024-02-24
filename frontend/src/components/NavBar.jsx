// import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/LOGO.png";
import "../styles/NavBar.scss";
import { UserContext } from "../contexts/UserContext";

function NavBar() {
  const [showLinks, setShowLinks] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState();

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setUserId(user.id);
      setUserRole(user.role);
    }
  }, [user]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/");
  };

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <nav className={`navbar ${showLinks ? "show-nav" : "hide-nav"} `}>
      <Link className="home-link" to="/home">
        <img className="logo" src={Logo} alt="logo" />
      </Link>
      <div>
        <ul className="navbar_links">
          <li className="navbar_item slideInDown-1">
            <Link className="navbar_link" to="/home">
              Home
            </Link>
          </li>
          <li className="navbar_item slideInDown-2">
            <Link className="navbar_link" to="/movies">
              Movies
            </Link>
          </li>
          <li className="navbar_item slideInDown-3">
            <Link className="navbar_link" to="/series">
              Series
            </Link>
          </li>
          <li className="navbar_item slideInDown-4">
            <Link className="navbar_link" to="/favorites">
              Favorites
            </Link>
          </li>
          <li className="navbar_item slideInDown-4">
            <Link className="navbar_link" to={`/profile/${userId}`}>
              <span className="navbar_link">Welcome, {username}!</span>
            </Link>
          </li>
          {userRole === 2 && (
            <li className="navbar_item slideInDown-4">
              <Link className="navbar_link" to="/dashboard">
                Admin
              </Link>
            </li>
          )}
          <li className="navbar_item slideInDown-4">
            <button
              type="button"
              className="btn-logout"
              onClick={handleLogout}
              aria-hidden
            >
              <span>Log out</span>
            </button>
          </li>
        </ul>
        <button
          className="navbar_burger"
          type="button"
          onClick={handleShowLinks}
          aria-label={showLinks ? "Close Burger" : "Open Burger"}
        >
          <div className="burger-bar" />
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
