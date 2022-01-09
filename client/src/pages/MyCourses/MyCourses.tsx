import React, { ReactElement, useEffect, useState } from "react";
import "./MyCourses.scss";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/UserSlice";
import axios from "axios";
import CourseTile from "../CoursesDisplay/components/CourseTile/CourseTile";
import { truncateSync } from "fs";
import { Link } from "react-router-dom";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { Search } from "@material-ui/icons";
import { Course } from "../../models/CourseModels";

interface CourseInfoType {
  course: {
    id: number;
    title: string;
    languageFrom: {
      id: number;
      name: string;
    };
    languageTo: {
      id: number;
      name: string;
    };
    categories: null;
    usersInCourse: [];
  };
}

function MyCourses(): ReactElement {
  const user = useSelector(selectUser);
  const url = "https://localhost:5001/api/mycourses";
  const [userCourses, setUserCourses] = useState<CourseInfoType[] | undefined>(
    undefined
  );
  const token = user.token;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setUserCourses(res.data.userCourses);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (userCourses) {
      setIsLoaded(true);
    }
  }, [userCourses]);

  const [searchTerm, setSearchTerm] = useState("");
  const [languagesFrom, setLanguagesFrom] = useState<Array<string>>([]);
  const [languagesTo, setLanguagesTo] = useState<Array<string>>([]);
  const [chosenLanguageFrom, setChosenLanguageFrom] = useState<string | null>(
    ""
  );
  const [chosenLanguageTo, setChosenLanguageTo] = useState<string | null>("");

  useEffect(() => {
    if (userCourses && userCourses.length > 0) {
      const tempFrom: Array<string> = [];
      const tempTo: Array<string> = [];
      userCourses.forEach((x: CourseInfoType) => {
        if (!tempFrom.includes(x.course.languageFrom.name)) {
          tempFrom.push(x.course.languageFrom.name);
        }
        if (!tempTo.includes(x.course.languageTo.name)) {
          tempTo.push(x.course.languageTo.name);
        }
      });
      setLanguagesFrom(tempFrom);
      setLanguagesTo(tempTo);
    }
    console.log(languagesFrom);
  }, [userCourses]);

  return (
    <>
      <div className="CoursesDisplay-header">
        <h1 className="CoursesDisplay-title">My courses</h1>
      </div>
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
      <div className="CoursesDisplay-grid">
        {userCourses
          ?.filter((val: CourseInfoType) => {
            if (searchTerm === "") {
              return val;
            } else if (
              val.course.title.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          ?.filter((val: CourseInfoType) => {
            if (chosenLanguageFrom === "" || chosenLanguageFrom === null) {
              return val;
            }
            if (val.course.languageFrom.name === chosenLanguageFrom) return val;
          })
          ?.filter((val: CourseInfoType) => {
            if (chosenLanguageTo === "" || chosenLanguageTo === null) {
              return val;
            }
            if (val.course.languageTo.name === chosenLanguageTo) return val;
          })
          ?.map((courseWithIds, i) => (
            <CourseTile data={courseWithIds.course} key={i} isMine={true} />
          ))}
        {isLoaded && userCourses && userCourses.length === 0 && (
          <div className="No-courses-info">
            <div className="No-courses-info-title">
              You do not take any course
            </div>
            <Link className="No-courses-info-link" to="/courses">
              Find a course for yourself
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default MyCourses;
