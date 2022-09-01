import React from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useLocation } from "react-router-dom";

const User = ({ match }) => {
  const userDetails = useLocation().state.item;
  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>Employee id: {userDetails._id}</CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>
                    <strong>{userDetails.name}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>
                    <strong>{userDetails.email}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>
                    <strong>{userDetails.phone}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>
                    <strong>{userDetails.address}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Role</td>
                  <td>
                    <strong>{userDetails.role}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Department</td>
                  <td>
                    <strong>{userDetails.department}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Postion</td>
                  <td>
                    <strong>{userDetails.position}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default User;
