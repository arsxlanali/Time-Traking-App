import { configureStore } from "@reduxjs/toolkit";
import slideBarSliceReducer from "./actions/Slice/sideBarSlice";
import viewEmployees from "./actions/Slice/employeesSlice";
import employee from "./actions/Slice/employeeSllice";
// import projectSliceReducer from  './projectSlice';
export default configureStore({
  reducer: {
    slideBar: slideBarSliceReducer,
    employees: viewEmployees,
    employee: employee,
  },
});
