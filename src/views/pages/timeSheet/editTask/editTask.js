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


const EditTask = ({ flag, onClose, date, task }) => {
  const dispatch = useDispatch();
  const [duration, setDuration] = useState(task.totalMins);
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
      // setProjectValue()
      projectValue1.value = project.value;
      projectValue1.label = project.label;
    }
  })
  var [projectValue, setProjectValue] = React.useState(projectValue1);

  // console.log("this is set valye,", projectValue);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  // console.log("This is be", task._id);
  const onSubmit1 = (values) => {
    const data = {
      ...values, date, projectId: projectValue.value,
      duration: { hours: parseInt(duration / 60), minutes: parseInt(duration % 60) }
    };
    const UserId = task._id;
    // console.log("this is id data", data, UserId)
    dispatch(editTask({ data, UserId }));
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
                <CRow >
                  <CCol>
                    <CForm onSubmit={handleSubmit} noValidate name='simpleForm4'>
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
                        // onClick={
                        //   onClose

                        // }
                        >Add Project</CButton>
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