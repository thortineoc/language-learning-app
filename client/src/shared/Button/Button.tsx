import React, { ReactElement } from "react";
import "./Button.css";

function Button({ children, ...rest }: any): ReactElement {
  return (
    <button className="btn" {...rest}>
      {children.toUpperCase()}
    </button>
  );
}

export default Button;
