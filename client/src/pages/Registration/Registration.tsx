import React, { ReactElement } from "react";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";

interface Props {}

function Registration({}: Props): ReactElement {
  return (
    <div>
      <RegistrationForm />
    </div>
  );
}

export default Registration;
