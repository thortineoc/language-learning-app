import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.scss";

function ErrorPage(): ReactElement {
  return (
    <div className="ErrorPage">
      <h1 className="ErrorPage-title">Not found</h1>
      <Link className="ErrorPage-link" to="/">
        Go back to the homepage
      </Link>
    </div>
  );
}

export default ErrorPage;
