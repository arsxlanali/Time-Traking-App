import React from "react";
import {
  CCard,
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
} from "@coreui/react";

const Toaster = () => {
  return (
    <CCard>
      {Object.keys({ "": [{ "": "" }] }).map(() => (
        <CToaster position={"top-right"} key={"toaster1"}>
          <CToast key={"toast1"} show={true} autohide={5000} fade={true}>
            <CToastHeader>Toast title</CToastHeader>
            <CToastBody>
              This is a toast in positioned toaster number.
            </CToastBody>
          </CToast>
        </CToaster>
      ))}
    </CCard>
  );
};

export default Toaster;
