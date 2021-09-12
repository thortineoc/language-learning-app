import { Button } from "@material-ui/core";
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

interface Props {}

function Navbar({}: Props): ReactElement {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <span className="navbar-title">App</span>
        </Link>
      </div>
      <div className="navbar-group">
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>
    </header>
  );
}

export default Navbar;
