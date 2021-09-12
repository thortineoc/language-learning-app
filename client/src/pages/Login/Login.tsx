import React, { ReactElement } from "react";
import LoginForm from "./components/LoginForm/LoginForm";

interface Props {}

function Login({}: Props): ReactElement {
  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default Login;
