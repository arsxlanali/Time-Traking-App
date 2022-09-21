import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "src/redux/Slice/loginSlice";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  CButton,
  CCard,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInvalidFeedback,
  CFormGroup,
  CLabel,
  CRow,
  CToaster
} from "@coreui/react";
import { useState } from "react";
import { useRef } from "react";
import exampleToast from "../toast/Toast";
const validationSchema = function (values) {
  return Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required!"),
    password: Yup.string()
      .min(8, `Password has to be at least ${8} characters!`)
      .matches(
        /(?=.*\d)(?=.*[a-z]).{8,}/,
        "Password must contain: numbers, uppercase and lowercase letters\n"
      )
      .required("Password is required")
  });
};

const validate = (getValidationSchema) => {
  return (values) => {
    const validationSchema = getValidationSchema(values);
    try {
      validationSchema.validateSync(values, { abortEarly: false });
      return {};
    } catch (error) {
      return getErrorsFromValidationError(error);
    }
  };
};

const getErrorsFromValidationError = (validationError) => {
  const FIRST_ERROR = 0;
  return validationError.inner.reduce((errors, error) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    };
  }, {});
};

function LoginApp() {
  const { isLoading } = useSelector((state) => state.login);
  const darkMode = useSelector((state) => state?.slideBar?.darkMode);
  const dispatch = useDispatch();
  const history = useHistory();
  const [toast, addToast] = useState(0)
  // const toaster = useRef()
  const onSubmit = (values, { setSubmitting }) => {
    initialValues.email = values.email;
    initialValues.password = values.password;
    dispatch(login({ values, history, setSubmitting }));
    // setSubmitting(isLoading);
  };
  const initialValues = {
    email: "",
    password: "",
  };

  if (darkMode) {
    var text = "text-white c-dark-theme"
    var backgorund = {
      backgroundColor: '#181924'
    }
    var carStyle = {
      backgroundColor: '#2a2b36'
    }
    var inputColor = {
      backgroundColor: "rgba(255, 255, 255, 0.05)"
      , color: "white"
    }
  }
  return (
    <div className={`c-app c-default-layout flex-row align-items-center ${text}`}
      style={backgorund} >
      <CContainer >
        <CRow className="justify-content-center">
          <CCol lg="5">
            <CCard className="p-4"
              style={carStyle}>
              <Formik
                initialValues={initialValues}
                validate={validate(validationSchema)}
                onSubmit={onSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  isValid,
                }) => (
                  <CRow>
                    <CCol>
                      <CForm onSubmit={handleSubmit} noValidate name="simpleForm1">
                        <h1>Login</h1>
                        <p className="text-muted">Sign In to your account</p>
                        <CFormGroup>
                          <CLabel htmlFor="email">Email</CLabel>
                          <CInput
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            autoComplete="email"

                            valid={!errors.email}
                            invalid={touched.email && !!errors.email}
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            style={inputColor}
                          />
                          <CInvalidFeedback>{errors.email}</CInvalidFeedback>
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="password">Password</CLabel>
                          <CInput
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            autoComplete="new-password"
                            valid={!errors.password}
                            invalid={touched.password && !!errors.password}
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            style={inputColor}
                          />
                          <CInvalidFeedback>{errors.password}</CInvalidFeedback>
                        </CFormGroup>
                        <CRow>
                          <CCol xs="6">
                            <CButton
                              type="submit"
                              color="primary"
                              className="mr-1"
                              disabled={isSubmitting || !isValid}
                            >
                              {isSubmitting ? "Wait..." : "Login"}
                            </CButton>
                          </CCol>
                          {/* <CCol xs="6" className="text-right">
                            <CButton color="link" className="px-0">Forgot password?</CButton>
                          </CCol> */}
                          {/* <CButton onClick={() => addToast(exampleToast)}>Send a toast</CButton> */}
                          {/* <CToaster ref={toaster} push={toast} placement="top-end" /> */}
                        </CRow>
                      </CForm>
                    </CCol>
                  </CRow>
                )}
              </Formik>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}

export default LoginApp;
