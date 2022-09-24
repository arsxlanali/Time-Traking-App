import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  CCardBody,
  CBadge,
  CButton,
  CCollapse,
  CDataTable,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteEmployee,
  getEmployees,
} from "../../../../redux/Slice/employeesSlice";
import Loader from "../../loader/Loader";
const EmployeeTable = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { employeesView, isLoading } = useSelector((state) => state.employees);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

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
          itemsPerPageSelect
          itemsPerPage={5}
          hover
          sorter
          pagination
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
                        history.push(`/editemployee`, {
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
                        history.push(`/viewemployee`, { item });
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
                        <CButton size="sm" color="danger" className="ml-1"
                          disabled={submitting}

                          onClick={() => {
                            setSubmitting(true)
                            const id = item._id;
                            dispatch(deleteEmployee({ id, setSubmitting, setModal }))

                          }}>
                          {submitting ? "Wait..." : "Delete"}
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
    </CCardBody>
  );
};

export default EmployeeTable;
