import Loader from "../../loader/Loader";
import React, { useState } from "react";
import { viewTimeSheet, deleteTask, submitTasks, checkSubmit } from "src/redux/Slice/viewTimeSheetSlice";
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




const SheetTable = () => {
  const [details, setDetails] = useState([]);
  const [model, setModel] = useState(false);
  // const [largeForEditTask, setLargeForEditTask] = useState(false);
  const UserId = localStorage.getItem('key');
  const dispatch = useDispatch();
  const { timeSheet, loading, submitted } = useSelector((state) => state.viewTimeSheet);
  const [taskId, setTaskId] = useState(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [submit, setSubmit] = useState(false)
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
  // const token = localStorage.getItem("Token");
  useEffect(() => {
    dispatch(checkSubmit({ UserId, date }));
    dispatch(viewTimeSheet({ UserId, date }));
  }, [dispatch, date, submit])

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
    { key: "type", _style: { width: "15%" } },
    { key: "description", _style: { width: "40%" } },
    { key: "duration", _style: { width: "10%" } },
    // { key: "date", _style: { width: "20%" } },
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

      <CRow className={"d-flex justify-content-between mt-4 mx-2"}>
        <CCol xs="12" md="4">
          <CInput type="date" name="date-input" placeholder="date"
            value={date}
            onChange={handleChange}
            max={date}
          // onFocus={(e) => e.showPicker()}
          />
        </CCol>
        {/* <input type="date" onfocus={showPicker}></input> */}
        <CCol>
          <CButton onClick={() => setModel(true)}
            color="primary"
            hidden={submitted}
            className={"float-right"}
          >
            Add Task
          </CButton>
        </CCol>

      </CRow>
      {/* <CCol>

      </CCol> */}

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

                        <CButton size="sm" color="info"
                          hidden={submitted}
                          onClick={() => {
                            setModel(true)
                            setTaskId(item)

                          }} >
                          Edit
                        </CButton>
                        <CButton size="sm" color="danger" className="ml-2"
                          hidden={submitted}
                          onClick={() => {
                            setSubmitting(true)
                            // console.log("this is item", item)
                            const id = item._id;
                            const date = item.date;
                            dispatch(deleteTask({ id, date, setSubmitting }));

                          }}>
                          {submitting ? "Wait..." : "Delete"}
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
        <CButton color="primary" className={"float-right mr-4"}
          hidden={submitted}
          onClick={() => {
            setSubmit(true);
            dispatch(submitTasks({ date, setSubmit }))
            dispatch(checkSubmit({ UserId, date }));
            // dispatch(viewTimeSheet({ UserId, date }));
          }
          }
        >
          {submit ? "Waiting..." : "End My Day"}
        </CButton>
      </div>
    </>
  );
};

export default SheetTable;
