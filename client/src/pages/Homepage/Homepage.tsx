import React, { ReactElement } from "react";
import FadeIn from "react-fade-in";
import { Link } from "react-router-dom";
import "./Homepage.scss";

function Homepage(): ReactElement {
  return (
    <div className="Homepage">
      <h1>
        Welcome to <b className="Homepage-langcity">LANGCITY</b>
      </h1>
      <FadeIn transitionDuration={1200}>
        <p className="Homepage-description">
          An app that helps you learning languages while having fun. Level up,
          gain achievements and a lot of knowledge. Enjoy!
        </p>
      </FadeIn>

      <div className="Homepage-btn-group">
        <Link to="/login" className="Homepage-btn-text">
          <div className="Homepage-btn">Login</div>
        </Link>
        <Link to="/register" className="Homepage-btn-text">
          <div className="Homepage-btn"> Register</div>
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
