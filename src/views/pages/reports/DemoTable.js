import React, { useState } from "react";
import {
  CCardBody,
  CBadge,
  CButton,
  CCollapse,
  CDataTable,
  CRow,
  CCol,
  CCard,
} from "@coreui/react";
import usersData from "./Data/UsersData";
import { TextMask, InputAdapter } from "react-text-mask-hoc";

// React DateRangePicker
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

const DemoTable = () => {
  const [details, setDetails] = useState([]);
  const [date, setDate] = React.useState({ startDate: null, endDate: null });
  const [focused, setFocused] = React.useState();
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
    { key: "projectName", _style: { width: "20%" } },
    "description",
    { key: "assignedby", _style: { width: "15%" } },
    { key: "doneby", _style: { width: "15%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "10%" },
      filter: false,
    },
  ];
  return (
    <CCardBody>
      <div className="text-right">
        <DateRangePicker
          // className="sm"
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
      <CDataTable
        items={usersData}
        fields={fields}
        columnFilter
        tableFilter
        cleaner
        itemsPerPageSelect
        itemsPerPage={10}
        hover
        sorter
        pagination
        scopedSlots={{
          doneby: (item) => (
            <td>
              <CBadge>{item.doneby}</CBadge>
            </td>
          ),
          show_details: (item) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => {
                    toggleDetails(item.id);
                  }}
                >
                  {details.includes(item.id) ? "Hide Tasks" : "Show Tasks"}
                </CButton>
              </td>
            );
          },
          details: (item) => {
            return (
              <CCollapse show={details.includes(item.id)}>
                <CCardBody>
                  <h4>{item.username}</h4>
                  {/* <p className="text-muted">User since: {item.description}</p> */}
                  {/* <CButton size="sm" color="info">
                    Eidit
                  </CButton>
                  <CButton size="sm" color="danger" className="ml-1">
                    Delete
                  </CButton> */}
                </CCardBody>
              </CCollapse>
            );
          },
        }}
      />
    </CCardBody>
  );
};

export default DemoTable;
