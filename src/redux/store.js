import { configureStore } from "@reduxjs/toolkit";
import slideBarSliceReducer from "./actions/Slice/sideBarSlice";
import viewEmployees from "./actions/Slice/employeeSlice";
// import projectSliceReducer from  './projectSlice';
export default configureStore({
  reducer: {
    slideBar: slideBarSliceReducer,
    employees: viewEmployees,
  },
});
