import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import React, { ReactElement } from "react";
import * as Yup from "yup";
import TextFieldWrapper from "../../../../shared/TextFieldWrapper/TextFieldWrapper";
import "./RegistrationForm.css";

const initialValues = {
  name: "",
  surname: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  surname: Yup.string().required("Required"),
  email: Yup.string().email("Invalid format").required("Required"),
  password: Yup.string().required("Required"),
});

const onSubmit = () => {
  console.log("yes");
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
                <TextFieldWrapper label="Name *" name="name" type="text" />
                <TextFieldWrapper
                  label="Surname *"
                  name="surname"
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
