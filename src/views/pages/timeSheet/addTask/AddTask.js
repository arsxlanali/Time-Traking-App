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
import tasks from '../Tasks/Tasks'
const validationSchema = function (values) {
  return Yup.object().shape({
    // type: Yup.string().required("Color is required!"),

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








const AddTask = ({ flag, onClose, date }) => {
  const department = localStorage.getItem("Department");
  // console.log("this is department", department)
  const dispatch = useDispatch();
  const [duration, setDuration] = useState(0);
  const [durationInput, setDurationInput] = useState();
  const darkMode = useSelector((state) => state?.slideBar?.darkMode);
  const [value, setValue] = React.useState([]);
  const [task, setTask] = React.useState(
    []
  )
  const empProject = useSelector((state) => state?.viewProjects?.projects);
  const projectOptions = [];
  empProject.forEach(emp => {
    const result = (({ _id, name }) => ({ _id, name }))(emp)
    projectOptions.push({ "value": result._id, "label": result.name });
  })
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch])
  useEffect(() => {

    const timeI = durationInput;
    const time = duration;
    if (timeI !== undefined) {
      var hour = parseInt(timeI.slice(0, 1));
      var min = parseInt(timeI.slice(2, 4))
      if (min) {
        setDuration(hour * 60 + min);
      }
      else if (hour) {
        setDuration(hour * 60);
      }
      else {
        setDuration(0);
      }
    }
    // console.log("this is duration", time)
    // if (time !== 0) {
    //   const hour = parseInt(time / 60).toString();
    //   const min = parseInt(time % 60).toString();
    //   if (min.length == 1) {
    //     console.log("this is hour and min", hour, min);
    //   }
    // }
  }, [durationInput, duration]);

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const data = {
      ...values, date, projectId: value.value, type: task.value,
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
                        <Select
                          as="select"
                          type="type"
                          name="type"
                          id="type"
                          // disabled="disabled" selected="selected"
                          value={task}
                          options={tasks[department]}
                          onChange={setTask}
                          // invalid={touched.type}
                          onBlur={handleBlur}
                          // style={{ color: "red" }}
                          theme={(theme) =>
                          ({
                            ...theme,
                            colors: {
                              ...theme.colors,
                              primary: darkMode ? "rgba(255, 255, 255, 0.87);" : theme.colors.primary,
                              primary25: darkMode ? "rgba(255, 255, 255, 0.20)" : theme.colors.primary25,
                              dangerLight: darkMode ? "#484c54" : theme.colors.dangerLight,
                              neutral0: darkMode ? "#484c54" : theme.colors.neutral0,
                              neutral80: darkMode ? "rgba(255, 255, 255, 0.87)" : theme.colors.neutral80,
                            },
                          })
                          }
                        />
                        <CInvalidFeedback>{errors.type}</CInvalidFeedback>
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="description">Description</CLabel>
                        <CInput type="text"
                          name="description"
                          id="description"
                          placeholder="Description"
                          valid={!errors.description}
                          invalid={touched.description && !!errors.description}
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.description}

                        />
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
                              primary: darkMode ? "rgba(255, 255, 255, 0.87);" : theme.colors.primary,
                              primary25: darkMode ? "rgba(255, 255, 255, 0.20)" : theme.colors.primary25,
                              dangerLight: darkMode ? "#484c54" : theme.colors.dangerLight,
                              neutral0: darkMode ? "#484c54" : theme.colors.neutral0,
                              neutral80: darkMode ? "rgba(255, 255, 255, 0.87)" : theme.colors.neutral80,
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