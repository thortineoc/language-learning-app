import axios from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/UserSlice";
import CourseTile from "./components/CourseTile/CourseTile";
import "./CoursesDisplay.scss";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { Course } from "../../models/CourseModels";
import { Search } from "@material-ui/icons";

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
        <div className="search-bars-container">
          <TextField
            placeholder="Search by title..."
            style={{ backgroundColor: "white", borderRadius: 3 }}
            sx={{ width: 250 }}
            size="small"
            onChange={(event) => setSearchTerm(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={languagesFrom}
            sx={{ width: 250 }}
            size="small"
            renderInput={(params) => (
              <TextField {...params} placeholder="Language from..." />
            )}
            style={{ backgroundColor: "white", borderRadius: 3 }}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={languagesTo}
            sx={{ width: 250 }}
            size="small"
            renderInput={(params) => (
              <TextField {...params} placeholder="Language to learn" />
            )}
            style={{ backgroundColor: "white", borderRadius: 3 }}
          />
        </div>
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
