import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Home",
    to: "/dashboard",
    icon: <CIcon name="cil-home" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
    },
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["essential"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Projects",
    to: "/theme/colors",
    icon: "cil-notes",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Time Sheet",
    to: "/theme/typography",
    icon: "cil-notes",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Extra"],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Employee",
    route: "/editors",
    icon: "cil-code",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Add Employee",
        to: "/forms/validation-forms",
      },
      {
        _tag: "CSidebarNavItem",
        name: "View Employee",
        to: "/editors/text-editors",
      },
    ],
  },

  {
    _tag: "CSidebarNavItem",
    name: "Reports",
    to: "/widgets",
    icon: "cil-calculator",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Components"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Charts",
    to: "/forms/validation-forms",
    icon: "cil-chart-pie",
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Employee11",
    route: "/base",
    icon: "cil-drop",
    _children: [
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "Breadcrumb",
      //   to: "/base/breadcrumbs",
      // },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "Cards",
      //   to: "/base/cards",
      // },
      {
        _tag: "CSidebarNavItem",
        name: "Carousel",
        to: "/base/carousels",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Collapse",
        to: "/base/collapses",
      },
      /*
      {
        name: 'Dropdowns',
        to: '/base/dropdowns',
      },*/
      {
        _tag: "CSidebarNavItem",
        name: "Jumbotron",
        to: "/base/jumbotrons",
      },
      {
        _tag: "CSidebarNavItem",
        name: "List group",
        to: "/base/list-groups",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Navs",
        to: "/base/navs",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Navbars",
        to: "/base/navbars",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Pagination",
        to: "/base/paginations",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Popovers",
        to: "/base/popovers",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Progress",
        to: "/base/progress-bar",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Switches",
        to: "/base/switches",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Tabs",
        to: "/base/tabs",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Tooltips",
        to: "/base/tooltips",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Buttons",
    route: "/buttons",
    icon: "cil-cursor",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Buttons",
        to: "/buttons/buttons",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Brand buttons",
        to: "/buttons/brand-buttons",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Buttons groups",
        to: "/buttons/button-groups",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Dropdowns",
        to: "/buttons/button-dropdowns",
      },
    ],
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Forms",
    route: "/forms",
    icon: "cil-notes",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Basic Forms",
        to: "/forms/basic-forms",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Advanced Forms",
        to: "/forms/advanced-forms",
        badge: {
          color: "danger",
          text: "PRO",
        },
      },
      {
        _tag: "CSidebarNavItem",
        name: "Validation",
        to: "/forms/validation-forms",
        badge: {
          color: "danger",
          text: "PRO",
        },
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Google Maps",
    to: "/google-maps",
    icon: "cil-map",
    badge: {
      color: "danger",
      text: "PRO",
    },
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Icons",
    route: "/icons",
    icon: "cil-star",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "CoreUI Free",
        to: "/icons/coreui-icons",
        badge: {
          color: "success",
          text: "NEW",
        },
      },
      {
        _tag: "CSidebarNavItem",
        name: "CoreUI Flags",
        to: "/icons/flags",
      },
      {
        _tag: "CSidebarNavItem",
        name: "CoreUI Brands",
        to: "/icons/brands",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Notifications",
    route: "/notifications",
    icon: "cil-bell",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Alerts",
        to: "/notifications/alerts",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Badges",
        to: "/notifications/badges",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Modal",
        to: "/notifications/modals",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Toaster",
        to: "/notifications/toaster",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Plugins",
    route: "/plugins",
    icon: "cil-input-power",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Calendar",
        to: "/plugins/calendar",
        badge: {
          color: "danger",
          text: "PRO",
        },
      },
      {
        _tag: "CSidebarNavItem",
        name: "Draggable",
        to: "/plugins/draggable",
        badge: {
          color: "danger",
          text: "PRO",
        },
      },
      {
        _tag: "CSidebarNavItem",
        name: "Spinners",
        to: "/plugins/spinners",
        badge: {
          color: "danger",
          text: "PRO",
        },
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Tables",
    route: "/tables",
    icon: "cil-list",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Basic Tables",
        to: "/tables/tables",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Advanced Tables",
        to: "/tables/advanced-tables",
      },
    ],
  },
  {
    _tag: "CSidebarNavDivider",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Extras"],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Pages",
    route: "/pages",
    icon: "cil-star",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Login",
        to: "/login",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Register",
        to: "/register",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Error 404",
        to: "/404",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Error 500",
        to: "/500",
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Disabled",
    icon: "cil-ban",
    badge: {
      color: "secondary",
      text: "NEW",
    },
    addLinkClass: "c-disabled",
    disabled: true,
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Apps",
    route: "/apps",
    icon: "cil-layers",
    _children: [
      {
        _tag: "CSidebarNavDropdown",
        name: "Invoicing",
        route: "/apps/invoicing",
        icon: "cil-spreadsheet",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "Invoice",
            to: "/apps/invoicing/invoice",
            badge: {
              color: "danger",
              text: "PRO",
            },
          },
        ],
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "Email",
        route: "/apps/email",
        icon: "cil-envelope-open",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "Inbox",
            to: "/apps/email/inbox",
            badge: {
              color: "danger",
              text: "PRO",
            },
          },
          {
            _tag: "CSidebarNavItem",
            name: "Message",
            to: "/apps/email/message",
            badge: {
              color: "danger",
              text: "PRO",
            },
          },
          {
            _tag: "CSidebarNavItem",
            name: "Compose",
            to: "/apps/email/compose",
            badge: {
              color: "danger",
              text: "PRO",
            },
          },
        ],
      },
    ],
  },
  {
    _tag: "CSidebarNavDivider",
    className: "m-2",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Labels"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Label danger",
    to: "",
    icon: {
      name: "cil-star",
      className: "text-danger",
    },
    label: true,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Label info",
    to: "",
    icon: {
      name: "cil-star",
      className: "text-info",
    },
    label: true,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Label warning",
    to: "",
    icon: {
      name: "cil-star",
      className: "text-warning",
    },
    label: true,
  },
  {
    _tag: "CSidebarNavDivider",
    className: "m-2",
  },
];

export default _nav;
