import React, { ReactElement } from "react";
import Button from "../../../shared/Button/Button";
import "./DeleteDialog.scss";

function DeleteDialog({ setIsDeleteDialogOpen }: any): ReactElement {
  return (
    <div className="DeleteDialog">
      <span className="DeleteDialog-title">
        Are you sure you want to remove this course?
      </span>
      <p>Your progress is going to be cleaned</p>
      <div className="DeleteDialog-button-group">
        <Button>Yes</Button>
        <Button onClick={() => setIsDeleteDialogOpen(false)}>No</Button>
      </div>
    </div>
  );
}

export default DeleteDialog;
