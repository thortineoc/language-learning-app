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

function CourseTile({ data }: Props): ReactElement {
  const n = 12;
  return (
    <div className="CourseTile">
      {data.title}
      <Link to={`course/${data.id}`}>
        <div className="CourseTile-building">
          {[...Array(n)].map((e, i) => (
            <div className="CourseTile-building-window" key={i}></div>
          ))}
        </div>
      </Link>
      {data.languageFrom.name} - {data.languageTo.name}
    </div>
  );
}

export default CourseTile;
