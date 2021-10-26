import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import "./CourseTile.scss";

interface Data {
  id: number;
  languageFrom: {
    id: number;
    name: string;
  };
  languageTo: {
    id: number;
    name: string;
  };
  title: string;
  categories: null;
}

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

function CourseTile({
  isMine,
  data,
}: {
  isMine: boolean;
  data: Data;
}): ReactElement {
  const n = 12;

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  console.log(isMine);

  let num = getRandomInt(12);
  return (
    <div className="CourseTile">
      <Link
        to={isMine === false ? `course/${data.id}` : `mycourse/${data.id}`}
        className="link"
      >
        <span className="CourseTile-title"> {data?.title}</span>
      </Link>
      <Link
        to={isMine === false ? `course/${data.id}` : `mycourse/${data.id}`}
        className="link"
      >
        <div className="CourseTile-building">
          {[...Array(n)].map((e, i) => (
            <div
              className={
                i * 2 === num || i === num || i * 3 === num
                  ? "CourseTile-building-window-yellow"
                  : "CourseTile-building-window-blue"
              }
              key={i}
            ></div>
          ))}
        </div>
      </Link>
      {data?.languageFrom?.name} - {data?.languageTo?.name}
    </div>
  );
}

export default CourseTile;
