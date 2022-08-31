import React from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const User = ({ match }) => {
  // console.log("this is mathc", match);
  const userDetails = useLocation().state.item;

  console.log("this odsndfs", typeof userDetails);
  // const user = employeesView.users.find(
  //   (user) => user._id.toString() === match.params._id
  // );
  // const userDetails = user
  //   ? Object.entries(user)
  //   : [
  //       [
  //         "id",
  //         <span>
  //           <CIcon className="text-muted" name="cui-icon-ban" /> Not
  //         </span>,
  //       ],
  //     ];

  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>Employee id: {userDetails.id}</CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                {userDetails.map(([key, value], index) => {
                  return (
                    <tr key={index.toString()}>
                      <td>{`${key}:`}</td>
                      <td>{value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default User;
