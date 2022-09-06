import React, { useState } from 'react'
import { addTask } from 'src/redux/Slice/viewTimeSheetSlice';

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CSelect,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,

  CForm,
  CInvalidFeedback,
  CInputCheckbox,
  CFormGroup,
  CLabel,
  CInput,

  CFormText,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
} from '@coreui/react'

import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { TextMask, InputAdapter } from "react-text-mask-hoc";
import CIcon from "@coreui/icons-react";
const validationSchema = function (values) {
  return Yup.object().shape({

    projectId: Yup.string()
      .min(1, `Address has to be at least 1 character`)
      .required("Address is required"),

    name: Yup.string()
      .min(2, `Name has to be at least 2 characters`)
      .required("Name is required"),
    type: Yup.string()
      .min(1, `Task type has to be at least 1 character`)
      .required("Task type is required"),
    description: Yup.string()
      .min(5, `Description has to be at least 5 characters`)
      .required("Description is required"),
    date: Yup.string()
      .required("Date is required!"),
    duration: Yup.string()
      .required("Duration is required!"),

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
  findFirstError("simpleForm", (fieldName) => {
    return Boolean(errors[fieldName]);
  });
};

const touchAll = (setTouched, errors) => {
  setTouched({
    name: true,
    type: true,
    description: true,
    duration: true,
    date: true,
    projectId: true,
    duration: true
  });
  validateForm(errors);
};

const key = localStorage.getItem("key");


const AddTask = (props) => {



  const initialValues = {
    name: "",
    type: "",
    description: "",
    date: "",
    projectId: "",
    duration: "",
  };


  const dispatch = useDispatch();


  const onSubmit = (values, { setSubmitting, setErrors }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));

      // console.log('User has been successfully saved!', values)
      setSubmitting(false);
    }, 2000);
    console.log("values", values)
    dispatch(addTask(values));
  };

  const [large, setLarge] = useState();


  return (

    <CModal show={props.flag} onClose={() => setLarge(!props.flag)} size="lg">
      <CModalHeader closeButton>
        <CModalTitle>Add Task</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard>
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
              }) => (
                <CRow>
                  <CCol lg="6">
                    <CForm
                      onSubmit={handleSubmit}
                      noValidate
                      name="simpleForm"
                    >
                      {/* <CFormGroup>
                  <CLabel htmlFor="userId">User Id</CLabel>
                  <CInput
                    type="text"
                    name="userId"
                    id="userId"
                    placeholder="User Id"
                    autoComplete="given-name"
                    valid={!errors.userId}
                    invalid={touched.userId && !!errors.userId}
                    autoFocus={true}
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.userId}
                  />
                  <CInvalidFeedback>{errors.userId}</CInvalidFeedback>
                </CFormGroup> */}
                      <CFormGroup row>
                        <CCol md="12">
                          <CLabel htmlFor="select">Project</CLabel>
                        </CCol>
                        <CCol xs="12" md="12">
                          <CSelect
                            custom
                            name="project"
                            id="project"
                            required
                            valid={!errors.project}
                            invalid={touched.project && !!errors.project}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.project}
                          >
                            <option value="">Please select</option>
                            <option value="P1">P1</option>
                            <option value="P2">P2</option>
                            <option value="P3">P3</option>
                            <option value="P4">P4</option>
                          </CSelect>
                        </CCol>
                        <CInvalidFeedback>{errors.project}</CInvalidFeedback>
                      </CFormGroup>

                      <CFormGroup>
                        <CLabel htmlFor="projectId">Project Id</CLabel>
                        <CInput
                          type="text"
                          name="projectId"
                          id="projectId"
                          placeholder="Project Id"
                          autoComplete="given-name"
                          valid={!errors.projectId}
                          invalid={touched.projectId && !!errors.projectId}
                          autoFocus={true}
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.projectId}
                        />
                        <CInvalidFeedback>{errors.projectId}</CInvalidFeedback>
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">Name</CLabel>
                        <CInput
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Task Name"
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
                      {/* <CFormGroup>
                        <CLabel htmlFor="type">Type</CLabel>
                        <CInput
                          type="text"
                          name="type"
                          id="type"
                          description
                          placeholder="Task Type"
                          autoComplete="family-name"
                          valid={!errors.type}
                          invalid={touched.type && !!errors.type}
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.type}
                        />
                        <CInvalidFeedback>{errors.type}</CInvalidFeedback>
                      </CFormGroup> */}

                      <CFormGroup row>
                        <CCol md="12">
                          <CLabel htmlFor="select">Task Type</CLabel>
                        </CCol>
                        <CCol xs="12" md="12">
                          <CSelect
                            custom
                            name="type"
                            id="type"
                            required
                            valid={!errors.type}
                            invalid={touched.type && !!errors.type}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.type}
                          >
                            <option value="">Please select</option>
                            <option value="t1">Frontend</option>
                            <option value="t2">Backend</option>
                            <option value="t3">UI?UX</option>
                          </CSelect>
                        </CCol>
                        <CInvalidFeedback>{errors.type}</CInvalidFeedback>
                      </CFormGroup>


                      <CFormGroup>
                        <CLabel htmlFor="description">Description</CLabel>
                        <CInput
                          type="text"
                          name="description"
                          id="description"
                          placeholder="Description"
                          autoComplete="description-name"
                          valid={!errors.description}
                          invalid={
                            touched.description && !!errors.description
                          }
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.description}
                        />
                        <CInvalidFeedback>
                          {errors.description}
                        </CInvalidFeedback>
                      </CFormGroup>

                      <CFormGroup>
                        <CLabel htmlFor="duration">Duration</CLabel>
                        {/* < CDropdown className="m-1">
                          <CDropdownToggle>
                            Hours
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem>1</CDropdownItem>
                            <CDropdownDivider />
                            <CDropdownItem>2</CDropdownItem>
                            <CDropdownDivider />
                            <CDropdownItem>3</CDropdownItem>
                            <CDropdownDivider />
                            <CDropdownItem>4</CDropdownItem>
                            <CDropdownDivider />
                            <CDropdownItem>5</CDropdownItem>
                            <CDropdownDivider />
                            <CDropdownItem>6</CDropdownItem>
                            <CDropdownDivider />
                            <CDropdownItem>7</CDropdownItem>
                            <CDropdownDivider />
                            <CDropdownItem>8</CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                        < CDropdown className="m-1">
                          <CDropdownToggle>
                            Minutes
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem>1</CDropdownItem>
                            <CDropdownDivider />
                            <CDropdownItem>2</CDropdownItem>
                            <CDropdownDivider />
                            <CDropdownItem>3</CDropdownItem>
                            <CDropdownDivider />
                            <CDropdownItem>4</CDropdownItem>
                            <CDropdownDivider />
                            <CDropdownItem>5</CDropdownItem>
                            <CDropdownDivider />
                            <CDropdownItem>6</CDropdownItem>
                            <CDropdownDivider />
                            <CDropdownItem>7</CDropdownItem>
                            <CDropdownDivider />
                            <CDropdownItem>8</CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown> */}

                        <CInput
                          type="text"
                          name="duration"
                          id="duration"
                          placeholder="Duration"
                          autoComplete="duration-name"
                          valid={!errors.duration}
                          invalid={
                            touched.duration && !!errors.duration
                          }
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.duration}
                        />
                        <CInvalidFeedback>
                          {errors.description}
                        </CInvalidFeedback>
                      </CFormGroup>

                      <CFormGroup>
                        <CLabel htmlFor="date">Date</CLabel>
                        <CInput
                          type="text"
                          name="date"
                          id="date"
                          placeholder="MM/DD/YYYY"
                          autoComplete="date-name"
                          valid={!errors.date}
                          invalid={
                            touched.date && !!errors.date
                          }
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.date}
                        />
                        <CInvalidFeedback>
                          {errors.date}
                        </CInvalidFeedback>
                      </CFormGroup>
  
                      <CFormGroup>
                        <CButton
                          type="submit"
                          color="primary"
                          className="mr-1"
                          disabled={isSubmitting || !isValid}
                        >
                          {isSubmitting ? "Wait..." : "Add Task"}
                        </CButton>

                      </CFormGroup>
                    </CForm>
                  </CCol>
                </CRow>
              )}
            </Formik>
          </CCardBody>
        </CCard>
      </CModalBody>
      {/* <CModalFooter>
        <CButton color="primary" onClick={() => setLarge(!large)}>
          Add
        </CButton>{" "}
        <CButton color="secondary" onClick={() => setLarge(!large)}>
          Cancel
        </CButton>
      </CModalFooter> */}
    </CModal >
  )
}

export default AddTask;