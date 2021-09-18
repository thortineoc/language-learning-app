import Button from "../../../../shared/Button/Button";
import { Formik, Form } from "formik";
import React, { ReactElement, useState } from "react";
import * as Yup from "yup";
import TextFieldWrapper from "../../../../shared/TextFieldWrapper/TextFieldWrapper";
import "../../../../shared/Styles/Form.css";
import "./RegistrationForm.css";
import axios from "axios";
import { Link } from "react-router-dom";

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

function RegistrationForm(): ReactElement {
  const [error, setError] = useState(null);

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
        setError(error.message);
        console.log(error);
      });
    resetForm();
  };

  return (
    <div className="CustomForm">
      <div className="CustomForm-image"></div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <div className="CustomForm-form">
                <h1 className="CustomForm-title">Register</h1>
                <div className="Custom-form-and-btn-wrapper">
                  <div className="CustomForm-form-fields">
                    <TextFieldWrapper
                      label="Username *"
                      name="username"
                      type="text"
                    />
                    <TextFieldWrapper
                      label="E-mail *"
                      name="email"
                      type="email"
                    />
                    <TextFieldWrapper
                      label="Password *"
                      name="password"
                      type="password"
                    />
                    {error && <span className="error">{error}</span>}
                  </div>
                  <div className="CustomForm-btn-wrapper">
                    <span>
                      Already have an account? <Link to="/login">Login</Link>
                    </span>
                    <Button type="submit" disabled={formik.isSubmitting}>
                      SUBMIT
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default RegistrationForm;
