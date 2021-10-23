import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/UserSlice";
import MenuListComposition from "../DropdownMenu/DropdownMenu";

function Navbar(): ReactElement {
  const user = useSelector(selectUser);

  return (
    <header className="navbar">
      <Link to="/" className="navbar-link">
        <div className="navbar-logo">
          <img
            src="assets/images/logo.svg"
            alt="logo"
            height="50px"
            width="60px"
          />
          <span className="navbar-title">LangCity</span>
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
