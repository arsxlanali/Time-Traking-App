import React, { useState } from "react";
import { viewTimeSheet } from "src/redux/Slice/viewTimeSheetSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  CCard,
  CCardBody,
  CForm,
  CInvalidFeedback,
  CFormGroup,
  CLabel,
  CInput,
  CBadge,
  CButton,
  CCollapse,
  CDataTable,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CCol,
} from "@coreui/react";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import usersData from "src/views/users/UsersData";

import { Formik } from "formik";
import * as Yup from "yup";
const validationSchema = function (values) {
  return Yup.object().shape({
    taskName: Yup.string()
      .min(2, `Task name has to be at least 2 characters`)
      .required("Task name is required"),
    taskType: Yup.string()
      .min(1, `Task Type has to be at least 1 character`)
      .required("Task Type is required"),
    description: Yup.string()
      .min(5, `description has to be at least 5 characters`)
      .required("description is required"),
    duration: Yup.string()
      .min(5, `duration has to be at least 5 characters`)
      .required("duration is required"),
    status: Yup.string().required("status is required!"),
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

const initialValues = {
  taskName: "",
  taskType: "",
  description: "",
  duration: "",
  status: "",
};

const onSubmit = (values, { setSubmitting, setErrors }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    console.log("User has been successfully saved!", values);
    setSubmitting(false);
  }, 2000);
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
    taskName: true,
    taskType: true,
    description: true,
    duration: true,
    status: true,
  });
  validateForm(errors);
};

const DemoTable = () => {
  const [details, setDetails] = useState([]);
  const [items, setItems] = useState(usersData);
  const [date, setDate] = React.useState({ startDate: null, endDate: null });
  const [focused, setFocused] = React.useState();
  const [large, setLarge] = useState(false);

  const dispatch = useDispatch();
  const { timeSheet, loading } = useSelector((state) => state.viewTimeSheet);
  console.log(timeSheet);
  //if (loading) return <p>Loading...</p>;

  useEffect(() => {
    dispatch(viewTimeSheet());
  }, []);

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const fields = [
    { key: "name", _style: { width: "20%" } },
    "type",
    { key: "description", _style: { width: "40%" } },
    { key: "duration", _style: { width: "20%" } },
    { key: "status", _style: { width: "10%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      filter: false,
    },
  ];

  const getBadge = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "secondary";
      case "Pending":
        return "warning";
      case "Banned":
        return "danger";
      default:
        return "primary";
    }
  };

  return (
    <>
      <div className="mb-2 my-2 mr-4">
        <CButton
          onClick={() => setLarge(!large)}
          color="primary"
          size="sm"
          className={"float-right"}
        >
          Add Task
        </CButton>
      </div>

      <CModal show={large} onClose={() => setLarge(!large)} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>Add Task</CModalTitle>
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
                      >
                        <CFormGroup>
                          <CLabel htmlFor="taskName">Name</CLabel>
                          <CInput
                            type="text"
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
                            value={values.taskName}
                          />
                          <CInvalidFeedback>{errors.taskName}</CInvalidFeedback>
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="taskType">Type</CLabel>
                          <CInput
                            type="text"
                            name="taskType"
                            id="taskType"
                            description
                            placeholder="Task Type"
                            autoComplete="family-name"
                            valid={!errors.taskType}
                            invalid={touched.taskType && !!errors.taskType}
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.taskType}
                          />
                          <CInvalidFeedback>{errors.taskType}</CInvalidFeedback>
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
                            invalid={touched.duration && !!errors.duration}
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.duration}
                          />
                          <CInvalidFeedback>{errors.duration}</CInvalidFeedback>
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="status">Status</CLabel>
                          <CInput
                            type="status"
                            name="status"
                            id="status"
                            placeholder="Status"
                            autoComplete="status-name"
                            valid={!errors.status}
                            invalid={touched.status && !!errors.status}
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.status}
                          />
                          <CInvalidFeedback>{errors.status}</CInvalidFeedback>
                        </CFormGroup>

                        <CFormGroup>
                          <CButton
                            type="submit"
                            color="primary"
                            className="mr-1"
                            disabled={isSubmitting || !isValid}
                          >
                            {isSubmitting ? "Wait..." : "Add Task"}
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

      <div className="text-right mr-4">
        <DateRangePicker
          size="sm"
          startDate={date.startDate}
          startDateId="startDate"
          endDate={date.endDate}
          endDateId="endDate"
          onDatesChange={(value) => setDate(value)}
          focusedInput={focused}
          onFocusChange={(focusedInput) => setFocused(focusedInput)}
          orientation="horizontal"
          openDirection="down"
        />
      </div>

      <CCardBody>
        <CDataTable
          items={timeSheet}
          fields={fields}
          columnFilter
          tableFilter
          cleaner
          itemsPerPageSelect
          itemsPerPage={5}
          hover
          sorter
          pagination
          // loading
          onRowClick={(item, index, col, e) => console.log(item, index, col, e)}
          onPageChange={(val) => console.log("new page:", val)}
          onPagesChange={(val) => console.log("new pages:", val)}
          onPaginationChange={(val) => console.log("new pagination:", val)}
          onFilteredItemsChange={(val) =>
            console.log("new filtered items:", val)
          }
          onSorterValueChange={(val) => console.log("new sorter value:", val)}
          onTableFilterChange={(val) => console.log("new table filter:", val)}
          onColumnFilterChange={(val) => console.log("new column filter:", val)}
          scopedSlots={{
            status: (item) => (
              <td>
                <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
              </td>
            ),
            edit: (item) => {
              return (
                <td className="py-2">
                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => {
                      toggleDetails(item._id);
                    }}
                  >
                    {details.includes(item._id) ? "Hide" : <i class="cil"></i>}
                  </CButton>
                </td>
              );
            },
            show_details: (item) => {
              return (
                <td className="py-2">
                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => {
                      toggleDetails(item._id);
                    }}
                  >
                    {details.includes(item._id) ? "Hide" : "Show"}
                  </CButton>
                </td>
              );
            },
            details: (item) => {
              return (
                <CCollapse show={details.includes(item._id)}>
                  <CCardBody>
                    <h4>{item.username}</h4>
                    <p className="text-muted">User since: {item.registered}</p>
                    <CButton size="sm" color="info">
                      Edit
                    </CButton>
                    <CButton size="sm" color="danger" className="ml-1">
                      Delete
                    </CButton>
                  </CCardBody>
                </CCollapse>
              );
            },
          }}
        />
      </CCardBody>
      <div className="mb-4">
        <CButton color="primary" className={"float-right mr-4"}>
          End My Day
        </CButton>
      </div>
    </>
  );
};

export default DemoTable;
