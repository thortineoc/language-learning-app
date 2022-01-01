import React from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import {
  makeStyles,
  createStyles,
  Theme,
  ThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { logout, selectUser } from "../../slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { PaletteType } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  })
);

const darkTheme = createTheme({
  palette: {
    type: "dark" as PaletteType,
  },
});

export default function MenuListComposition() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.root}>
        <div>
          <Button
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            style={{ marginRight: "30px" }}
          >
            <ExpandMoreIcon fontSize="large" />
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      {user && user.role === "admin" && (
                        <Link className="link-white" to="/creator">
                          <MenuItem onClick={handleClose}>Creator</MenuItem>
                        </Link>
                      )}
                      <Link className="link-white" to="/courses">
                        <MenuItem onClick={handleClose}>All courses</MenuItem>
                      </Link>
                      <Link className="link-white" to="/">
                        <MenuItem onClick={handleClose}>My courses</MenuItem>
                      </Link>
                      <Link className="link-white" to="/account">
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                      </Link>
                      <Link
                        className="link-white"
                        to="/"
                        onClick={() => {
                          setTimeout(() => dispatch(logout()), 0);
                        }}
                      >
                        <MenuItem>Logout</MenuItem>
                      </Link>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    </ThemeProvider>
  );
}
