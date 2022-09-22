import React, { useState } from 'react'
import { editTask } from 'src/redux/Slice/viewTimeSheetSlice';
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
import states from 'src/views/forms/advanced-forms/states';
import Select from "react-select";
import { useEffect } from 'react';
import { getProjects } from 'src/redux/Slice/projectSlice';
import tasks from '../Tasks/Tasks'
import { string } from 'prop-types';
const validationSchema = function (values) {
  return Yup.object().shape({
    // type: Yup.string()
    //   .min(2, `Project name has to be at least 2 characters`)
    //   .required('Project name is required'),

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


const EditTask = ({ flag, onClose, date, task }) => {
  const department = localStorage.getItem("Department");
  const dispatch = useDispatch();
  const [duration, setDuration] = useState(task.totalMins);
  const inputH = parseInt(task.totalMins / 60);
  const inputM = parseInt(task.totalMins % 60);
  // console.log("input d", inputH, inputM)
  const [taskField, setTaskFiled] = React.useState(
    [{ value: task.type, label: task.type }]
  )
  const [durationInput, setDurationInput] = useState(inputH + ':' + inputM);
  const darkMode = useSelector((state) => state?.slideBar?.darkMode);
  // console.log("this is stask", task);
  const empProject = useSelector((state) => state?.viewProjects?.projects);
  // console.log("this is projecccts", projectValue)
  // const timeSheet = useSelector((state) => state?.viewTimeSheet?.timeSheet);
  const projectOptions = [];
  empProject.forEach(emp => {
    const result = (({ _id, name }) => ({ _id, name }))(emp)
    projectOptions.push({ "value": result._id, "label": result.name });
  })
  const projectValue1 = {};
  projectOptions.forEach((project) => {
    if (project.value == task.projectId) {
      projectValue1.value = project.value;
      projectValue1.label = project.label;
    }
  })
  var [projectValue, setProjectValue] = React.useState(projectValue1);
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch])
  // useEffect(() => {
  //   const timeI = durationInput;
  //   if (typeof timeI == 'string') {
  //     const hour = parseInt(timeI.slice(0, 1));
  //     const min = parseInt(timeI.slice(2, 4))
  //     // setDuration(hour * 60 + min);
  //     console.log('thisi si time', typeof timeI, timeI)
  //   }
  //   const time = duration;
  //   if (time !== undefined) {
  //     const hour = parseInt(time / 60);
  //     const min = parseInt(time % 60);
  //     setDurationInput(hour + ':' + min);
  //   }
  // }, [durationInput, duration]);
  const onSubmit1 = (values, { setSubmitting }) => {
    const data = {
      ...values, date, projectId: projectValue.value, type: taskField.value,
      duration: { hours: parseInt(duration / 60), minutes: parseInt(duration % 60) }
    };
    const id = task._id;
    dispatch(editTask({ data, id, setSubmitting, onClose }));
  }
  const initialValues = {
    type: task.type,
    description: task.description,
    projectId: task.projectId,
  };
  const handleFocus = (event) => event.target.select();
  return (

    <CModal show={flag} onClose={onClose} size="lg">
      <CModalHeader closeButton>
        <CModalTitle>Edit Task</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCardBody>
          <Formik
            initialValues={initialValues}
            validate={validate(validationSchema)}
            onSubmit={onSubmit1}
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
              }) => (

                < CRow >
                  <CCol>
                    <CForm onSubmit={handleSubmit} noValidate name='simpleForm4'>
                      <CFormGroup>
                        <CLabel htmlFor="type">Task Type</CLabel>
                        <Select
                          as="select"
                          type="type"
                          name="type"
                          id="type"
                          // placeholder="Project Name"
                          value={taskField}
                          options={tasks[department]}
                          onChange={setTaskFiled}
                          // invalid={touched.type}
                          // onBlur={handleBlur}
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
                        {/* <CInvalidFeedback>{errors.type}</CInvalidFeedback> */}
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="description">Description</CLabel>
                        <CInput type="text"
                          name="description"
                          id="description"
                          placeholder="Description"
                          autoComplete="off"
                          valid={!errors.description}
                          invalid={touched.description && !!errors.description}
                          required
                          onChange={handleChange}
                          onFocus={handleFocus}
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
                          value={projectValue}
                          options={projectOptions}
                          onChange={setProjectValue}
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
                            onFocus={handleFocus}
                            onChange={(e) => {
                              if (e.target.value.length <= 4) {
                                const timeI = e.target.value;
                                setDurationInput(e.target.value);
                                const hour = parseInt(timeI.slice(0, 1));
                                const min = parseInt(timeI.slice(2, 4))
                                if (hour > 2) {
                                  setDuration(2 * 60);
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
                        <CButton type="submit" color="primary" className="mr-1"
                          // onClick={() => console.log("isSubmmmitng", isSubmitting)}
                          disabled={isSubmitting || !isValid}
                        >{isSubmitting ? "Wait..." : "Update"}</CButton>
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

export default EditTask;