import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CSubheader,
  CBreadcrumbRouter,
  CLink,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import icon from '../assets/icons/icon1.png'

// routes config
import routes from "../routes";

import {
  TheHeaderDropdown
} from "./index";

const TheHeader = () => {
  const dispatch = useDispatch()
  const asideShow = useSelector(state => state?.slideBar?.asideShow)
  const darkMode = useSelector(state => state?.slideBar?.darkMode)
  const sidebarShow = useSelector(state => state?.slideBar?.sidebarShow)

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };
  const role = localStorage.getItem("Role");
  if (role == "EMPLOYEE") {
    // console.log("this is routes", routes);
    var filteredRoutes = routes.filter((obj) => {
      return (obj.path == "/viewsheet" || obj.path == "/reports");
    })
  }
  else {
    var filteredRoutes = routes.slice();
  }
  // console.log("this is filtered routes", filteredRoutes);
  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        {/* <CIcon name="logo" height="48" alt="Logo" /> */}
        <img src={icon} alt="TDC Logo" style={{ width: 'auto', height: '40px' }} />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
      </CHeaderNav>

      <CHeaderNav className="px-3">
        {/* <CIcon
          name="cil-switch"
          className="c-d-dark-none"
          alt="CoreUI Icons Moon"
        /> */}
        <CToggler
          inHeader
          className="ml-3 d-md-down-none c-d-legacy-none"
          onClick={() => dispatch({ type: "set", darkMode: !darkMode })}
          title="Toggle Light/Dark Mode"
        >
          <CIcon
            name="cil-moon"
            className="c-d-dark-none"
            alt="CoreUI Icons Moon"
          />
          <CIcon
            name="cil-sun"
            className="c-d-default-none"
            alt="CoreUI Icons Sun"
          />
        </CToggler>
        <TheHeaderDropdown />
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={filteredRoutes}
        />
        <div className="d-md-down-none mfe-2 c-subheader-nav">
          <CLink
            className="c-subheader-nav-link"
            aria-current="page"
            to="/viewsheet"
          >
            <CIcon name="cil-graph" alt="TimeSheet" />
            &nbsp;Time Sheet
          </CLink>
        </div>
      </CSubheader>
    </CHeader>
  );
};

export default TheHeader;
