import React, { useState } from 'react'
import { addTask } from 'src/redux/Slice/viewTimeSheetSlice';
import {
  CButton,
  CCardBody,
  CCol,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
  CForm,
  CInvalidFeedback,
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
import Select from "react-select";
import { useEffect } from 'react';
import { getProjects } from 'src/redux/Slice/projectSlice';
import { useRef } from 'react';
import tasks from '../Tasks/Tasks'
const validationSchema = function (values) {
  return Yup.object().shape({
    description: Yup.string()
      .min(5, `Description has to be at least 5 characters`)
      .required('Description is required'),
    time: Yup.string()
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
  const empProject = useSelector((state) => state?.viewProjects?.projects);
  const darkMode = useSelector((state) => state?.slideBar?.darkMode);
  const department = localStorage.getItem("Department");
  const dispatch = useDispatch();
  const [duration, setDuration] = useState(0);
  const [durationInput, setDurationInput] = useState();
  const [description, setDiscription] = useState('');
  const [value, setValue] = React.useState([]);
  const [task, setTask] = React.useState([])
  const textareaRef = useRef();
  const projectOptions = [];
  empProject.forEach(emp => {
    const result = (({ _id, name }) => ({ _id, name }))(emp)
    projectOptions.push({ "value": result._id, "label": result.name });
  })
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch])

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const data = {
      ...values, date, projectId: value.value, type: task.value,
      duration: { hours: parseInt(duration / 60), minutes: parseInt(duration % 60) }
    };
    setTask([])
    setValue([])
    setDuration(0);
    setDurationInput('');
    dispatch(addTask({ data, setSubmitting, resetForm }));
  }

  const initialValues = {
    type: "",
    description: "",
    projectId: "",
    time: ""
  };

  const handleFocus = (event) => event.target.select();
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
            validateOnMount

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
                setErrors
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
                          value={task}
                          options={tasks[department]}
                          onChange={setTask}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
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
                          autoComplete="off"
                          invalid={touched.description && !!errors.description}
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onFocus={handleFocus}
                          value={values.description}
                          style={{ borderColor: '#d8dbe0' }}
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
                          onFocus={handleFocus}
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
                            ref={textareaRef}
                            Component={InputAdapter}
                            className="form-control"
                            value={durationInput}
                            onFocus={handleFocus}
                            // onBlur={() => textareaRef.current.setSelectionRange(0, 0)}
                            style={{ borderColor: '#d8dbe0' }}
                            onChange={(e) => {
                              console.log(e)
                              if (e.target.value.length <= 4) {
                                const timeI = e.target.value;
                                setDurationInput(e.target.value);
                                const hour = parseInt(timeI.slice(0, 1));
                                const min = parseInt(timeI.slice(2, 4))
                                if (hour > 2 || hour == 2 && min > 0) {
                                  e.target.selectionStart = 0
                                  e.target.selectionEnd = 4
                                  setDurationInput('2:00')
                                  setDuration(2 * 60);
                                }
                                else if (min > 59) {
                                  setDurationInput(`${hour}:59`)
                                  setDuration(hour * 60 + 59);
                                }
                                else if (min) {
                                  setDuration(hour * 60 + min);
                                }
                                else if (hour) {
                                  setDuration(hour * 60);
                                }
                                else {
                                  setDuration(0);
                                }
                              }
                            }}
                          />
                        </CInputGroup>
                        <CInvalidFeedback>{errors.time}</CInvalidFeedback>
                        <CFormText color="muted">
                          ex. 1:23 max 2 hours
                        </CFormText>
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="duration">Duration</CLabel>
                        <div>
                          <input type="range" min="0" max="120" value={duration} onChange={(e) => {
                            const time = e.target.value;
                            setDuration(time);
                            const hour = parseInt(time / 60).toString();
                            const min = parseInt(time % 60).toString();
                            if (min == 0) {
                              setDurationInput(hour + ":00");
                            }
                            else if (min.length == 1) {
                              setDurationInput(hour + ':0' + min);
                            }
                            else {
                              setDurationInput(hour + ':' + min);
                            }
                          }}
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
                          <CCol xs="4">
                            <CButton
                              type="submit"
                              color="primary"
                              className="mr-1"
                              disabled={isSubmitting || !isValid}
                            >
                              {isSubmitting ? "Adding..." : "Add Task"}
                            </CButton>

                          </CCol>
                          {/* <CCol xs="4" className="flex-d justify-center">
                            <CButton
                              type="submit"
                              color="primary"
                              className="mr-1"
                              disabled={isSubmitting || !isValid}
                            >
                              {isSubmitting ? "Adding..." : "Save & Close"}
                            </CButton>
                          </CCol>
                          <CCol xs="4" className="text-right">
                            <CButton color="secondary" className="mr-1" onClick={onClose}>Close</CButton>
                          </CCol> */}
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