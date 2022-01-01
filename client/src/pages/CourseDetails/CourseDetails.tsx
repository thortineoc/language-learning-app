import Button from "../../shared/Button/Button";
import axios from "axios";
import React, {
  ReactElement,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router";
import "./CourseDetails.scss";
import { Link } from "react-router-dom";
import Modal from "../../shared/Modal/Modal";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/UserSlice";
import { Course, Translation } from "../../models/CourseModels";
import { Snackbar, Alert } from "@mui/material";

function CourseDetails(): ReactElement {
  const { id } = useParams<{ id?: string }>();
  const url = `https://localhost:5001/api/courses/${id}`;
  const [courseInfo, setCourseInfo] = useState<Course | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [translations, setTranslations] = useState<Translation[] | undefined>(
    undefined
  );
  const user = useSelector(selectUser);
  const [toastrSuccess, setToastrSuccess] = useState(false);
  const [toastrFail, setToastrFail] = useState(false);

  useEffect(() => {
    axios
      .get(url, { headers: { Authorization: `Bearer ${user.token}` } })
      .then((res) => {
        setCourseInfo(res.data);
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
      .then((res) => setToastrSuccess(true))
      .catch((err) => {
        console.log(err);
        setToastrFail(true);
      });
  };

  const handleToastSuccessClose = (
    event: SyntheticEvent<Element, Event>,
    reason?: any
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setToastrSuccess(false);
  };

  const handleToastFailClose = (
    event: SyntheticEvent<Element, Event>,
    reason?: any
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setToastrFail(false);
  };

  // @ts-ignore
  return (
    <div className="CourseDetails">
      <div className="CourseDetails-container">
        <div className="CourseDetails-title-buttons-row">
          <span className="CourseDetails-title">{courseInfo?.title}</span>
          <div className="CourseDetails-title-buttons-group">
            <Button className="Button-add" onClick={saveCourse}>
              Add
            </Button>
            <Snackbar
              open={toastrSuccess}
              autoHideDuration={6000}
              onClose={handleToastSuccessClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <Alert
                onClose={handleToastSuccessClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Course added successfully!
              </Alert>
            </Snackbar>
            <Snackbar
              open={toastrFail}
              autoHideDuration={6000}
              onClose={handleToastFailClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <Alert
                onClose={handleToastFailClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                Cannot add this course again!
              </Alert>
            </Snackbar>
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
            <tr>
              <th className="Table-head">{courseInfo?.languageFrom?.name}</th>
              <th className="Table-head">{courseInfo?.languageTo?.name}</th>
            </tr>
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
