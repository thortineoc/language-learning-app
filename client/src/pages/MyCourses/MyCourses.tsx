import React, { ReactElement, useEffect, useState } from "react";
import "./MyCourses.scss";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/UserSlice";
import axios from "axios";
import CourseTile from "../CoursesDisplay/components/CourseTile/CourseTile";
import { truncateSync } from "fs";

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
    []
  );
  const token = user.token;

  useEffect(() => {
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log(res.data.userCourses);
        setUserCourses(res.data.userCourses);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="CoursesDisplay-grid">
      {userCourses?.map((courseWithIds, i) => (
        <CourseTile data={courseWithIds.course} key={i} isMine={true} />
      ))}
    </div>
  );
}

export default MyCourses;
