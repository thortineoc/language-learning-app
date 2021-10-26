import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import "./CourseTile.scss";

interface Props {
  data: {
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
  };
}

function CourseTile({ data }: any): ReactElement {
  const n = 12;

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  let num = getRandomInt(12);
  return (
    <div className="CourseTile">
      <Link to={`course/${data.id}`} className="link">
        <span className="CourseTile-title"> {data?.title}</span>
      </Link>
      <Link to={`course/${data.id}`}>
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
