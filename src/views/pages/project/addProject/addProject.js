import React from 'react'
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
  CRow
} from '@coreui/react'

import { Formik } from 'formik'
import * as Yup from 'yup'

const validationSchema = function (values) {
  return Yup.object().shape({
    projectName: Yup.string()
    .min(2, `Project name has to be at least 2 characters`)
    .required('Project name is required'),
    projectType: Yup.string()
    .min(1, `Project Type has to be at least 1 character`)
    .required('Project Type is required'),
    description: Yup.string()
    .min(5, `Description has to be at least 5 characters`)
    .required('Description is required'),
    duration: Yup.string()
    .required('Duration is required!'),
    assignTo: Yup.string()
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

const initialValues = {
  projectName: "",
  projectType: "",
  description: "",
  duration: "",
  assignTo:"",
  
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


const ValidationForms = () =>  {
  return (
    // <CCard>
    //   <CCardBody>
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
              <CRow>
                <CCol lg="6">
                  <CForm onSubmit={handleSubmit} noValidate name='simpleForm'>
                    <CFormGroup>
                      <CLabel htmlFor="projectName">Project Name</CLabel>
                      <CInput type="text"
                              name="projectName"
                              id="projectName"
                              placeholder="Project Name"
                              autoComplete="given-name"
                              valid={!errors.projectName}
                              invalid={touched.projectName && !!errors.projectName}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.projectName} />
                      <CInvalidFeedback>{errors.projectName}</CInvalidFeedback>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="projectType">Project Type</CLabel>
                      <CInput type="text"
                              name="projectType"
                              id="projectType"
                              placeholder="Project Type"
                              autoComplete="family-name"
                              valid={!errors.projectType}
                              invalid={touched.projectType && !!errors.projectType}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.projectType} />
                      <CInvalidFeedback>{errors.projectType}</CInvalidFeedback>
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
                      <CLabel htmlFor="duration">Duration</CLabel>
                      <CInput type="duration"
                              name="duration"
                              id="duration"
                              placeholder="Duration"
                              autoComplete="duration"
                              valid={!errors.duration}
                              invalid={touched.duration && !!errors.duration}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.duration} />
                      <CInvalidFeedback>{errors.duration}</CInvalidFeedback>
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
                      <CButton type="submit" color="primary" className="mr-1" disabled={isSubmitting || !isValid}>{isSubmitting ? 'Wait...' : 'Add Project'}</CButton>
                    </CFormGroup>
                  </CForm>
                </CCol>
              </CRow>
            )}
        </Formik>
    //   </CCardBody>
    // </CCard>
  )
}

export default ValidationForms
