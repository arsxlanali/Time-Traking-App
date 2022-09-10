import React from "react";
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CFormGroup,
  CLabel,
  CFormText,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { TextMask, InputAdapter } from "react-text-mask-hoc";

// React DateRangePicker
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import { ProBadge, DocsLink } from "src/reusable";

// React select
import states from "./states";
import Select from "react-select";
import { useSelector } from "react-redux";

const AdvancedForms = () => {
  const darkMode = useSelector((state) => state?.slideBar?.darkMode);

  const [value, setValue] = React.useState([]);

  // const [date, setDate] = React.useState({ startDate: null, endDate: null });
  // const [focused, setFocused] = React.useState();

  return (
    <CRow>
      <CCol sm={12} md={6}>
        <CCard>
          <CCardBody>
            <Select
              name="form-field-name2"
              value={value}
              options={states}
              onChange={setValue}
              isMulti
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: darkMode ? "black" : theme.colors.primary,
                  primary25: darkMode ? "black" : theme.colors.primary25,
                  dangerLight: darkMode ? "black" : theme.colors.dangerLight,
                  neutral0: darkMode ? "#2a2b36" : theme.colors.neutral0,
                },
              })}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default AdvancedForms;
