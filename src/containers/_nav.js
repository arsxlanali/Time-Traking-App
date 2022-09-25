
const _nav = [
  {
    _tag: "CSidebarNavTitle",
    _children: ["Essentials"],
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Projects",
    icon: "cil-file",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Add Project",
        to: "/addproject",
      },
      {
        _tag: "CSidebarNavItem",
        name: "List Projects",
        to: "/listprojects",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Employee",
    icon: "cil-user",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "List Employees",
        to: "/listemployees",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Add Employee",
        to: "/addemployee",
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Time Sheet",
    to: "/viewsheet",
    icon: "cil-task",
  },

  {
    _tag: "CSidebarNavItem",
    name: "Reports",
    to: "/reports",
    icon: "cil-puzzle",
  }
];

export const _nav1 = [
  {
    _tag: "CSidebarNavTitle",
    _children: ["Essentials"],
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Projects",
    icon: "cil-file",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Add Project",
        to: "/addproject",
      },
      {
        _tag: "CSidebarNavItem",
        name: "List Projects",
        to: "/listprojects",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Employee",
    icon: "cil-user",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "List Employees",
        to: "/listemployees",
      }
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Time Sheet",
    to: "/viewsheet",
    icon: "cil-task",
  },

  {
    _tag: "CSidebarNavItem",
    name: "Reports",
    to: "/reports",
    icon: "cil-puzzle",
  }
];

export default _nav;
