import React, { ReactElement } from "react";
import "./CoursesDisplay.scss";

interface Props {}

function CoursesDisplay(): ReactElement {
  const onChange = () => {
    console.log("changes");
  };

  return (
    <div className="courses-display">
      <div className="courses-header">
        <h1 className="courses-display-title">Language courses</h1>
      </div>
    </div>
  );
}

export default CoursesDisplay;
