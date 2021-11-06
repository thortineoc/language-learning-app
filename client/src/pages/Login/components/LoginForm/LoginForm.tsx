import Button from "../../../../shared/Button/Button";
import axios from "axios";
import { Formik, Form } from "formik";
import React, { ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import * as Yup from "yup";
import TextFieldWrapper from "../../../../shared/TextFieldWrapper/TextFieldWrapper";
import { login } from "../../../../slices/UserSlice";
import "../../../../shared/Styles/Form.scss";
import { Link } from "react-router-dom";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

function LoginForm(): ReactElement {
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState(null);

  const onSubmit: any = (
    values: { username: string; password: string },
    { setSubmitting, resetForm, setStatus }: any
  ) => {
    console.log(JSON.stringify(values));
    axios
      .post("https://localhost:5001/api/account/login", values)
      .then(function (response) {
        console.log(response);
        dispatch(login(response.data));
        history.push("/");
      })
      .catch(function (error) {
        setStatus({ success: false });
        setSubmitting(false);
        error && error.response && setError(error.response.data);
      });
    resetForm();
  };

  return (
    <div className="CustomForm">
      <img
        className="CustomForm-image"
        src="assets/images/cityLogin.jpg"
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
                <h1 className="CustomForm-title">Login</h1>
                <div className="Custom-form-and-btn-wrapper">
                  <div className="CustomForm-form-fields">
                    <TextFieldWrapper
                      label="Username *"
                      name="username"
                      type="text"
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
                      Don't have an account?{" "}
                      <Link to="/register">Register</Link>
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

export default LoginForm;
