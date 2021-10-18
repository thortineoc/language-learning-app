import React from "react";
import {
  createTheme,
  Dialog,
  DialogContent,
  makeStyles,
  PaletteType,
  ThemeProvider,
} from "@material-ui/core";

const darkTheme = createTheme({
  palette: {
    type: "dark" as PaletteType,
  },
});

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
    <ThemeProvider theme={darkTheme}>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        classes={{ paper: classes.dialogWrapper }}
      >
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default Modal;
