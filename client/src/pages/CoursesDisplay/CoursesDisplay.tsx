import axios from "axios";
import { Console } from "console";
import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/UserSlice";
import CourseTile from "./components/CourseTile/CourseTile";
import "./CoursesDisplay.scss";
import TextFieldWrapper from "../../shared/TextFieldWrapper/TextFieldWrapper";
import { Autocomplete, TextField } from "@mui/material";
import { Course } from "../../models/CourseModels";

function CoursesDisplay(): ReactElement {
  const [courses, setCourses] = useState([]);
  const url = "https://localhost:5001/api/courses";
  const user = useSelector(selectUser);
  const [languagesFrom, setLanguagesFrom] = useState<Array<string>>([]);
  const [languagesTo, setLanguagesTo] = useState<Array<string>>([]);

  useEffect(() => {
    axios
      .get(url, { headers: { Authorization: `Bearer ${user.token}` } })
      .then((res) => {
        setCourses(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (courses && courses.length > 0) {
      const tempFrom: Array<string> = [];
      const tempTo: Array<string> = [];
      courses.forEach((x: Course) => {
        if (!tempFrom.includes(x.languageFrom.name)) {
          tempFrom.push(x.languageFrom.name);
        }
        if (!tempTo.includes(x.languageTo.name)) {
          tempTo.push(x.languageTo.name);
        }
      });
      setLanguagesFrom(tempFrom);
      setLanguagesTo(tempTo);
    }
    console.log(languagesFrom);
  }, [courses]);

  return (
    <div className="CoursesDisplay">
      <div className="CoursesDisplay-header">
        <h1 className="CoursesDisplay-title">Language courses</h1>
        <input
          type="text"
          placeholder="Search by title..."
          className="SearchBar"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={languagesFrom}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Language from" />
          )}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={languagesTo}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Language to learn" />
          )}
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
