import React from 'react'
import {
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CCol,
  CForm,
  CInvalidFeedback,
  CInputCheckbox,
  CFormGroup,
  CLabel,
  CInput,
  CRow
} from '@coreui/react'
import { ProBadge, DocsLink } from 'src/reusable'

import { Formik } from 'formik'
import * as Yup from 'yup'

const validationSchema = function (values) {
  return Yup.object().shape({
    projectName: Yup.string()
    .min(2, `First name has to be at least 2 characters`)
    .required('Project name is required'),
    projectType: Yup.string()
    .min(1, `Last name has to be at least 1 character`)
    .required('Project Type is required'),
    description: Yup.string()
    .min(5, `Username has to be at least 5 characters`)
    .required('Description is required'),
    duration: Yup.string()
    .required('Duration is required!'),
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

const touchAll = (setTouched, errors) => {
  setTouched({
    projectName: true,
    projectType: true,
    description: true,
    duration: true,
  })
  validateForm(errors)
}

const ValidationForms = () =>  {
  return (
    <CCard>
      <CCardHeader>
        Form Validation
        <ProBadge/>
        <DocsLink href="https://github.com/jaredpalmer/formik"/>
      </CCardHeader>
      <CCardBody>
        <a 
          href="https://github.com/jaredpalmer/formik" 
          target="_blank" rel="noreferrer noopener"
        >Formik</a> <cite>Build forms in React, without the tears</cite> with 
          
        <a 
          href="https://github.com/jquense/yup" 
          target="_blank" 
          rel="noreferrer noopener"
        >Yup</a> <cite>Dead simple Object schema
        validation</cite>
        <hr />
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
              status,
              dirty,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              isValid,
              handleReset,
              setTouched
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
                      <CLabel htmlFor="assignto">Assign To</CLabel>
                      <CInput type="assignto"
                              name="assignto"
                              id="assignto"
                              placeholder="Employee Name"
                              autoComplete="assignto"
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
                <CCol lg="6">
                  <CCard color={isValid ? 'gradient-info' : 'gradient-secondary'}>
                    <CCardBody>
                      <pre>values: {JSON.stringify(values, null, 2)}</pre>
                      <pre>errors: {JSON.stringify(errors, null, 2)}</pre>
                      <pre>touched: {JSON.stringify(touched, null, 2)}</pre>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            )}
        </Formik>
      </CCardBody>
    </CCard>
  )
}

export default ValidationForms
