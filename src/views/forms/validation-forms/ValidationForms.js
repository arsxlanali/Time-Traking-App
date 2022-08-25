import React from "react";

import { TextMask, InputAdapter } from "react-text-mask-hoc";
import {
  CButton,
  CSelect,
  CCard,
  CCardHeader,
  CCardBody,
  CCol,
  CForm,
  CInvalidFeedback,
  CInputCheckbox,
  CFormGroup,
  CLabel,
  CInput,
  CRow,
  CFormText,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
} from "@coreui/react";
//import { ProBadge, DocsLink } from "src/reusable";

import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = function (values) {
  return Yup.object().shape({
    name: Yup.string()
      .min(2, `Name has to be at least 2 characters`)
      .required("Name is required"),
    address: Yup.string()
      .min(1, `Address has to be at least 1 character`)
      .required("Address is required"),
    phone: Yup.string()
      .min(5, `phone has to be at least 5 characters`)
      .required("phone is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required!"),
    password: Yup.string()
      .min(6, `Password has to be at least ${6} characters!`)
      .matches(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
        "Password must contain: numbers, uppercase and lowercase letters\n"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([values.password], "Passwords must match")
      .required("Password confirmation is required"),
    accept: Yup.bool()
      .required("* required")
      .test(
        "accept",
        "You have to accept our Terms and Conditions!",
        (value) => value === true
      ),
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

const initialValues = {
  name: "",
  address: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  accept: false,
};

const onSubmit = (values, { setSubmitting, setErrors }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    // console.log('User has been successfully saved!', values)
    setSubmitting(false);
  }, 2000);
};

const findFirstError = (formName, hasError) => {
  const form = document.forms[formName];
  for (let i = 0; i < form.length; i++) {
    if (hasError(form[i].name)) {
      form[i].focus();
      break;
    }
  }
};

const validateForm = (errors) => {
  findFirstError("simpleForm", (fieldName) => {
    return Boolean(errors[fieldName]);
  });
};

const touchAll = (setTouched, errors) => {
  setTouched({
    name: true,
    address: true,
    phone: true,
    email: true,
    password: true,
    confirmPassword: true,
    accept: true,
  });
  validateForm(errors);
};

const ValidationForms = () => {
  return (
    <CCard>
      <CCardHeader>Add Employee</CCardHeader>
      <CCardBody>
        <Formik
          initialValues={initialValues}
          validate={validate(validationSchema)}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            status,
            dirty,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValid,
            handleReset,
            setTouched,
          }) => (
            <CRow>
              <CCol lg="6">
                <CForm onSubmit={handleSubmit} noValidate name="simpleForm">
                  <CFormGroup>
                    <CLabel htmlFor="name">Name</CLabel>
                    <CInput
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name"
                      autoComplete="given-name"
                      valid={!errors.name}
                      invalid={touched.name && !!errors.name}
                      autoFocus={true}
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    <CInvalidFeedback>{errors.name}</CInvalidFeedback>
                  </CFormGroup>
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
                    <CLabel htmlFor="address">Address</CLabel>
                    <CInput
                      type="text"
                      name="address"
                      id="address"
                      placeholder="Address"
                      autoComplete="family-name"
                      valid={!errors.address}
                      invalid={touched.address && !!errors.address}
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
                    />
                    <CInvalidFeedback>{errors.address}</CInvalidFeedback>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="phone">Phone</CLabel>
                    <CInput
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="Phone"
                      autoComplete="phone"
                      valid={!errors.phone}
                      invalid={touched.phone && !!errors.phone}
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phone}
                    />
                    <CFormText color="muted">ex. (92) 300-12345678</CFormText>
                    <CInvalidFeedback>{errors.phone}</CInvalidFeedback>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="12">
                      <CLabel htmlFor="select">Department</CLabel>
                    </CCol>
                    <CCol xs="12" md="12">
                      <CSelect custom name="select" id="select">
                        <option value="0">Please select</option>
                        <option value="1">Management</option>
                        <option value="2">Development</option>
                        <option value="3">Desining</option>
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup variant="custom-checkbox" className="pb-3">
                    <CInputCheckbox
                      custom
                      id="accept"
                      required
                      valid={!errors.accept}
                      invalid={touched.accept && !!errors.accept}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <CLabel variant="custom-checkbox" htmlFor="accept">
                      I accept the terms of use
                    </CLabel>
                    <CInvalidFeedback>{errors.accept}</CInvalidFeedback>
                  </CFormGroup>
                  <CFormGroup>
                    <CButton
                      type="submit"
                      color="primary"
                      className="mr-1"
                      disabled={isSubmitting || !isValid}
                    >
                      {isSubmitting ? "Wait..." : "Submit"}
                    </CButton>
                    <CButton
                      type="button"
                      color="success"
                      className="mr-1"
                      onClick={() => touchAll(setTouched, errors)}
                      disabled={isValid}
                    >
                      Validate
                    </CButton>
                    <CButton
                      type="reset"
                      color="danger"
                      className="mr-1"
                      onClick={handleReset}
                    >
                      Reset
                    </CButton>
                  </CFormGroup>
                </CForm>
              </CCol>
              <CCol lg="6">
                <CCard color={isValid ? "gradient-info" : "gradient-secondary"}>
                  <CCardBody>
                    <pre>values: {JSON.stringify(values, null, 2)}</pre>
                    <pre>errors: {JSON.stringify(errors, null, 2)}</pre>
                    <pre>touched: {JSON.stringify(touched, null, 2)}</pre>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          )}
        </Formik>
      </CCardBody>
    </CCard>
  );
};

export default ValidationForms;
