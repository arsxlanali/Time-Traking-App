import React, { useState } from 'react'
import { editTask } from 'src/redux/Slice/viewTimeSheetSlice';
import { useLocation } from 'react-router-dom'


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

import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { cibOpenCollective } from '@coreui/icons';

const validationSchema = function (values) {
    return Yup.object().shape({

       
        userId: Yup.string()
            .min(2, `Name has to be at least 2 characters`)
            .required("Name is required"),
        projectId: Yup.string()
            .min(1, `Address has to be at least 1 character`)
            .required("Address is required"),

        name: Yup.string()
            .min(2, `Name has to be at least 2 characters`)
            .required("Name is required"),
        type: Yup.string()
            .min(1, `Address has to be at least 1 character`)
            .required("Address is required"),
        description: Yup.string()
            .min(5, `phone has to be at least 5 characters`)
            .required("phone is required"),
        date: Yup.string()
            .required("Email is required!"),
        duration: Yup.string()
            .required("Email is required!"),

    });
};

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



const findFirstError = (formName, hasError) => {
    const form = document.forms[formName];
    for (let i = 0; i < form.length; i++) {
        if (hasError(form[i].name)) {
            form[i].focus();
            break;
        }
    }
};

const validateForm = (errors) => {
    findFirstError("simpleForm", (fieldName) => {
        return Boolean(errors[fieldName]);
    });
};

const touchAll = (setTouched, errors) => {
    setTouched({
        name: true,
        type: true,
        description: true,
        duration: true,
        userId: true,
        projectId: true,
        duration: true,

    });
    validateForm(errors);
};

const key = localStorage.getItem("key");


const EditTask = (props) => {

    const onSubmit = (values, { setSubmitting, setErrors }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));

            // console.log('User has been successfully saved!', values)
            setSubmitting(false);
        }, 2000);
        const taskInfo = () => values;
        // console.log("props task data:", data);
        // console.log("displaying name", data.name);
        const id = props.id;
        console.log("task id", id);
        console.log("task data", taskInfo);
        dispatch(editTask({ taskInfo, id }));
    };

    const location = useLocation();
    const data = props.preSetData;
    const initialValues = {
        // name: props.preSetData.name,
        // type: props.preSetData.type,
        // description:props.preSetData.description,
        // date:props.preSetData.date,
        // projectId:props.preSetData.projectId,
        // userId: key,
        // _id: props.preSetData._id,
        // duration: props.preSetData.duration

        name: "",
        type: "",
        description: "",
        date: "",
        projectId: "",
        userId: key,
        duration: ""

    };


    const dispatch = useDispatch();

   
    const [large, setLarge] = useState();


    return (

        <CModal show={props.flagForEdit} onClose={() => setLarge(!props.flagForEdit)} size="lg">
            <CModalHeader closeButton>
                <CModalTitle>Edit Task</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CCard>
                    <CCardBody>
                        <Formik
                            initialValues={initialValues}
                            validate={validate(validationSchema)}
                            onSubmit={onSubmit}
                        >
                            {({
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
                                        <CForm
                                            onSubmit={handleSubmit}
                                            noValidate
                                            name="simpleForm"
                                        >   <CFormGroup>
                                                <CLabel htmlFor="userId">User Id</CLabel>
                                                <CInput
                                                    type="text"
                                                    name="userId"
                                                    id="userId"
                                                    placeholder="User Id"
                                                    autoComplete="given-name"
                                                    valid={!errors.userId}
                                                    invalid={touched.userId && !!errors.userId}
                                                    autoFocus={true}
                                                    required
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.userId}
                                                />
                                                <CInvalidFeedback>{errors.userId}</CInvalidFeedback>
                                            </CFormGroup>
                                            <CFormGroup>
                                                <CLabel htmlFor="projectId">Project Id</CLabel>
                                                <CInput
                                                    type="text"
                                                    name="projectId"
                                                    id="projectId"
                                                    placeholder="Project Id"
                                                    autoComplete="given-name"
                                                    valid={!errors.projectId}
                                                    invalid={touched.projectId && !!errors.projectId}
                                                    autoFocus={true}
                                                    required
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.projectId}
                                                />
                                                <CInvalidFeedback>{errors.projectId}</CInvalidFeedback>
                                            </CFormGroup>
                                            <CFormGroup>
                                                <CLabel htmlFor="name">Name</CLabel>
                                                <CInput
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    placeholder="Task Name"
                                                    autoComplete="given-name"
                                                    valid={!errors.name}
                                                    invalid={touched.name && !!errors.name}
                                                    autoFocus={true}
                                                    required
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.name}
                                                />
                                                <CInvalidFeedback>{errors.name}</CInvalidFeedback>
                                            </CFormGroup>
                                            <CFormGroup>
                                                <CLabel htmlFor="type">Type</CLabel>
                                                <CInput
                                                    type="text"
                                                    name="type"
                                                    id="type"
                                                    description
                                                    placeholder="Task Type"
                                                    autoComplete="family-name"
                                                    valid={!errors.type}
                                                    invalid={touched.type && !!errors.type}
                                                    required
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.type}
                                                />
                                                <CInvalidFeedback>{errors.type}</CInvalidFeedback>
                                            </CFormGroup>
                                            <CFormGroup>
                                                <CLabel htmlFor="description">Description</CLabel>
                                                <CInput
                                                    type="text"
                                                    name="description"
                                                    id="description"
                                                    placeholder="Description"
                                                    autoComplete="description-name"
                                                    valid={!errors.description}
                                                    invalid={
                                                        touched.description && !!errors.description
                                                    }
                                                    required
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.description}
                                                />
                                                <CInvalidFeedback>
                                                    {errors.description}
                                                </CInvalidFeedback>
                                            </CFormGroup>
                                            <CFormGroup>
                                                <CLabel htmlFor="duration">Duration</CLabel>
                                                <CInput
                                                    type="text"
                                                    name="duration"
                                                    id="duration"
                                                    placeholder="Duration"
                                                    autoComplete="duration-name"
                                                    valid={!errors.duration}
                                                    invalid={
                                                        touched.duration && !!errors.duration
                                                    }
                                                    required
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.duration}
                                                />
                                                <CInvalidFeedback>
                                                    {errors.description}
                                                </CInvalidFeedback>
                                            </CFormGroup>

                                            <CFormGroup>
                                                <CLabel htmlFor="date">Date</CLabel>
                                                <CInput
                                                    type="text"
                                                    name="date"
                                                    id="date"
                                                    placeholder="Date"
                                                    autoComplete="date-name"
                                                    valid={!errors.date}
                                                    invalid={touched.date && !!errors.date}
                                                    required
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.date}
                                                />
                                                <CInvalidFeedback>{errors.date}</CInvalidFeedback>
                                            </CFormGroup>

                                            <CFormGroup>
                                                <CButton
                                                    type="submit"
                                                    color="primary"
                                                    className="mr-1"
                                                    disabled={isSubmitting || !isValid}
                                                >
                                                    {isSubmitting ? "Wait..." : "Edit"}
                                                </CButton>
                                            </CFormGroup>
                                        </CForm>
                                    </CCol>
                                </CRow>
                            )}
                        </Formik>
                    </CCardBody>
                </CCard>
            </CModalBody>
            <CModalFooter>
                <CButton color="primary" onClick={() => setLarge(!large)}>
                    Add
                </CButton>{" "}
                <CButton color="secondary" onClick={() => setLarge(!large)}>
                    Cancel
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

export default EditTask;