import Button from "../../shared/Button/Button";
import axios from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router";
import "./CourseDetails.scss";
import { Link } from "react-router-dom";

interface Translation {
  id: number;
  wordFrom: string;
  wordTo: string;
}

interface Category {
  int: number;
  name: string;
  translations: Array<Translation>;
}

interface CourseInfoType {
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
  categories: Array<Category>;
}

function CourseDetails(): ReactElement {
  const { id } = useParams<{ id?: string }>();
  const url = `https://localhost:5001/api/courses/${id}`;
  const [courseInfo, setCourseInfo] = useState<CourseInfoType | undefined>(
    undefined
  );

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setCourseInfo(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="CourseDetails">
      <div className="CourseDetails-container">
        <div className="CourseDetails-title-buttons-row">
          <span className="CourseDetails-title">{courseInfo?.title}</span>
          <div className="CourseDetails-title-buttons-group">
            <Button className="Button-add">Add</Button>
            <Link to="/" className="link">
              <Button className="Button-return">Return</Button>
            </Link>
          </div>
        </div>
        <span>
          {`${courseInfo?.languageFrom?.name} - ${courseInfo?.languageTo?.name}`}
        </span>
      </div>
      <div className="CourseDetails-container">
        <span className="CourseDetails-subtitle">Categories</span>
        <div className="CourseDetails-categories">
          {courseInfo?.categories.map((category, i) => (
            <div className="Category-symbol">
              <div className="Category-symbol-inner">{category.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
