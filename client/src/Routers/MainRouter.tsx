import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import CoursesCreator from "../pages/CoursesCreator/CoursesCreator";
import CoursesDisplay from "../pages/CoursesDisplay/CoursesDisplay";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Homepage from "../pages/Homepage/Homepage";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import UserAccount from "../pages/UserAccount/UserAccount";
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
      <GuardedRoute
        exact
        path="/account"
        auth={!!user}
        component={UserAccount}
      ></GuardedRoute>
      <GuardedRoute
        exact
        path="/creator"
        auth={!!user}
        component={CoursesCreator}
      ></GuardedRoute>
      <Route exact path="/">
        {user ? <CoursesDisplay /> : <Homepage />}
      </Route>
      <Route path="*">
        <ErrorPage />
      </Route>
    </Switch>
  );
}

export default MainRouter;
