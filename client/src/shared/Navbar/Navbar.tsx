import { Button } from "@material-ui/core";
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { Business } from "@mui/icons-material";

function Navbar(): ReactElement {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-link">
        <div className="navbar-logo">
          <Business />
          <span className="navbar-title">Langcity</span>
        </div>
      </Link>
    </header>
  );
}

export default Navbar;
