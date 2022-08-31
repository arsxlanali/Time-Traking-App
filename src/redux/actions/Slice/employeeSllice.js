import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import employeesList from "../../../views/pages/Employees/ViewEmployees/Data/UsersData";

const baseUrl = "https://time-tracking-app-backend.herokuapp.com";

const initialState = {
  employee: [],
  isLoading: true,
};

export const getEmployee = createAsyncThunk(
  //action type string
  "employee/getEmployee",
  // callback function

  async (data, thunkAPI) => {
    // console.log("sdfsdf");
    console.log("this is id:", data);

    // try {
    //   console.log("this is id:", data.params);
    //   const res = await axios(`${baseUrl}/users/getOne/${data.params.id}`);
    //   return res?.data;
    // } catch (error) {
    //   return thunkAPI.rejectWithValue("something went wrong");
    // }
  }
);

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  extraReducers: {
    [getEmployee.pending]: (state) => {
      state.isLoading = true;
    },
    [getEmployee.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.employee = payload;
    },
    [getEmployee.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default employeeSlice.reducer;
