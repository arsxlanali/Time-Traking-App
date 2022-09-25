import React from 'react'
import { addProject } from 'src/redux/Slice/projectSlice'
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
  CCardHeader,
} from '@coreui/react'
import { useSelector } from "react-redux";
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { getEmployees } from 'src/redux/Slice/employeesSlice';
import Select from "react-select";
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
const validationSchema = function (values) {
  return Yup.object().shape({
    name: Yup.string()
      .min(2, `Project name has to be at least 2 characters`)
      .required('Project name is required'),

    description: Yup.string()
      .min(5, `Description has to be at least 5 characters`)
      .required('Description is required'),
    // assignTo: Yup.array(),
  })
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

const initialValues = {
  name: "",
  description: "",
  assignTo: [],

}

const ValidationForms = () => {

  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state?.slideBar?.darkMode);
  const history = useHistory();
  const [value, setValue] = React.useState([]);
  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;

  const allEmployees = useSelector((state) => state?.employees?.employeesView);
  const employees = allEmployees.filter(emp => emp['role'] == 'EMPLOYEE');
  const empOptions = [];
  employees.forEach(emp => {
    const result = (({ _id, name }) => ({ _id, name }))(emp)
    empOptions.push({ "value": result._id, "label": result.name });
  })
  const onSubmit = (initialValues, { setSubmitting }) => {
    const arry = [];
    value.forEach(val => {
      arry.push(val.value);
    })
    const data = { ...initialValues, assignTo: arry, startDate: today }
    dispatch(addProject({ data, history, setSubmitting }));
  }
  return (
    <CRow className={"d-flex justify-content-center"}>
      <CCol lg={8}>
        <CCard >
          <CCardHeader>Add Project</CCardHeader>

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

                }) => (
                  <CRow >
                    <CCol>
                      <CForm onSubmit={handleSubmit} noValidate name='simpleForm'>
                        <CFormGroup>
                          <CLabel htmlFor="name">Project Name</CLabel>
                          <CInput type="text"
                            name="name"
                            id="name"
                            placeholder="Project Name"
                            autoComplete="off"
                            valid={!errors.name}
                            invalid={touched.name && !!errors.name}
                            autoFocus={true}
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{ borderColor: '#d8dbe0' }}

                            value={values.name} />
                          <CInvalidFeedback>{errors.name}</CInvalidFeedback>
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
                            onBlur={handleBlur}
                            style={{ borderColor: '#d8dbe0' }}

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
                            required
                            invalid={touched.assignTo}
                            onBlur={handleBlur}
                            theme={(theme) => ({
                              ...theme,
                              colors: {
                                ...theme.colors,
                                primary: darkMode ? "rgba(255, 255, 255, 0.87)" : theme.colors.primary,
                                primary25: darkMode ? "rgba(255, 255, 255, 0.20)" : theme.colors.primary25,
                                primary75: darkMode ? "rgba(255, 255, 0, 0.20)" : theme.colors.primary75,
                                dangerLight: darkMode ? "#484c54" : theme.colors.dangerLight,
                                neutral0: darkMode ? "#30343c" : theme.colors.neutral0,
                                neutral30: darkMode ? "green" : theme.colors.neutral30, //hover
                                neutral10: darkMode ? "gray" : theme.colors.neutral10,// selected boxes
                                neutral80: darkMode ? "white" : theme.colors.neutral80, //boxt text
                              },
                            })}
                          />
                          <CInvalidFeedback>{errors.assignTo}</CInvalidFeedback>
                        </CFormGroup>
                        <CFormGroup>
                          <CButton type="submit" color="primary" className="mr-1 " disabled={isSubmitting || !isValid}>{isSubmitting ? 'Wait...' : 'Add Project'}</CButton>
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
