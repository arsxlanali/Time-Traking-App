import React, { useState } from 'react'
import {
  CForm,
  CInvalidFeedback,
  CFormGroup,
  CLabel,
  CInput,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow
} from '@coreui/react'
import { DocsLink } from 'src/reusable'
import { Formik } from 'formik'
import * as Yup from 'yup'

const validationSchema = function (values) {
  return Yup.object().shape({
    taskName: Yup.string()
      .min(2, `Task name has to be at least 2 characters`)
      .required('Task name is required'),
    taskType: Yup.string()
      .min(1, `Task Type has to be at least 1 character`)
      .required('Task Type is required'),
    duration: Yup.string()
      .min(5, `duration has to be at least 5 characters`)
      .required('duration is required'),
    status: Yup.string()
      .required('status is required!'),
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
  taskName: "",
  taskType: "",
  duration: "",
  status: "",

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
    taskName: true,
    taskType: true,
    duration: true,
    status: true,
  })
  validateForm(errors)
}


const Modals = () => {

  const [large, setLarge] = useState(false)


  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardBody>
            <CButton onClick={() => setLarge(!large)} className="mr-1">
              Launch large modal
            </CButton>



            <CModal
              show={large}
              onClose={() => setLarge(!large)}
              size="md"
            >
              <CModalHeader closeButton>
                <CModalTitle>Add Task</CModalTitle>
              </CModalHeader>
              {/* <CModalBody> */}
              {/* 
              <CCard>
                <CCardBody> */}
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

                    <CRow className={"mx-3 my-3"}>
                      <CCol lg="12">
                        <CForm onSubmit={handleSubmit} noValidate name='simpleForm'>
                          <CFormGroup>
                            <CLabel htmlFor="taskName">Task Name</CLabel>
                            <CInput type="text"
                              name="taskName"
                              id="taskName"
                              placeholder="Task Name"
                              autoComplete="given-name"
                              valid={!errors.taskName}
                              invalid={touched.taskName && !!errors.taskName}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.taskName} />
                            <CInvalidFeedback>{errors.taskName}</CInvalidFeedback>
                          </CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="taskType">Task Type</CLabel>
                            <CInput type="text"
                              name="taskType"
                              id="taskType"
                              placeholder="Task Type"
                              autoComplete="family-name"
                              valid={!errors.taskType}
                              invalid={touched.taskType && !!errors.taskType}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.taskType} />
                            <CInvalidFeedback>{errors.taskType}</CInvalidFeedback>
                          </CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="duration">Duration</CLabel>
                            <CInput type="text"
                              name="duration"
                              id="duration"
                              placeholder="Duration"
                              autoComplete="duration-name"
                              valid={!errors.duration}
                              invalid={touched.duration && !!errors.duration}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.duration} />
                            <CInvalidFeedback>{errors.duration}</CInvalidFeedback>
                          </CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="status">Status</CLabel>
                            <CInput type="status"
                              name="status"
                              id="status"
                              placeholder="Status"
                              autoComplete="status-name"
                              valid={!errors.status}
                              invalid={touched.status && !!errors.status}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.status} />
                            <CInvalidFeedback>{errors.status}</CInvalidFeedback>
                          </CFormGroup>
                          <hr />
                          <CFormGroup>
                            <div>
                              <CButton type="submit" color="primary" className={"mr-1 float-right padding:4"} disabled={isSubmitting || !isValid}>{isSubmitting ? 'Wait...' : 'Add Task'}</CButton>
                            </div>
                          </CFormGroup>
                        </CForm>
                      </CCol>
                    </CRow>
                  )}
              </Formik>
              {/* </CCardBody>
              </CCard> */}



              {/* </CModalBody> */}
              {/* <CModalFooter>
                <CButton color="primary" onClick={() => setLarge(!large)}>Add</CButton>{' '}
                <CButton color="secondary" onClick={() => setLarge(!large)}>Cancel</CButton>
              </CModalFooter> */}
            </CModal>






          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Modals
