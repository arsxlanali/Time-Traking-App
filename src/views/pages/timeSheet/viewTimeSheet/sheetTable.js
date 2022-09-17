import Loader from "../../loader/Loader";
import React, { useState } from "react";
import { viewTimeSheet, deleteTask, submitTasks, checkSubmit } from "src/redux/Slice/viewTimeSheetSlice";
import AddTask from "../addTask/AddTask";
import EditTask from "../editTask/editTask";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import 'spinkit/spinkit.min.css'
import {
  CCardBody,
  CInput,
  CButton,
  CDataTable,
  CRow,
  CCol,
} from "@coreui/react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";




const SheetTable = () => {
  const [details, setDetails] = useState([]);
  const [model, setModel] = useState(false);
  const UserId = localStorage.getItem('key');
  const dispatch = useDispatch();
  const { timeSheet, loading, submitted } = useSelector((state) => state.viewTimeSheet);
  const { projects } = useSelector((state) => state.viewProjects);
  const [taskId, setTaskId] = useState(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [submit, setSubmit] = useState(false)
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  const [date, setDate] = useState(today)

  const newArray = timeSheet.map((sheet) => {
    return {
      ...sheet, duration: `${sheet?.duration?.hours}:${sheet?.duration?.minutes} mins`, totalMins: sheet?.duration?.hours * 60 + sheet?.duration?.minutes
      , project: projects.map((project) => {
        if (project._id == sheet.projectId) {
          return project.name;
        }
      })
    }
  })
  const finalData = newArray.map((array) => {
    const index = array.project.findIndex((element) => element != undefined)
    const projectName = array.project[index]
    return { ...array, project: projectName }
  })
  console.log("this is array", finalData)
  useEffect(() => {
    dispatch(checkSubmit({ UserId, date }));
    dispatch(viewTimeSheet({ UserId, date }));
  }, [dispatch, date, submit])
  const fields = [
    { key: "type", _style: { width: "10%" } },
    { key: "description", _style: { width: "15%" } },
    { key: "project", _style: { width: "5%" } },
    { key: "duration", _style: { width: "5%" } },
    {
      key: "show_details",
      label: "hehheh",
      _style: { width: "10%" },
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
        <CCol xs="7" md="4">
          <CInput type="date" name="date-input" placeholder="date"
            value={date}
            onChange={handleChange}
            max={date}
          />
        </CCol>
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
      <CCardBody>
        {
          loading ? (
            <Loader />
          ) : (
            <CDataTable
              items={finalData}
              fields={fields}
              columnFilter
              hover
              sorter
              pagination
              scopedSlots={
                {
                  show_details: (item) => {
                    return (
                      <td className="py-2">
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                        >
                          {details.includes(item._id) ? "Action" : "Action"}
                        </CButton>
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
                      </td>
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
