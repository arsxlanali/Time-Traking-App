import React from "react";
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
  CCollapse,
} from "@coreui/react";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import ResetPassword from "./resetPassword";

import { useLocation, useHistory } from "react-router-dom";
import { editEmployee } from "src/redux/Slice/employeesSlice";
import { useDispatch, useSelector } from "react-redux";
import Toaster from "src/views/notifications/toaster/Toaster";
const validationSchema = function (values) {
  return Yup.object().shape({
    name: Yup.string()
      .min(2, `Name has to be at least 2 characters`)
      .required("Name is required"),
    phone: Yup.string()
      .min(11, `Phone has to be at least 11 characters`)
      .required("phone is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required!"),
    department: Yup.string().required("Department is required!"),
    position: Yup.string().required("Position is required!"),
    role: Yup.string().required("Role is required!"),
    accept: Yup.bool()
      .required("* required")
      .test("accept", "You have to check the box!", (value) => value === true),
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
  // console.log("This is error", errors);
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
    department: true,
    position: true,
    role: true,
    accept: true,
  });
  validateForm(errors);
};

const EditEmployee = ({ match }) => {
  const user = useLocation().state.item;
  const { isLoading, isScuessfull } = useSelector((state) => state.employees);
  const [collapse, setCollapse] = useState(false)
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = (values, { setSubmitting }) => {
    values["id"] = user._id;
    dispatch(editEmployee({ values, setSubmitting, history }));
    // setSubmitting(isLoading);
  };
  // console.log("this is issuccessfful", isScuessfull)
  // if (isScuessfull) {
  //   setTimeout(() => history.push(`/listemployee`), 5000);
  //   return (
  //     <div>
  //       <Toaster></Toaster>
  //     </div>
  //   );
  // }
  var initialValues = {
    name: user.name,
    address: user.address,
    phone: user.phone,
    email: user.email,
    department: user.department,
    position: user.position,
    role: user.role,
    accept: false,
  };
  return (
    <CRow className={"d-flex justify-content-center"}>
      <CCol lg={8}>
        <CCard>
          <CCardHeader>Edit Employee</CCardHeader>
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
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                isValid,
                handleReset,
                setTouched,
              }) => (
                <CRow>
                  <CCol lg="12">
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
                        <CFormText color="muted">
                          ex. (92) 300-12345678
                        </CFormText>
                        <CInvalidFeedback>{errors.phone}</CInvalidFeedback>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="12">
                          <CLabel htmlFor="select">Department</CLabel>
                        </CCol>
                        <CCol xs="12" md="12">
                          <CSelect
                            custom
                            name="department"
                            id="department"
                            required
                            valid={!errors.department}
                            invalid={touched.department && !!errors.department}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.department}
                          >
                            <option value="">Please select</option>
                            <option value="HR">HR</option>
                            <option value="DEVELOPMENT">Development</option>
                            <option value="BUSINESS">Business</option>
                            <option value="GENERAL">General</option>
                          </CSelect>
                        </CCol>
                        <CInvalidFeedback>{errors.department}</CInvalidFeedback>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="12">
                          <CLabel htmlFor="select">Position</CLabel>
                        </CCol>
                        <CCol xs="12" md="12">
                          <CSelect
                            custom
                            name="position"
                            id="position"
                            required
                            valid={!errors.position}
                            invalid={touched.position && !!errors.position}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.position}
                          >
                            <option value="">Please select</option>
                            <option value="Backend">Backend</option>
                            <option value="Frontend">Frontend</option>
                            <option value="SQA">SQA</option>
                          </CSelect>
                        </CCol>
                        <CInvalidFeedback>{errors.position}</CInvalidFeedback>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="12">
                          <CLabel htmlFor="select">Role</CLabel>
                        </CCol>
                        <CCol xs="12" md="12">
                          <CSelect
                            custom
                            name="role"
                            id="role"
                            valid={!errors.role}
                            invalid={touched.role && !!errors.role}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.role}
                            required
                          >
                            <option value="">Please select</option>
                            <option value="MANAGEMENT">Managment</option>
                            <option value="EMPLOYEE">Employee</option>
                          </CSelect>
                        </CCol>
                        <CInvalidFeedback>{errors.role}</CInvalidFeedback>
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
                          I confrim the data is correct
                        </CLabel>
                        {/* <CInvalidFeedback>{errors.accept}</CInvalidFeedback> */}
                      </CFormGroup>
                      <CFormGroup>
                        <CButton
                          type="submit"
                          color="primary"
                          className="mr-3"
                          disabled={isSubmitting || !isValid}
                          onClick={() => touchAll(setTouched, errors)}
                        >
                          {isSubmitting ? "Wait..." : "Submit"}
                        </CButton>
                        <CButton
                          type="reset"
                          color="danger"
                          className="mr-3"
                          onClick={handleReset}
                        >
                          Reset
                        </CButton>
                        <CButton color="success" className="mr-1" onClick={() => setCollapse(!collapse)}>
                          Chanage Password
                        </CButton>
                      </CFormGroup>
                    </CForm>
                  </CCol>
                </CRow>
              )}
            </Formik>
            <CCollapse show={collapse}>
              <ResetPassword />
            </CCollapse>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default EditEmployee;
