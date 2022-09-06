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
import { useDispatch } from 'react-redux'

const validationSchema = function (values) {
  return Yup.object().shape({
    name: Yup.string()
      .min(2, `Project name has to be at least 2 characters`)
      .required('Project name is required'),

    description: Yup.string()
      .min(5, `Description has to be at least 5 characters`)
      .required('Description is required'),
    assignBy: Yup.string()
      .required('Assignment is required!'),
    assignTo: Yup.string()
      .required('Assignment is required!'),
    startDate: Yup.string()
      .required('Assignment is required!'),
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


const onSubmit = (values, { setSubmitting, setErrors }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2))
    // console.log('User has been successfully saved!', values)
    setSubmitting(false)
  }, 2000)
}

const findFirstError = (formName, hasError) => {
  const form = document.forms[formName]
  for (let i = 0; i < form.length; i++) {
    if (hasError(form[i].name)) {
      form[i].focus()
      break
    }
  }
}

const validateForm = (errors) => {
  findFirstError('simpleForm', (fieldName) => {
    return Boolean(errors[fieldName])
  })
}


const ValidationForms = () => {


  const dispatch = useDispatch();
  const location = useLocation();

  const initialValues = {
    name: location.state.name,
    description: location.state.description,
    assignBy: location.state.assignBy,
    assignTo: location.state.assignTo,
    startDate: location.state.startDate,

  }

  const [id, setId] = useState(location.state._id);

  const onSubmit = (values, { setSubmitting, setErrors }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2))
      // console.log('User has been successfully saved!', values)
      setSubmitting(false)
    }, 2000)

    const data = () => values;
    console.log("state data", location.state);
    dispatch(editProject({ data, id }));

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
                          <CLabel htmlFor="assignBy">Assign By</CLabel>
                          <CInput type="assignBy"
                            name="assignBy"
                            id="assignBy"
                            placeholder="Name"
                            autoComplete="assignBy"
                            valid={!errors.assignBy}
                            invalid={touched.assignBy && !!errors.assignBy}
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.assignBy} />
                          <CInvalidFeedback>{errors.assigntBy}</CInvalidFeedback>
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="assignTo">Assign To</CLabel>
                          <CInput type="assignTo"
                            name="assignTo"
                            id="assignTo"
                            placeholder="Employee Name"
                            autoComplete="assignTo"
                            valid={!errors.assignto}
                            invalid={touched.assignto && !!errors.assignto}
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.assignto} />
                          <CInvalidFeedback>{errors.assignto}</CInvalidFeedback>
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="startDate">Start Date</CLabel>
                          <CInput type="startDate"
                            name="startDate"
                            id="startDate"
                            placeholder="Date"
                            autoComplete="startDate"
                            valid={!errors.startDate}
                            invalid={touched.startDate && !!errors.startDate}
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.startDate} />
                          <CInvalidFeedback>{errors.startDate}</CInvalidFeedback>
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
