import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "src/redux/Slice/loginSlice";
import { Formik } from "formik";
import Loader from "../loader/Loader";
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
} from "@coreui/react";


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
  const { isLoading } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = (values) => {
    dispatch(login({ values, history }));
    // setSubmitting(isLoading);
  };
  if (isLoading) {
    return (
      // <div className="vh-100">
      <Loader />
      // </div>

    );
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
