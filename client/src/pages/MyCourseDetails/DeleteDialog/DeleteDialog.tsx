import axios from "axios";
import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Button from "../../../shared/Button/Button";
import { selectUser } from "../../../slices/UserSlice";
import "./DeleteDialog.scss";

function DeleteDialog({
  setIsDeleteDialogOpen,
  setIsToastr,
}: any): ReactElement {
  const { id } = useParams<{ id?: string }>();
  const url = `https://localhost:5001/api/mycourses/${id}`;
  const user = useSelector(selectUser);

  const onDelete = () => {
    axios
      .delete(url, { headers: { Authorization: `Bearer ${user.token}` } })
      .then((res) => {
        console.log(res.data.userCourses);
        setIsToastr(true);
      })
      .catch((err) => console.log(err));
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="DeleteDialog">
      <span className="DeleteDialog-title">
        Are you sure you want to remove this course?
      </span>
      <p>Your progress is going to be cleaned</p>
      <div className="DeleteDialog-button-group">
        <Button onClick={onDelete} className="yes-btn">
          Yes
        </Button>
        <Button onClick={() => setIsDeleteDialogOpen(false)} className="no-btn">
          No
        </Button>
      </div>
    </div>
  );
}

export default DeleteDialog;
