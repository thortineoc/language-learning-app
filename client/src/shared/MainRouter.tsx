import React, { ReactElement } from "react";
import { Switch, Route } from "react-router-dom";
import CoursesDisplay from "../pages/CoursesDisplay/CoursesDisplay";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Homepage from "../pages/Homepage/Homepage";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";

function MainRouter(): ReactElement {
  return (
    <Switch>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Registration />
      </Route>
      <Route exact path="/courses">
        <CoursesDisplay />
      </Route>
      <Route exact path="/">
        <Homepage />
      </Route>
      <Route path="/">
        <ErrorPage />
      </Route>
    </Switch>
  );
}

export default MainRouter;
