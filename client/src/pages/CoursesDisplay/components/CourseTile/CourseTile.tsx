import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { getRandomInt } from "../../../../helpers/getRandomHelper";
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

function CourseTile({
  isMine,
  data,
}: {
  isMine: boolean;
  data: Data;
}): ReactElement {
  const n = 12;

  let num = getRandomInt(12);
  return (
    <div className="CourseTile">
      <Link
        to={!isMine ? `course/${data.id}` : `mycourse/${data.id}`}
        className="link"
      >
        <span className="CourseTile-title"> {data?.title}</span>
      </Link>
      <Link
        to={!isMine ? `course/${data.id}` : `mycourse/${data.id}`}
        className="link"
      >
        <div className="CourseTile-building">
          {[...Array(n)].map((e, i) => (
            <div className="CourseTile-building-window-blue" key={i}></div>
          ))}
        </div>
      </Link>
      {data?.languageFrom?.name} - {data?.languageTo?.name}
    </div>
  );
}

export default CourseTile;
