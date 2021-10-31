import Button from "../../shared/Button/Button";
import axios from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router";
import "./CourseDetails.scss";
import { Link } from "react-router-dom";
import Modal from "../../shared/Modal/Modal";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/UserSlice";

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
  const [isOpen, setIsOpen] = useState(false);
  const [translations, setTranslations] = useState<Translation[] | undefined>(
    undefined
  );
  const user = useSelector(selectUser);

  useEffect(() => {
    axios
      .get(url, { headers: { Authorization: `Bearer ${user.token}` } })
      .then((res) => {
        setCourseInfo(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const showTranslations = (translations: Array<Translation>) => {
    setIsOpen(true);
    setTranslations(translations);
  };

  const saveCourse = () => {
    axios
      .put(
        url,
        { courseId: id, appUserId: user.id },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="CourseDetails">
      <div className="CourseDetails-container">
        <div className="CourseDetails-title-buttons-row">
          <span className="CourseDetails-title">{courseInfo?.title}</span>
          <div className="CourseDetails-title-buttons-group">
            <Button className="Button-add" onClick={saveCourse}>
              Add
            </Button>
            <Link to="/courses" className="link">
              <Button className="Button-return">Return</Button>
            </Link>
          </div>
        </div>
        <span>
          {`${courseInfo?.languageFrom?.name} - ${courseInfo?.languageTo?.name}`}
        </span>
      </div>
      <div className="CourseDetails-container" style={{ marginTop: "20px" }}>
        <span className="CourseDetails-subtitle">Categories</span>
        <div className="CourseDetails-categories">
          {courseInfo?.categories.map((category, i) => (
            <div
              key={i}
              className="Category-symbol"
              onClick={() => showTranslations(category.translations)}
            >
              <div className="Category-symbol-inner">{category.name}</div>
            </div>
          ))}
        </div>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <table>
          <thead>
            <th className="Table-head">{courseInfo?.languageFrom?.name}</th>
            <th className="Table-head">{courseInfo?.languageTo?.name}</th>
          </thead>
          <tbody>
            {translations?.map((translation) => (
              <tr className="Table-row">
                <td>{translation.wordFrom}</td>
                <td> {translation.wordTo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </div>
  );
}

export default CourseDetails;
