import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import CourseDetails from "../pages/CourseDetails/CourseDetails";
import CoursesCreator from "../pages/CoursesCreator/CoursesCreator";
import CoursesDisplay from "../pages/CoursesDisplay/CoursesDisplay";
import CourseSession from "../pages/CourseSession/CourseSession";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Homepage from "../pages/Homepage/Homepage";
import Login from "../pages/Login/Login";
import MyCourseDetails from "../pages/MyCourseDetails/MyCourseDetails";
import MyCourses from "../pages/MyCourses/MyCourses";
import Registration from "../pages/Registration/Registration";
import UserAccount from "../pages/UserAccount/UserAccount";
import GuardedRoute from "../shared/GuardedRoute/GuardedRoute";
import { selectUser } from "../slices/UserSlice";

function MainRouter(): ReactElement {
  const user = useSelector(selectUser);

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
        path="/courses"
        auth={!!user}
        component={CoursesDisplay}
      ></GuardedRoute>
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
      <GuardedRoute
        exact
        path="/course/:id"
        auth={!!user}
        component={CourseDetails}
      ></GuardedRoute>
      <GuardedRoute
        exact
        path="/mycourse/:id"
        auth={!!user}
        component={MyCourseDetails}
      ></GuardedRoute>
      <GuardedRoute
        exact
        path="/session"
        auth={!!user}
        component={CourseSession}
      ></GuardedRoute>
      <Route exact path="/">
        {user ? <MyCourses /> : <Homepage />}
      </Route>
      <Route path="*">
        <ErrorPage />
      </Route>
    </Switch>
  );
}

export default MainRouter;
