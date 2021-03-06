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
  const [chosenLanguageFrom, setChosenLanguageFrom] = useState<string | null>(
    ""
  );
  const [chosenLanguageTo, setChosenLanguageTo] = useState<string | null>("");

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
            label="Title"
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
              <TextField
                {...params}
                placeholder="Choose base language"
                label="Base language"
              />
            )}
            style={{ backgroundColor: "white", borderRadius: 3 }}
            onChange={(event, newValue) => {
              setChosenLanguageFrom(newValue);
            }}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={languagesTo}
            sx={{ width: 250 }}
            size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Language to learn"
                placeholder="Choose language to learn"
              />
            )}
            style={{ backgroundColor: "white", borderRadius: 3, color: "red" }}
            onChange={(event, newValue) => {
              setChosenLanguageTo(newValue);
            }}
          />
        </div>
      </div>
      <div className="CoursesDisplay-grid">
        {courses
          .filter((val: Course) => {
            if (searchTerm === "") {
              return val;
            } else if (
              val.title.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .filter((val: Course) => {
            if (chosenLanguageFrom === "" || chosenLanguageFrom === null) {
              return val;
            }
            if (val.languageFrom.name === chosenLanguageFrom) return val;
          })
          .filter((val: Course) => {
            if (chosenLanguageTo === "" || chosenLanguageTo === null) {
              return val;
            }
            if (val.languageTo.name === chosenLanguageTo) return val;
          })
          .map((course, i) => (
            <CourseTile data={course} key={i} isMine={false} />
          ))}
      </div>
    </div>
  );
}

export default CoursesDisplay;
