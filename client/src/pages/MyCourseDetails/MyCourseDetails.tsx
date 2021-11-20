import Button from "../../shared/Button/Button";
import axios from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router";
import "../CourseDetails/CourseDetails.scss";
import { Link } from "react-router-dom";
import Modal from "../../shared/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../slices/UserSlice";
import DeleteDialog from "./DeleteDialog/DeleteDialog";
import "./MyCourseDetails.scss";
import { setSession } from "../../slices/SessionSlice";
import { Course, Translation } from "../../models/CourseModels";

function MyCourseDetails(): ReactElement {
  const dispatch = useDispatch();
  const { id } = useParams<{ id?: string }>();
  const url = `https://localhost:5001/api/courses/${id}`;
  const [courseInfo, setCourseInfo] = useState<Course | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [translations, setTranslations] = useState<Translation[] | undefined>(
    undefined
  );
  const [category, setCategory] = useState(0);
  const user = useSelector(selectUser);

  useEffect(() => {
    axios
      .get(url, { headers: { Authorization: `Bearer ${user.token}` } })
      .then((res) => {
        setCourseInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const showTranslations = (
    translations: Array<Translation>,
    categoryId: number
  ) => {
    setIsOpen(true);
    setTranslations(translations);
    setCategory(categoryId);
  };

  const dispatchActions = () => {
    dispatch(setSession({ courseId: id, categoryId: category }));
    dispatch(login({ ...user }));
  };

  return (
    <div className="CourseDetails">
      <div className="CourseDetails-container">
        <div className="CourseDetails-title-buttons-row">
          <span className="CourseDetails-title">{courseInfo?.title}</span>
          <div className="CourseDetails-title-buttons-group">
            <Link className="link" to="/session">
              <Button className="Button-add">Play</Button>
            </Link>
            <Button
              className="Button-return"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              Delete
            </Button>
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
              onClick={() =>
                showTranslations(category.translations, category.id)
              }
            >
              <div className="Category-symbol-inner">{category.name}</div>
            </div>
          ))}
        </div>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="button-container">
          <Link className="link" to="/session">
            <Button className="Button-add" onClick={dispatchActions}>
              Play
            </Button>
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th className="Table-head">{courseInfo?.languageFrom?.name}</th>
              <th className="Table-head">{courseInfo?.languageTo?.name}</th>
            </tr>
          </thead>
          <tbody>
            {translations?.map((translation, index) => (
              <tr className="Table-row" key={index}>
                <td>{translation.wordFrom}</td>
                <td> {translation.wordTo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>

      <Modal isOpen={isDeleteDialogOpen} setIsOpen={setIsDeleteDialogOpen}>
        <DeleteDialog setIsDeleteDialogOpen={setIsDeleteDialogOpen} />
      </Modal>
    </div>
  );
}

export default MyCourseDetails;
