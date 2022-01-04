import axios from "axios";
import { Console } from "console";
import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/UserSlice";
import CourseTile from "./components/CourseTile/CourseTile";
import "./CoursesDisplay.scss";
import TextFieldWrapper from "../../shared/TextFieldWrapper/TextFieldWrapper";

function CoursesDisplay(): ReactElement {
  const [courses, setCourses] = useState([]);
  const url = "https://localhost:5001/api/courses";
  const user = useSelector(selectUser);

  useEffect(() => {
    axios
      .get(url, { headers: { Authorization: `Bearer ${user.token}` } })
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="CoursesDisplay">
      <div className="CoursesDisplay-header">
        <h1 className="CoursesDisplay-title">Language courses</h1>
        <input
          type="text"
          placeholder="Search..."
          className="SearchBar"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <div className="CoursesDisplay-grid">
        {courses
          .filter((val: any) => {
            if (searchTerm === "") {
              return val;
            } else if (
              val.title.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((course, i) => (
            <CourseTile data={course} key={i} isMine={false} />
          ))}
      </div>
    </div>
  );
}

export default CoursesDisplay;
