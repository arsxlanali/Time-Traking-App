import React from "react";
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CSpinner,
} from "@coreui/react";
// import { ProBadge, DocsLink } from "src/reusable";

import "spinkit/spinkit.min.css";

export default function Loader() {
  return (
    <CCardBody className={"d-flex justify-content-center mh-100"}>
      <div className="sk-fold">
        <div className="sk-fold-cube"></div>
        <div className="sk-fold-cube"></div>
        <div className="sk-fold-cube"></div>
        <div className="sk-fold-cube"></div>
      </div>
    </CCardBody>
  );
}
