import React from "react";
import {
  CCardBody,
} from "@coreui/react";

import "spinkit/spinkit.min.css";

export default function Loader() {
  return (
    <CCardBody className={"d-flex justify-content-center align-items-center"}>
      <div className="sk-fold">
        <div className="sk-fold-cube"></div>
        <div className="sk-fold-cube"></div>
        <div className="sk-fold-cube"></div>
        <div className="sk-fold-cube"></div>
      </div>
    </CCardBody>
  );
}
