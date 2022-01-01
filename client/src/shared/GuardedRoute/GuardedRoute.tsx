import React from "react";
import { Route } from "react-router-dom";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

const GuardedRoute = ({ component: Component, auth, ...rest }: any) => (
  <Route
    {...rest}
    render={(props) =>
      auth === true ? <Component {...props} /> : <ErrorPage />
    }
  />
);

export default GuardedRoute;
