import { configureStore } from "@reduxjs/toolkit";
import slideBarSliceReducer from "./Slice/sideBarSlice";
import viewEmployees from "./Slice/employeesSlice";
import loginSliceReducer from "./Slice/loginSlice";
import viewTimeSheetReducer from "./Slice/viewTimeSheetSlice";
import viewProjectsReducer from './Slice/projectSlice';
export default configureStore({
  reducer: {
    slideBar: slideBarSliceReducer,
    employees: viewEmployees,
    login: loginSliceReducer,
    viewTimeSheet: viewTimeSheetReducer,
    viewProjects:viewProjectsReducer
  },
});
