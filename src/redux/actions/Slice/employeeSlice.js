import { createSlice } from "@reduxjs/toolkit";
import employeesList from "../../../views/pages/Employees/ViewEmployees/Data/UsersData";
const initialState = {
  employeesView: employeesList,
  isLoading: true,
};

export const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    view: (state) => {
      state.isLoading = false;
    },
    deleteEmployee: (state, action) => {
      const itemId = action.payload;
      const employee = state.employeesView.filter((item) => item.id !== itemId);
      console.log(employee);
      // console.log(employee);
      state.employeesView = employee;
      // state.isLoading = false;
    },
    addEmployee: (state, { payload }) => {
      state.employeesView = [...state.employeesView, payload];
      // state.employeesView = payload;
    },
    editEmployee: (state, { payload }) => {
      const itemId = payload;
      // console.log(state.employeesView);
      const employee = state.employeesView.filter((item) => item.id === itemId);
      // console.log(employee);
      // const updatedEmployees = state.employeesView.map((item) => {
      //   if (item.id === payload.id) {
      //     return payload;
      //   } else {
      //     return item;
      //   }
      // });
      state.employeesView = employee;
    },
  },
});

export const { view, deleteEmployee, addEmployee, editEmployee } =
  employeeSlice.actions;
export default employeeSlice.reducer;
