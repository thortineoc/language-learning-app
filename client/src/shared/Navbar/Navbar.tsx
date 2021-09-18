import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { Business } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/UserSlice";
import MenuListComposition from "../DropdownMenu/DropdownMenu";

function Navbar(): ReactElement {
  const user = useSelector(selectUser);

  return (
    <header className="navbar">
      <Link to="/" className="navbar-link">
        <div className="navbar-logo">
          <Business />
          <span className="navbar-title">Langcity</span>
        </div>
      </Link>
      {user && (
        <div className="navbar-dropdown">
          <MenuListComposition />
        </div>
      )}
    </header>
  );
}

export default Navbar;
