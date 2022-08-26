import React, { useState } from "react";
import {
  CCardBody,
  CBadge,
  CButton,
  CCollapse,
  CDataTable,
} from "@coreui/react";
import usersData from "./Data/UsersData";

const DemoTable = () => {
  const [details, setDetails] = useState([]);
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
    { key: "name", _style: { width: "40%" } },
    "desingnation",
    { key: "role", _style: { width: "20%" } },
    { key: "email", _style: { width: "20%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      filter: false,
    },
  ];
  return (
    <CCardBody>
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
        // loading
        // onRowClick={(item,index,col,e) => console.log(item,index,col,e)}
        // onPageChange={(val) => console.log('new page:', val)}
        // onPagesChange={(val) => console.log('new pages:', val)}
        // onPaginationChange={(val) => console.log('new pagination:', val)}
        // onFilteredItemsChange={(val) => console.log('new filtered items:', val)}
        // onSorterValueChange={(val) => console.log('new sorter value:', val)}
        // onTableFilterChange={(val) => console.log('new table filter:', val)}
        // onColumnFilterChange={(val) => console.log('new column filter:', val)}
        scopedSlots={{
          email: (item) => (
            <td>
              <CBadge>{item.email}</CBadge>
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
                  {details.includes(item.id) ? "Hide" : "Show"}
                </CButton>
              </td>
            );
          },
          details: (item) => {
            return (
              <CCollapse show={details.includes(item.id)}>
                <CCardBody>
                  <h4>{item.username}</h4>
                  {/* <p className="text-muted">User since: {item.desingnation}</p> */}
                  <CButton size="sm" color="info">
                    User Settings
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
  );
};

export default DemoTable;
