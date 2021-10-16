import React, { ReactElement } from "react";
import { useField } from "formik";
import TextField from "@material-ui/core/TextField";
import "./TextFieldWrapper.scss";

interface Props {
  name: string;
  label: string;
  type: string;
}

function TextFieldWrapper({ name, ...rest }: Props): ReactElement {
  const [field, meta] = useField(name);
  const configField: Record<string, any> = {
    ...rest,
    ...field,
    autoComplete: "off",
    fullWidth: true,
  };

  if (meta && meta.touched && meta.error) {
    configField.error = true;
    configField.helperText = meta.error;
  }

  return (
    <div className="TextFieldWrapper">
      <TextField {...configField} />
    </div>
  );
}

export default TextFieldWrapper;
