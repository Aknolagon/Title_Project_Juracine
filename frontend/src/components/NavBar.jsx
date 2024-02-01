import { Link } from "react-router-dom";
import "../styles/NavBar.scss";
import React, { useState } from "react";
import Logo from "../assets/LOGO.png";

function NavBar() {
  const [showLinks, setShowLinks] = useState(false);

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
            <Link className="navbar_link" to="/profil">
              Profile
            </Link>
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
