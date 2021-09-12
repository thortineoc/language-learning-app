import { Button } from "@material-ui/core";
import axios from "axios";
import { Formik, Form } from "formik";
import React, { ReactElement } from "react";
import * as Yup from "yup";
import TextFieldWrapper from "../../../../shared/TextFieldWrapper/TextFieldWrapper";
import "./LoginForm.css";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid format").required("Required"),
  password: Yup.string().required("Required"),
});

const onSubmit = (
  values: any,
  { setSubmitting, resetForm, setErrors, setStatus }: any
) => {
  console.log(JSON.stringify(values));
  axios
    .post("https://localhost:5001/api/account/login", values)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      setStatus({ success: false });
      setSubmitting(false);
      setErrors({ submit: "Cannot create this user" });
      console.log(error);
    });
  resetForm();
};

function LoginForm(): ReactElement {
  return (
    <div className="LoginForm">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <h3>Login</h3>
              <div className="CreateForm">
                <TextFieldWrapper label="E-mail *" name="email" type="email" />
                <TextFieldWrapper
                  label="Password *"
                  name="password"
                  type="password"
                />
                <Button type="submit" disabled={formik.isSubmitting}>
                  submit
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default LoginForm;
