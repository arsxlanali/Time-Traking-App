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
    const timeI = durationInput;
    // if (timeI !== undefined) {
    //   const hour = parseInt(timeI.slice(0, 1));
    //   const min = parseInt(timeI.slice(2, 4))
    // }
    const time = duration;
    if (time !== undefined) {
      const hour = parseInt(time / 60);
      const min = parseInt(time % 60);
      setDurationInput(hour + ':' + min);
    }
  }, [dispatch, durationInput, duration]);
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
                        <CInvalidFeedback>{errors.type}</CInvalidFeedback>
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="description1">Description</CLabel>
                        <CInput type="text"
                          name="description1"
                          id="description1"
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
                          value={projectValue}
                          options={projectOptions}
                          onChange={setProjectValue}
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