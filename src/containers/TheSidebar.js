import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import icon from '../assets/icons/icon1.png'
import icon2 from '../assets/icons/icon2.png'
// sidebar nav config
import navigation from "./_nav";
import { _nav1 } from "./_nav";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state?.slideBar?.sidebarShow);
  const role = localStorage.getItem("Role");
  Object.filter = (obj, predicate) =>
    Object.keys(obj)
      .filter(key => predicate(obj[key]))
      .reduce((res, key) => (res[key] = obj[key], res), {});
  var filteredNav = {}
  if (role === "EMPLOYEE") {
    navigation = navigation.filter((obj) => {
      return (obj.name !== "Projects" && obj.name !== "Employee");
    })
    filteredNav = navigation.slice();
  }
  else if (role === "MANAGEMENT") {

    filteredNav = _nav1.slice();
  }
  else {
    filteredNav = navigation.slice();
  }
  return (
    <CSidebar
      show={show}
      unfoldable
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          src={icon}
          name="logo-negative"
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          src={icon2}
          name="sygnet"
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={filteredNav}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
