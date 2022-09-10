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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
// import usersData from "./Data/UsersData";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteEmployee,
  getEmployees,
} from "../../../../redux/Slice/employeesSlice";
// import { getEmployee } from "src/redux/Slice/employeeSllice";
import Loader from "../../loader/Loader";
const DemoTable = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const { employeesView, isLoading } = useSelector((state) => state.employees);

  const [page, setPage] = useState(currentPage);
  const [pageLength, setPageLength] = useState(1);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/listemployee?page=${newPage}`);
  };
  useEffect(() => {
    currentPage !== page && setPage(currentPage);
    dispatch(getEmployees());
    if (employeesView.length > 1)
      setPageLength(Math.ceil(employeesView.length / 5));
  }, [setPageLength, currentPage, dispatch, employeesView.length, page]);
  // console.log("this is emp lenght;", employeesView.length, pageLength);

  const [modal, setModal] = useState(false);
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
    { key: "name", _style: { width: "30%" } },
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
      {isLoading ? (
        <Loader />
      ) : (
        <CDataTable
          items={employeesView}
          fields={fields}
          columnFilter
          // tableFilter
          cleaner
          loading={isLoading}
          itemsPerPageSelect
          striped
          itemsPerPage={5}
          activePage={page}
          hover
          sorter
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
                    {details.includes(item._id) ? "Actions" : "Actions"}
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
                        history.push(`/editemployee/${item._id}`, {
                          item,
                        });
                      }}
                    >
                      Edit
                    </CButton>
                    <CButton
                      size="sm"
                      color="danger"
                      className="ml-1"
                      onClick={() => setModal(!modal)}
                    >
                      Delete
                    </CButton>
                    <CButton
                      size="sm"
                      color="primary"
                      className="ml-1"
                      onClick={() => {
                        history.push(`/listemployee/${item._id}`, { item });
                      }}
                    >
                      View
                    </CButton>

                    <CModal show={modal} onClose={setModal}>
                      <CModalHeader closeButton>
                        <CModalTitle>Are you sure?</CModalTitle>
                      </CModalHeader>
                      <CModalBody>
                        You are about to permanentaly delete an employee, you
                        will not be able to recover deleted information letter.
                      </CModalBody>
                      <CModalFooter>
                        <CButton
                          color="danger"
                          onClick={() => {
                            dispatch(deleteEmployee(item._id));
                            setModal(false);
                          }}
                        >
                          Delete
                        </CButton>{" "}
                        <CButton
                          color="secondary"
                          onClick={() => setModal(false)}
                        >
                          Cancel
                        </CButton>
                      </CModalFooter>
                    </CModal>
                  </CCardBody>
                </CCollapse>
              );
            },
          }}
        />
      )}
      <CPagination
        activePage={page}
        onActivePageChange={pageChange}
        pages={pageLength}
        doubleArrows={false}
        align="center"
      />
    </CCardBody>
  );
};

export default DemoTable;
