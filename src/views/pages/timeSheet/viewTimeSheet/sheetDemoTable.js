import Loader from "../../loader/Loader";
import React, { useState } from "react";
import { viewTimeSheet, deleteTask } from "src/redux/Slice/viewTimeSheetSlice";
import AddTask from "../addTask/AddTask";
import EditTask from "../editTask/editTask";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import 'spinkit/spinkit.min.css'
import Spinners from "../../loader/Loader";
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
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  // CDatePicker

} from "@coreui/react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
// import { set } from "core-js/core/dict";




const DemoTable = () => {
  const [details, setDetails] = useState([]);
  const [model, setModel] = useState(false);
  const [largeForEditTask, setLargeForEditTask] = useState(false);
  const UserId = localStorage.getItem('key');
  const dispatch = useDispatch();
  const { timeSheet, loading } = useSelector((state) => state.viewTimeSheet);
  const [taskId, setTaskId] = useState(undefined);

  // console.log("taskkkkkkkk", taskId)
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  const [date, setDate] = useState(today)

  const newArray = timeSheet.map((sheet) => {
    return {
      ...sheet, duration: `${sheet?.duration?.hours}:${sheet?.duration?.minutes} mins`, totalMins: sheet?.duration?.hours * 60 + sheet?.duration?.minutes
    }
  })
  useEffect(() => {
    dispatch(viewTimeSheet({ UserId, date }));
  }, [])

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
    { key: "type", _style: { width: "20%" } },
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
  const handleChange = event => {
    // setMessage(event.target.value);
    const date = event.target.value;
    setDate(event.target.value);
    dispatch(viewTimeSheet({ UserId, date }));
    // console.log('value is:fjd', event.target.value);
  };
  // timeSheet.forEach((sheet) => { console.log("This is sheet", sheet.description) })
  return (
    <>
      <AddTask flag={model} onClose={() => setModel(!model)} date={date} />
      {taskId && <EditTask flag={model} onClose={() => {
        setModel(!model)
          ; setTaskId(undefined);
      }} date={date} task={taskId} />}
      <div className="mb-2 my-2 mr-4">
        <CButton onClick={() => setModel(true)}
          color="primary"
          className={"float-right my-3"}
        >
          Add Task
        </CButton>
      </div>
      <CCol xs="12" md="3">
        <CInput type="date" name="date-input" placeholder="date"
          value={date}
          onChange={handleChange} />
      </CCol>

      <CCardBody>
        {
          loading ? (
            <Loader />
          ) : (
            <CDataTable
              items={newArray}
              fields={fields}
              columnFilter
              hover
              sorter
              pagination
              scopedSlots={{
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
                        {details.includes(item._id) ? "Action" : "Action"}
                      </CButton>
                    </td>
                  );
                },
                details: (item) => {
                  return (
                    <CCollapse show={details.includes(item._id)}>
                      <CCardBody>
                        <h4>{item.username}</h4>

                        <CButton size="sm" color="info" onClick={() => {
                          setModel(true)
                          setTaskId(item)

                        }} >
                          Edit
                        </CButton>
                        <CButton size="sm" color="danger" className="ml-1" onClick={() => dispatch(deleteTask(item))

                        }>
                          Delete
                        </CButton>


                      </CCardBody>
                    </CCollapse>
                  );
                },
              }}

            />
          )}
      </CCardBody>
      <div className="mb-4">
        <CButton color="primary" className={"float-right mr-4"} >
          End My Day
        </CButton>
      </div>
    </>
  );
};

export default DemoTable;
