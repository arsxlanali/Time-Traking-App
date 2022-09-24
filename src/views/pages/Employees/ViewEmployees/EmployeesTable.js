import React from "react";
import { CCard, CCol, CRow } from "@coreui/react";
import EmployeeTable from "./EmployeeTable";

const EmployeesTable = () => {
  return (
    <CRow>
      <CCol sm="12">
        <CCard>
          <EmployeeTable />
        </CCard>
      </CCol>
    </CRow>
  );
};

export default EmployeesTable;
