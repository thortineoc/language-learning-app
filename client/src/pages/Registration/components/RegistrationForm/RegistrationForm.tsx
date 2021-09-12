import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import React, { ReactElement } from "react";
import * as Yup from "yup";
import TextFieldWrapper from "../../../../shared/TextFieldWrapper/TextFieldWrapper";
import "./RegistrationForm.css";
import axios from "axios";

const initialValues = {
  username: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  username: Yup.string().required("Required"),
  email: Yup.string().email("Invalid format").required("Required"),
  password: Yup.string().required("Required"),
});

const onSubmit = (
  values: any,
  { setSubmitting, resetForm, setErrors, setStatus }: any
) => {
  console.log(JSON.stringify(values));
  axios
    .post("https://localhost:5001/api/account/register", values)
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

function RegistrationForm(): ReactElement {
  return (
    <div className="RegistrationForm">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <h3>Register</h3>
              <div className="CreateForm">
                <TextFieldWrapper
                  label="Username *"
                  name="username"
                  type="text"
                />
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

export default RegistrationForm;
