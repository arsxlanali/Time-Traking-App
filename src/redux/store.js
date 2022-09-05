import { configureStore } from "@reduxjs/toolkit";
import {sideBarSliceReducer} from "./Slice/sideBarSlice";
import viewEmployees from "./Slice/employeesSlice";
import loginSliceReducer from "./Slice/loginSlice";
import viewTimeSheetReducer from "./Slice/viewTimeSheetSlice";
import viewProjectsReducer from './Slice/projectSlice';
export default configureStore({
  reducer: {
    slideBar: sideBarSliceReducer,
    employees: viewEmployees,
    login: loginSliceReducer,
    viewTimeSheet: viewTimeSheetReducer,
    viewProjects:viewProjectsReducer
  },
});
