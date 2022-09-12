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

import { useSelector } from "react-redux";
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import CIcon from "@coreui/icons-react";
import { TextMask, InputAdapter } from "react-text-mask-hoc";
import { getEmployees } from 'src/redux/Slice/employeesSlice';
import states from 'src/views/forms/advanced-forms/states';
import Select from "react-select";
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getProjects } from 'src/redux/Slice/projectSlice';
// import { values } from 'core-js/core/array';

const validationSchema = function (values) {
  return Yup.object().shape({
    type: Yup.string()
      .min(2, `Project name has to be at least 2 characters`)
      .required('Project name is required'),

    description: Yup.string()
      .min(5, `Description has to be at least 5 characters`)
      .required('Description is required'),
  })
}
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






const key = localStorage.getItem("key");


const AddTask = ({ flag, onClose, date }) => {
  const dispatch = useDispatch();
  const [duration, setDuration] = useState(0);
  const [durationInput, setDurationInput] = useState();
  const darkMode = useSelector((state) => state?.slideBar?.darkMode);
  const [value, setValue] = React.useState([]);
  const empProject = useSelector((state) => state?.viewProjects?.projects);
  const projectOptions = [];
  empProject.forEach(emp => {
    const result = (({ _id, name }) => ({ _id, name }))(emp)
    projectOptions.push({ "value": result._id, "label": result.name });
  })
  // console.log("This is duration 1", durationInput, typeof durationInput)
  useEffect(() => {
    dispatch(getProjects());
    const timeI = durationInput;
    const time = duration;
    if (timeI !== undefined) {
      var hour = parseInt(timeI.slice(0, 1));
      var min = parseInt(timeI.slice(2, 4))
      setDuration(hour * 60 + min);
      // console.log("this is time", hour, min)
    }
    // if (time !== 0) {
    //   const hour = parseInt(time / 60);
    //   const min = parseInt(time % 60);
    //   setDurationInput(hour + ':' + min);
    //   // console.log("this is time", hour, min)
    // }
  }, [dispatch, durationInput]);

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const data = {
      ...values, date, projectId: value.value,
      duration: { hours: parseInt(duration / 60), minutes: parseInt(duration % 60) }
    };
    dispatch(addTask({ data, setSubmitting, resetForm }));
  }


  const initialValues = {
    type: "",
    description: "",
    projectId: "",
  };



  return (

    <CModal show={flag} onClose={onClose} size="lg">
      <CModalHeader closeButton>
        <CModalTitle>Add Task</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCardBody>
          <Formik
            initialValues={initialValues}
            validate={validate(validationSchema)}
            onSubmit={onSubmit}
          >
            {
              ({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                isValid,
              }) => (
                <CRow >
                  <CCol>
                    <CForm onSubmit={handleSubmit} noValidate name='simpleForm5'>
                      <CFormGroup>
                        <CLabel htmlFor="type">Task Type</CLabel>
                        <CInput type="text"
                          name="type"
                          id="type"
                          placeholder="Task Type"
                          autoComplete="given-name"
                          valid={!errors.type}
                          invalid={touched.type && !!errors.type}
                          autoFocus={true}
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.type} />
                        <CInvalidFeedback>{errors.type}</CInvalidFeedback>
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="description">Description</CLabel>
                        <CInput type="text"
                          name="description"
                          id="description"
                          placeholder="Description"
                          autoComplete="description"
                          valid={!errors.description}
                          invalid={touched.description && !!errors.description}
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.description} />
                        <CInvalidFeedback>{errors.description}</CInvalidFeedback>
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="projectId">Projects</CLabel>
                        <Select
                          type="projectId"
                          name="projectId"
                          id="projectId"
                          placeholder="Project Name"
                          value={value}
                          options={projectOptions}
                          onChange={setValue}
                          invalid={touched.projectId}
                          onBlur={handleBlur}
                          theme={(theme) => ({
                            ...theme,
                            colors: {
                              ...theme.colors,
                              primary: darkMode ? "black" : theme.colors.primary,
                              primary25: darkMode ? "black" : theme.colors.primary25,
                              dangerLight: darkMode ? "black" : theme.colors.dangerLight,
                              neutral0: darkMode ? "#2a2b36" : theme.colors.neutral0,
                            },
                          })}
                        />
                        <CInvalidFeedback>{errors.projectId}</CInvalidFeedback>
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Duration</CLabel>
                        <CInputGroup>
                          <CInputGroupPrepend>
                            <CInputGroupText><CIcon name="cil-calendar" /></CInputGroupText>
                          </CInputGroupPrepend>
                          <TextMask
                            mask={[/\d/, ':', /\d/, /\d/]}
                            Component={InputAdapter}
                            className="form-control"
                            value={durationInput}
                            onChange={(e) => {
                              if (e.target.value.length <= 4) {
                                setDurationInput(e.target.value);
                              }
                            }}
                          />
                        </CInputGroup>
                        <CFormText color="muted">
                          ex. 1:23 min
                        </CFormText>
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="duration">Duration</CLabel>
                        <div>
                          <input type="range" name="points" min="0" max="120" value={duration} onChange={(e) => setDuration(e.target.value)}
                            style={{ width: "100%" }} />

                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div>0 min</div>
                          <div>
                            {parseInt(duration / 60)} <strong>{' hr '}</strong>
                            {parseInt(duration % 60)} <strong>{' min'}</strong>
                          </div>
                          <div>120 min</div>
                        </div>

                      </CFormGroup>
                      <CFormGroup>
                        <CRow className={"mt-2"}>
                          <CCol xs="6">
                            <CButton
                              type="submit"
                              color="primary"
                              className="mr-1"
                              disabled={isSubmitting || !isValid}
                            >
                              {isSubmitting ? "Adding..." : "Add Task"}
                            </CButton>
                          </CCol>
                          <CCol xs="6" className="text-right">
                            <CButton color="secondary" className="mr-1" onClick={onClose}>Close</CButton>
                          </CCol>
                        </CRow>
                      </CFormGroup>
                    </CForm>
                  </CCol>
                </CRow>
              )}
          </Formik>
        </CCardBody>
      </CModalBody>
    </CModal >
  )
}

export default AddTask;