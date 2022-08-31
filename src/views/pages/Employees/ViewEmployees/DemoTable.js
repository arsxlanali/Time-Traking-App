import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
// import { useEffect } from "react";
import {
  CCardBody,
  CBadge,
  CButton,
  CCollapse,
  CDataTable,
  CPagination,
} from "@coreui/react";
// import usersData from "./Data/UsersData";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteEmployee,
  // editEmployee,
  getEmployees,
} from "../../../../redux/Slice/employeesSlice";
import { getEmployee } from "src/redux/Slice/employeeSllice";

const DemoTable = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);

  const [page, setPage] = useState(currentPage);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/listemployees?page=${newPage}`);
  };
  useEffect(() => {
    currentPage !== page && setPage(currentPage);
    dispatch(getEmployees());
  }, [currentPage, page, dispatch]);

  const { employeesView } = useSelector((state) => state.employees);
  console.log(employeesView.users);
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
    "position",
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
        items={employeesView.users}
        fields={fields}
        columnFilter
        tableFilter
        cleaner
        itemsPerPageSelect
        striped
        itemsPerPage={5}
        activePage={page}
        hover
        sorter
        // onRowClick={(item) => history.push(`/users/${item.id}`)}
        // pagination
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
                  <CButton
                    size="sm"
                    color="info"
                    onClick={() => {
                      history.push(`/editemployee/${item._id}`);
                    }}
                  >
                    Edit
                  </CButton>
                  <CButton
                    size="sm"
                    color="danger"
                    className="ml-1"
                    onClick={() => {
                      dispatch(deleteEmployee(item._id));
                    }}
                  >
                    Delete
                  </CButton>
                  <CButton
                    size="sm"
                    color="primary"
                    className="ml-1"
                    onClick={() => {
                      history.push(`/listemployee/${item._id}`, { item });
                      // console.log("This is my id:   ", item._id);
                      // dispatch(getEmployee(item._id));
                    }}
                  >
                    View
                  </CButton>
                </CCardBody>
              </CCollapse>
            );
          },
        }}
      />
      <CPagination
        activePage={page}
        onActivePageChange={pageChange}
        pages={5}
        doubleArrows={false}
        align="center"
      />
    </CCardBody>
  );
};

export default DemoTable;
