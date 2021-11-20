import React, { ReactElement, useEffect, useState } from "react";
import "./MyCourses.scss";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/UserSlice";
import axios from "axios";
import CourseTile from "../CoursesDisplay/components/CourseTile/CourseTile";
import { truncateSync } from "fs";
import { Link } from "react-router-dom";

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

  return (
    <>
      <div className="CoursesDisplay-header">
        <h1 className="CoursesDisplay-title">My courses</h1>
      </div>
      <div className="CoursesDisplay-grid">
        {userCourses?.map((courseWithIds, i) => (
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
