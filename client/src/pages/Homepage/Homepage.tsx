import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

interface Props {}

function Homepage({}: Props): ReactElement {
  return (
    <div>
      <p>Hello</p>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
}

export default Homepage;
