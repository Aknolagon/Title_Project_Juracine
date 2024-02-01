import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBarWelcome.scss";

function NavBarWelcome() {
  return (
    <nav className="navbarwelcome">
      <Link to="/login">Login</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}

export default NavBarWelcome;
