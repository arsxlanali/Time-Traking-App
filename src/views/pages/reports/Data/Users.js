// import React, { useState, useEffect } from "react";
// import { useHistory, useLocation } from "react-router-dom";
// import {
//   // CBadge,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CDataTable,
//   CRow,
//   CPagination,
// } from "@coreui/react";

// import usersData from "./UsersData";

// // const getBadge = (status) => {
// //   switch (status) {
// //     case "Active":
// //       return "success";
// //     case "Inactive":
// //       return "secondary";
// //     case "Pending":
// //       return "warning";
// //     case "Banned":
// //       return "danger";
// //     default:
// //       return "primary";
// //   }
// // };

// const Users = () => {
//   const history = useHistory();
//   const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
//   const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
//   const [page, setPage] = useState(currentPage);

//   const pageChange = (newPage) => {
//     currentPage !== newPage && history.push(`/users?page=${newPage}`);
//   };

//   useEffect(() => {
//     currentPage !== page && setPage(currentPage);
//   }, [currentPage, page]);

//   return (
//     <CRow>
//       <CCol xl={6}>
//         <CCard>
//           <CCardHeader>Users</CCardHeader>
//           <CCardBody>
//             <CDataTable
//               items={usersData}
//               fields={[
//                 { key: "name", _classes: "font-weight-bold" },
//                 "desingnation",
//                 "role",
//                 "email",
//               ]}
//               hover
//               striped
//               itemsPerPage={20}
//               activePage={page}
//               clickableRows
//               onRowClick={(item) => history.push(`/users/${item.id}`)}
//               // scopedSlots={{
//               //   email: (item) => (
//               //     <td>
//               //       {/* <CBadge color={getBadge(item.email)}>{item.email}</CBadge> */}
//               //     </td>
//               //   ),
//               // }}
//             />
//             <CPagination
//               activePage={page}
//               onActivePageChange={pageChange}
//               pages={5}
//               doubleArrows={false}
//               align="center"
//             />
//           </CCardBody>
//         </CCard>
//       </CCol>
//     </CRow>
//   );
// };

// export default Users;
