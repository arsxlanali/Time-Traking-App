import React from "react";

const addEmployee = React.lazy(() =>
  import("./views/pages/Employees/AddEmployee/addEmployee")
);
const listEmployee = React.lazy(() =>
  import("./views/pages/Employees/ViewEmployees/viewTable")
);
const reports = React.lazy(() => import("./views/pages/reports/viewTable"));

const addProject = React.lazy(() =>
  import("./views/pages/project/addProject/addProject")
);
const editProject = React.lazy(() =>
  import("./views/pages/project/editProject/editProject")
);
const viewProject = React.lazy(() =>
  import("./views/pages/project/viewProject/projectsTable")
);
const Project = React.lazy(() =>
  import("./views/pages/project/viewProject/project")
);
const viewSheet = React.lazy(() =>
  import("./views/pages/timeSheet/viewTimeSheet/TaskSheetTable")
);
const employee = React.lazy(() =>
  import("./views/pages/Employees/ViewEmployees/Employee")
);
const editEmployee = React.lazy(() =>
  import("./views/pages//Employees/editEmployee/editEmployee")
);


const routes = [
  // { path: "/", exact: true, name: "" },
  // { path: "/dashboard", name: "Dashboard", component: Dashboard },

  {
    path: "/addproject",
    name: "Add Project",
    component: addProject,
    exact: true,
  },
  {
    path: "/editproject",
    name: "Edit Project",
    component: editProject,
    exact: true,
  },
  {
    path: "/listprojects",
    name: "List Projects",
    component: viewProject,
    exact: true,
  },
  {
    path: "/viewproject",
    name: "Project Details",
    component: Project,
    exact: true,
  },

  {
    path: "/viewsheet",
    name: "View Timesheet",
    component: viewSheet,
    exact: true,
  },
  {
    path: "/listemployees",
    name: "List Employees",
    component: listEmployee,
    exact: true,
  },
  {
    path: "/editemployee",
    exact: true,
    name: "Edit Employee",
    component: editEmployee,
  },
  {
    path: "/viewemployee",
    exact: true,
    name: "Employee Details",
    component: employee,
  },

  {
    path: "/addemployee",
    name: "Add Employee",
    component: addEmployee,
    exact: true,
  },
  {
    path: "/reports",
    name: "Reports",
    component: reports,
    exact: true,
  },
];

export default routes;
