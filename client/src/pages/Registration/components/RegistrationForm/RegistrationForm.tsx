import Button from "../../../../shared/Button/Button";
import { Formik, Form } from "formik";
import React, { ReactElement, useState } from "react";
import * as Yup from "yup";
import TextFieldWrapper from "../../../../shared/TextFieldWrapper/TextFieldWrapper";
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
  password: Yup.string()
    .required("Required")
    .min(8, "Password must have minimum 8 characters")
    .max(128, "Password can have maximum 128 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/,
      "Password must contain at least one uppercase letter, one lowercase letter and one number"
    ),
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
      <img
        className="CustomForm-image"
        src="assets/images/cityRegister.jpg"
        alt="buildings"
      ></img>

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
