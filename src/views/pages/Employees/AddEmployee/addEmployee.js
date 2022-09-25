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
} from "@coreui/react";

import { Formik } from "formik";
import * as Yup from "yup";

import { addEmployee } from "src/redux/Slice/employeesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MaskedInput from "react-text-mask";
import { Field } from "formik";
const phoneNumberMask = [
  /[0-9]/,
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/
];
const validationSchema = function (values) {
  return Yup.object().shape({
    name: Yup.string()
      .min(2, `Name has to be at least 2 characters`)
      .required("Name is required"),
    phone: Yup.string()
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

const initialValues = {
  name: "",
  phone: "",
  email: "",
  department: "",
  position: "",
  role: "",
  accept: false,
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
    phone: true,
    email: true,
    department: true,
    position: true,
    role: true,
    accept: true,
  });
  validateForm(errors);
};
const ValidationForms = () => {
  const { isLoading, isScuessfull } = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = (values, { setSubmitting }) => {
    dispatch(addEmployee({ values, setSubmitting, history }));
  };
  const darkMode = useSelector((state) => state?.slideBar?.darkMode);
  const role = localStorage.getItem("Role")
  var flag = true;
  if (role == "MANAGEMENT") {
    flag = false;
  }
  return (
    <CRow className={"d-flex justify-content-center"}>
      <CCol lg={8}>
        <CCard>
          <CCardHeader>Add Employee</CCardHeader>
          <CCardBody>
            <Formik
              initialValues={initialValues}
              validate={validate(validationSchema)}
              onSubmit={onSubmit}
              validateOnMount
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
                  <CCol>
                    <CForm onSubmit={handleSubmit} noValidate name="simpleForm">
                      <CFormGroup>
                        <CLabel htmlFor="name">Name</CLabel>
                        <CInput
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Name"
                          valid={!errors.name}
                          autoComplete="off"
                          invalid={touched.name && !!errors.name}
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
                          autoComplete="off"
                          placeholder="Email"
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
                        <Field
                          name="phone"
                          render={({ field }) => (
                            <MaskedInput
                              {...field}
                              mask={phoneNumberMask}
                              id="phone"
                              placeholder="Phone"
                              type="text"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              class={`form-control ${!errors.phone && "is-valid"}
                              ${touched.phone && errors.phone && "is-invalid"}`}
                            />
                          )}
                        />
                        <CFormText color="muted">
                          ex. 0300-12345678
                        </CFormText>
                        {errors.phone && touched.phone && (
                          <div className="invalid-feedback">{errors.phone}</div>
                        )}
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
                            autoComplete="off"
                            valid={!errors.department}
                            invalid={touched.department && !!errors.department}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.department}
                          >
                            <option value="" defaultValue disabled hidden>Please select</option>
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
                            <option value="" defaultValue disabled hidden>Please select</option>
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
                            <option value="" defaultValue disabled hidden>Please select</option>
                            {flag && <option value="MANAGEMENT">Management</option>}
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
                        <CInvalidFeedback>{errors.accept}</CInvalidFeedback>
                      </CFormGroup>
                      <CFormGroup>
                        <CButton
                          type="submit"
                          color="primary"
                          className="mr-3"
                          disabled={isSubmitting || !isValid}
                          onClick={() => {
                            touchAll(setTouched, errors);
                          }}
                        >
                          {isSubmitting ? "Wait..." : "Submit"}
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
                </CRow>
              )}
            </Formik>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ValidationForms;
