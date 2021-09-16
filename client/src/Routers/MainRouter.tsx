import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import CoursesDisplay from "../pages/CoursesDisplay/CoursesDisplay";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Homepage from "../pages/Homepage/Homepage";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import GuardedRoute from "../shared/GuardedRoute/GuardedRoute";
import { selectUser } from "../slices/UserSlice";

function MainRouter(): ReactElement {
  const user = useSelector(selectUser);
  console.log(user);
  return (
    <Switch>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Registration />
      </Route>
      <GuardedRoute component={CoursesDisplay} path="/courses" auth={user} />
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
