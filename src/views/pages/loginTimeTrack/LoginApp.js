import React, { useState, useEffect } from "react";
import { login } from "src/redux/Slice/loginSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";

import {
  CButton,
  CCard,
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  CInvalidFeedback,
  CInputCheckbox,
  CFormGroup,
  CLabel,
} from "@coreui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
// import Toaster from "src/views/notifications/toaster/Toaster";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { resetPassword } from "src/redux/Slice/employeesSlice"
// import loginSlice from "src/redux/Slice/loginSlice";
// import { login } from "src/redux/Slice/loginSlice";
const validationSchema = function (values) {
  return Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required!"),
    password: Yup.string()
      .min(6, `Password has to be at least ${6} characters!`)
      .matches(
        /(?=.*\d)(?=.*[a-z]).{6,}/,
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
  const { isLoading, isScuessfull } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = (values, setSubmitting) => {
    // values["id"] = user._id;
    dispatch(login(values));
    setSubmitting(isLoading);
  };
  // console.log("this is issuccessfful", isScuessfull)
  if (isScuessfull) {
    setTimeout(() => history.push(`/dashboard`), 5000);
    // return (
    //   <div>
    //     <Toaster></Toaster>
    //   </div>
    // );
  }
  const initialValues = {
    email: "",
    password: "",
  };


  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCard className="p-4">
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
                  isLoading,
                  isValid,
                }) => (
                  <CRow>
                    <CCol>
                      <CForm onSubmit={handleSubmit} noValidate name="simpleForm1">
                        <h1>Login</h1>
                        <p className="text-muted">Sign In to your account</p>
                        {/* <CCol> */}
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
                          />
                          <CInvalidFeedback>{errors.password}</CInvalidFeedback>
                        </CFormGroup>
                        {/* </CCol> */}
                        {/* <CCol> */}
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
                          />
                          <CInvalidFeedback>{errors.email}</CInvalidFeedback>
                        </CFormGroup>
                        {/* </CCol> */}

                        {/* <CFormGroup> */}
                        <CRow>
                          <CCol xs="6">
                            <CButton
                              type="submit"
                              color="primary"
                              className="mr-1"
                              disabled={isLoading || !isValid}
                            >
                              {isLoading ? "Wait..." : "Login"}
                            </CButton>
                          </CCol>
                          <CCol xs="6" className="text-right">
                            <CButton color="link" className="px-0">Forgot password?</CButton>
                          </CCol>
                        </CRow>
                        {/* </CFormGroup> */}
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
