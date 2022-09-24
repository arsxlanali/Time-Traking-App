import Loader from "../../loader/Loader";
import React, { useState } from "react";
import { viewTimeSheet, deleteTask, submitTasks, checkSubmit, checkPending } from "src/redux/Slice/viewTimeSheetSlice";
import AddTask from "../addTask/AddTask";
import EditTask from "../editTask/EditTask";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import 'spinkit/spinkit.min.css'
import {
  CCardBody,
  CButton,
  CDataTable,
  CRow,
  CCol,
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
  const [model, setModel] = useState(false);
  const [model1, setModel1] = useState(false);
  const UserId = localStorage.getItem('key');
  const dispatch = useDispatch();
  const { timeSheet, loading, submitted, pending } = useSelector((state) => state.viewTimeSheet);
  const { projects } = useSelector((state) => state.viewProjects);
  const [taskId, setTaskId] = useState(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [submit, setSubmit] = useState(false)
  const [focused, setFocused] = useState();
  const [date1, setDate1] = useState({ date: moment() });
  const [disable, setDisable] = useState(false);
  var today = dateGetter(new Date(), 0);
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

  useEffect(() => {
    if (finalData.length == 0) {
      setDisable(true);
    }
    else {
      setDisable(false);
    }
    dispatch(checkSubmit({ UserId, date }));
    dispatch(viewTimeSheet({ UserId, date }));
    dispatch(checkPending({ UserId }))
  }, [dispatch, date, submit, finalData.length])
  const fields = [
    { key: "type", _style: { width: "17%" } },
    { key: "description", _style: { width: "35%" } },
    { key: "project", _style: { width: "20%" } },
    { key: "duration", _style: { width: "10%" } },
    {
      key: "Actions",
      filter: false,
    },
  ];
  if (submitted) {
    fields.pop();
  }

  const handleChange = event => {
    const date = dateGetter(event._d, 0);
    setDate(date);
    dispatch(viewTimeSheet({ UserId, date }));
  };
  var count = -1;
  return (
    <>

      <AddTask flag={model} onClose={() => setModel(!model)} date={date} />
      {taskId && <EditTask flag={model1} onClose={() => {
        setModel1(!model1)
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
              count = -1;
            }
            }
            onPrevMonthClick={(e) => {
              count = -1;
            }}
            isDayHighlighted={(e) => {
              const date = dateGetter(e._d, 0);
              const today = dateGetter(new Date(), 0);
              const previous30 = dateGetter(new Date(new Date().setDate(new Date().getDate() - 30)), 0)
              if (count == 30)
                count = -1;
              if (previous30 <= date && today >= date) {
                console.log("This is count", count);
                count++;
                return pending[count]?.isSubmit
              }
              else {
                return false;
              }
            }}
            focused={focused} // PropTypes.bool
            onFocusChange={() => setFocused(true)} // PropTypes.func.isRequired
            isOutsideRange={(e) => {
              var today = dateGetter(new Date(), 0);
              var date = dateGetter(e._d, 0)
              var previous30 = dateGetter(new Date(new Date().setDate(new Date().getDate() - 30)), 0)
              return date > today || previous30 >= date;
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
                            setModel1(true)
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
          disabled={disable}
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
