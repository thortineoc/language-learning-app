import React, { ReactElement } from "react";
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
      <div className="CourseTile-building">
        {[...Array(n)].map((e, i) => (
          <div className="CourseTile-building-window" key={i}></div>
        ))}
      </div>
      {data.languageFrom.name} - {data.languageTo.name}
    </div>
  );
}

export default CourseTile;
