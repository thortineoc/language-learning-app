import axios from "axios";
import { Console } from "console";
import React, { ReactElement, useEffect, useState } from "react";
import CourseTile from "./components/CourseTile/CourseTile";
import "./CoursesDisplay.scss";

function CoursesDisplay(): ReactElement {
  const [courses, setCourses] = useState([]);
  const url = "https://localhost:5001/api/courses";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setCourses(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="CoursesDisplay">
      <div className="CoursesDisplay-header">
        <h1 className="CoursesDisplay-title">Language courses</h1>
      </div>
      <div className="CoursesDisplay-grid">
        {courses.map((course, i) => (
          <CourseTile data={course} key={i} isMine={false} />
        ))}
      </div>
    </div>
  );
}

export default CoursesDisplay;
