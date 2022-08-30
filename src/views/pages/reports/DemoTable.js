import React, { useState } from "react";
import {
  CCardBody,
  CBadge,
  CButton,
  CCollapse,
  CDataTable,
  //  CRow,
  //  CCol,
  //  CCard,
  //  CCardHeader,
} from "@coreui/react";
import usersData from "./Data/UsersData";
import usersData2 from "./Data/UsersData2";
//import { TextMask, InputAdapter } from "react-text-mask-hoc";

// React DateRangePicker
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
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
const fields2 = ["taskName", "role", "date", "status"];
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
                  <h4>{item.projectName}</h4>
                  <CDataTable
                    items={usersData2}
                    fields={fields2}
                    size="sm"
                    itemsPerPage={5}
                    pagination
                    scopedSlots={{
                      status: (item) => (
                        <td>
                          <CBadge color={getBadge(item.status)}>
                            {item.status}
                          </CBadge>
                        </td>
                      ),
                    }}
                  />
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
