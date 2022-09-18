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
  CButtonGroup,
} from "@coreui/react";
import "react-dates/initialize";

import { SingleDatePicker } from "react-dates";
import moment from 'moment';

function dateGetter(params, dayAhead) {
  var today = params;
  var dd = String(today.getDate() + dayAhead).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  return yyyy + '-' + mm + '-' + dd;
}


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
  const [focused, setFocused] = useState();
  const [date1, setDate1] = useState({ date: moment() });
  // var today = date1.date._d;
  var today = dateGetter(new Date(), 0);
  const [date, setDate] = useState(today)
  // console.log("they this is date", date)

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
  // console.log("this is array", finalData)
  useEffect(() => {
    dispatch(checkSubmit({ UserId, date }));
    dispatch(viewTimeSheet({ UserId, date }));
  }, [dispatch, date, submit])
  const fields = [
    { key: "type", _style: { width: "17%" } },
    { key: "description", _style: { width: "35%" } },
    { key: "project", _style: { width: "20%" } },
    { key: "duration", _style: { width: "10%" } },
    {
      key: "Actions",
      // _style: { float: "right" },
      filter: false,
    },
  ];
  if (submitted) {
    fields.pop();
  }
  const handleChange = event => {
    // setMessage(event.target.value);
    const date = dateGetter(event._d, 0);
    setDate(date);
    dispatch(viewTimeSheet({ UserId, date }));
    // console.log('value is:fjd', event.target.value);
  };
  var count = 0;
  var array1 = [true, true, true, true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, true, true, true, false,
    true, true, true, true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, true, true, true, false,
    true, true, true, true, true, true, true, true, true, true, false,
    true, true, true, true, true, true, true, true, true, true, false,
    true, true, true, true, true, true, true, true, true, true, false,
    true, true, true, true, true, true, true, true, true, true, false,
    true, true, true, true]
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
          <SingleDatePicker
            date={date1.date} // momentPropTypes.momentObj or null
            onDateChange={date1 => {
              setDate1({ date: date1 })
              setFocused(false)
              const date = dateGetter(date1._d, 0);
              setDate(date);
              dispatch(viewTimeSheet({ UserId, date }));
            }}
            keepOpenOnDateSelect
            numberOfMonths={1}
            block={true}
            onNextMonthClick={(e) => {
              count = 0;
            }
            }
            onPrevMonthClick={(e) => {
              count = 0;
            }}
            isDayHighlighted={() => {
              count++;
              return array1[count]
            }}
            focused={focused} // PropTypes.bool
            onFocusChange={() => setFocused(true)} // PropTypes.func.isRequired
            isOutsideRange={(e) => {
              var today = dateGetter(new Date(), 1);
              today = new Date(today);
              var previous = dateGetter(e._d, 0)
              previous = new Date(previous)
              return previous >= today;
            }}
            // withPortal
            displayFormat="Y MMM D"
            showDefaultInputIcon
            inputIconPosition="after"
            small
            hideKeyboardShortcutsPanel
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
              class="table-responsive"
              style={{ verticalAlign: "middle" }}
              scopedSlots={
                {
                  Actions: (item) => {
                    return (
                      <td>
                        <CButton size="sm"
                          color="primary"
                          // variant="outline"
                          shape="square"
                          className="my-2 float-right"
                          hidden={submitted}
                          onClick={() => {
                            setModel(true)
                            setTaskId(item)
                          }} >
                          {'Update'}
                        </CButton>
                        <CButton size="sm"
                          shape="square"
                          color="danger" className="my-2 float-right"
                          hidden={submitted}
                          onClick={() => {
                            setSubmitting(true)
                            const id = item._id;
                            const date = item.date;
                            dispatch(deleteTask({ id, date, setSubmitting }));
                          }}>
                          {submitting ? "Wait..." : "Delete "}
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
