import React from 'react'
import { editProject } from 'src/redux/Slice/projectSlice'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CInvalidFeedback,
  CFormGroup,
  CLabel,
  CInput,
  CRow,
  CCardHeader
} from '@coreui/react'

import { Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import Select from "react-select";
import { useEffect } from 'react'
import { getEmployees } from 'src/redux/Slice/employeesSlice'
const validationSchema = function (values) {
  return Yup.object().shape({
    name: Yup.string()
      .min(2, `Project name has to be at least 2 characters`)
      .required('Project name is required'),

    description: Yup.string()
      .min(5, `Description has to be at least 5 characters`)
      .required('Description is required'),
    // assignBy: Yup.string()
    //   .required('Assignment is required!'),
    // assignTo: Yup.string()
    //   .required('Assignment is required!'),
  }
  )
}

const validate = (getValidationSchema) => {
  return (values) => {
    const validationSchema = getValidationSchema(values)
    try {
      validationSchema.validateSync(values, { abortEarly: false })
      return {}
    } catch (error) {
      return getErrorsFromValidationError(error)
    }
  }
}

const getErrorsFromValidationError = (validationError) => {
  const FIRST_ERROR = 0
  return validationError.inner.reduce((errors, error) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    }
  }, {})
}








const ValidationForms = () => {

  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state?.slideBar?.darkMode);
  const empOptions = [];
  const empAssigned = [];
  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);
  const history = useHistory();
  const location = useLocation();

  const allEmployees = useSelector((state) => state?.employees?.employeesView);
  const employees = allEmployees.filter(emp => emp['role'] == 'EMPLOYEE');
  employees.forEach(emp => {
    const result = (({ _id, name }) => ({ _id, name }))(emp)
    empOptions.push({ "value": result._id, "label": result.name });
  })

  // console.log("this is assigned to", location.state.assignTo)
  const assigned = location.state.assignTo;
  assigned.forEach(emp => {
    const result = (({ _id, name }) => ({ _id, name }))(emp)
    empAssigned.push({ "value": result._id, "label": result.name });
  })

  const [value, setValue] = React.useState(empAssigned);

  // const assignedBy = (({ _id }) => ({ _id }))(location.state.assignBy)
  const assignedBy = [location.state.assignBy._id]

  const initialValues = {
    name: location.state.name,
    description: location.state.description,
    assignBy: assignedBy,
    startDate: location.state.startDate,
  }

  const id = useState(location.state._id);

  const onSubmit = (values, { setSubmitting }) => {
    const selectedEmp = [];
    value.forEach(val => {
      selectedEmp.push(val.value);
    })
    const data = { ...values, assignTo: selectedEmp }
    console.log("this is data", data);


    dispatch(editProject({ data, id, setSubmitting }));

  }


  return (
    <CRow className={"d-flex justify-content-center"}>
      <CCol lg="8">

        <CCard>
          <CCardHeader>Edit Project</CCardHeader>


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
                    <CCol >
                      <CForm onSubmit={handleSubmit} noValidate name='simpleForm'>
                        <CFormGroup>
                          <CLabel htmlFor="name">Project Name</CLabel>
                          <CInput type="text"
                            name="name"
                            id="name"
                            placeholder="Project Name"
                            autoComplete="given-name"
                            valid={!errors.name}
                            invalid={touched.name && !!errors.name}
                            autoFocus={true}
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name} />
                          <CInvalidFeedback>{errors.name}</CInvalidFeedback>
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
                          <CLabel htmlFor="assignTo">Assign To</CLabel>
                          <Select
                            type="assignTo"
                            name="assignTo"
                            id="assignTo"
                            placeholder="Employee Name"
                            value={value}
                            options={empOptions}
                            onChange={setValue}
                            isMulti
                            // required
                            // valid={!errors.assignTo}
                            invalid={touched.assignTo}
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
                          <CInvalidFeedback>{errors.assignTo}</CInvalidFeedback>
                        </CFormGroup>
                        <CFormGroup>
                          <CButton type="submit" color="primary" className="mr-1 " disabled={isSubmitting || !isValid}>{isSubmitting ? 'Wait...' : 'Update'}</CButton>
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
  )
}

export default ValidationForms
