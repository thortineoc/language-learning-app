import React from "react";
import { Dialog, DialogContent, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    width: 540,
    padding: theme.spacing(2),
  },
}));

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const Modal = ({ children, isOpen, setIsOpen }: Props) => {
  const classes = useStyles();

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
