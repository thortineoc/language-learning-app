import axios from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import CourseTile from "./components/CourseTile";
import "./CoursesDisplay.scss";

function CoursesDisplay(): ReactElement {
  const [courses, setCourses] = useState([]);
  const url = "https://localhost:5001/api/courses";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setCourses(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="CoursesDisplay">
      <div className="CoursesDisplay-header">
        <h1 className="CoursesDisplay-title">Language courses</h1>
      </div>
      <div className="CoursesDisplay-grid">
        {courses.map((course) => (
          <CourseTile data={course} />
        ))}
      </div>
    </div>
  );
}

export default CoursesDisplay;
