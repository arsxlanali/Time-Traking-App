import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import employeesList from "../../../views/pages/Employees/ViewEmployees/Data/UsersData";

const baseUrl = "https://time-tracking-app-backend.herokuapp.com";

const initialState = {
  employeesView: [],
  isLoading: true,
};

export const getEmployees = createAsyncThunk(
  //action type string
  "employees/getall",
  // callback function

  async (thunkAPI) => {
    // console.log("sdfsdf");
    try {
      const res = await axios(`${baseUrl}/users/getall`);
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    view: (state) => {
      state.isLoading = false;
    },
    deleteEmployee: (state, action) => {
      const itemId = action.payload;
      const employee = state.employeesView.filter((item) => item.id !== itemId);
      state.employeesView = employee;
      // state.isLoading = false;
    },
    addEmployee: (state, { payload }) => {
      delete payload.accept;
      payload.id = 330;
      console.log(payload);
      state.employeesView = [...state.employeesView, payload];
    },
    editEmployee: (state, { payload }) => {
      // const itemId = payload;
      // console.log(state.employeesView);
      // const employee = state.employeesView.filter((item) => item.id === itemId);
      // console.log(employee);
      const updatedEmployees = state.employeesView.map((item) => {
        if (item.id === payload.id) {
          return payload;
        } else {
          return item;
        }
      });
      state.employeesView = updatedEmployees;
    },
  },
  extraReducers: {
    [getEmployees.pending]: (state) => {
      state.isLoading = true;
    },
    [getEmployees.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.employeesView = payload;
    },
    [getEmployees.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { view, deleteEmployee, addEmployee, editEmployee } =
  employeesSlice.actions;
export default employeesSlice.reducer;