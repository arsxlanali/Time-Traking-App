import React from "react";

const addEmployee = React.lazy(() =>
  import("./views/pages/employees/addEmployee/AddEmployee")
);
const listEmployee = React.lazy(() =>
  import("./views/pages/employees/viewEmployees/EmployeesTable")
);
const employee = React.lazy(() =>
  import("./views/pages/employees/viewEmployees/Employee")
);
const editEmployee = React.lazy(() =>
  import("./views/pages/employees/editEmployee/EditEmployee")
);
const reports = React.lazy(() => import("./views/pages/reports/viewTable"));

const addProject = React.lazy(() =>
  import("./views/pages/project/addProject/AddProject")
);
const editProject = React.lazy(() =>
  import("./views/pages/project/editProject/EditProject")
);
const viewProject = React.lazy(() =>
  import("./views/pages/project/viewProject/ProjectsTable")
);
const Project = React.lazy(() =>
  import("./views/pages/project/viewProject/Project")
);
const viewSheet = React.lazy(() =>
  import("./views/pages/timeSheet/viewTimeSheet/TaskSheetTable")
);



const routes = [

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
