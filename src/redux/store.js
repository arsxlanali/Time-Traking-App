import { configureStore } from "@reduxjs/toolkit";
import slideBarSliceReducer from "./Slice/sideBarSlice";
import viewEmployees from "./Slice/employeesSlice";
// import employee from "./Slice/employeeSllice";
import loginSliceReducer from "./Slice/loginSlice";
import viewTimeSheetReducer from "./Slice/viewTimeSheetSlice";
export default configureStore({
  reducer: {
    slideBar: slideBarSliceReducer,
    employees: viewEmployees,
    // employee: employee,
    login: loginSliceReducer,
    viewTimeSheet: viewTimeSheetReducer,
  },
});
