import React, { useState } from "react";
import { viewTimeSheet, deleteTask } from "src/redux/Slice/viewTimeSheetSlice";
import AddTask from "../addTask/AddTask";
import EditTask from "../editTask/editTask";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import 'spinkit/spinkit.min.css'
import Spinners from "../../Loader/Spinners";
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

};

const onSubmit = (values, { setSubmitting, setErrors }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    console.log('User has been successfully saved!', values)
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
  })
  validateForm(errors)
}


const DemoTable = () => {




  const [details, setDetails] = useState([]);
  const [items, setItems] = useState(usersData)
  const [date, setDate] = React.useState({ startDate: null, endDate: null });
  const [focused, setFocused] = React.useState();
  const [large, setLarge] = useState(false);
  const [largeForEditTask, setLargeForEditTask] = useState(false);
  const history=useHistory();
  const id = localStorage.getItem('key');
  const dispatch = useDispatch();
  const { timeSheet, loading } = useSelector((state) => state.viewTimeSheet);
  //console.log(timeSheet);
  const [preSetData,setPreSetData]=useState();
  useEffect(() => {
    dispatch(viewTimeSheet(id))

  }, [])

  if (loading) return <Spinners />;


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
   
    { key: "userId", _style: { width: "20%" } },
    
    { key: "projectId", _style: { width: "20%" } },
    
    { key: "_id", _style: { width: "20%" } },
    
    { key: "name", _style: { width: "20%" } },
    
    { key: "description", _style: { width: "40%" } },
    { key: "duration", _style: { width: "10%" } },
    { key: "date", _style: { width: "20%" } },
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
        <CButton onClick={()=>setLarge(true)}

          color="primary"
          size="sm"
          className={"float-right"}
        >
          Add Task
        </CButton>
      </div>


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
          //columnFilter
          //tableFilter
          //cleaner
          //itemsPerPageSelect
          //itemsPerPage={5}
          hover
          sorter
          pagination
          // loading
          onRowClick={(item, index, col, e) => console.log(item, index, col, e)}
          onPageChange={(val) => console.log('new page:', val)}
          onPagesChange={(val) => console.log('new pages:', val)}
          onPaginationChange={(val) => console.log('new pagination:', val)}
          onFilteredItemsChange={(val) => console.log('new filtered items:', val)}
          onSorterValueChange={(val) => console.log('new sorter value:', val)}
          onTableFilterChange={(val) => console.log('new table filter:', val)}
          onColumnFilterChange={(val) => console.log('new column filter:', val)}
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
                    {details.includes(item._id) ? "Hide" : "Action"}
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
                    {details.includes(item._id) ? "Hide" : "Action"}
                  </CButton>
                </td>
              );
            },
            details: (item) => {
              return (
                <CCollapse show={details.includes(item._id)}>
                  <CCardBody>
                    <h4>{item.username}</h4>
               
                    <CButton size="sm" color="info"  onClick={()=>{
                      setLargeForEditTask(true);
                      // setPreSetData(item);
                    }} >
                      Edit
                    </CButton>
                    <CButton size="sm" color="danger" className="ml-1" onClick={() => dispatch(deleteTask(item._id))}>
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
        <CButton color="primary" className={"float-right mr-4"} >
          End My Day
        </CButton>
        <AddTask flag={large} />
        {/* <EditTask flagForEdit={largeForEditTask} preSetData={preSetData}/> */}
        <EditTask flagForEdit={largeForEditTask} />
      </div>
    </>
  );
};

export default DemoTable;
