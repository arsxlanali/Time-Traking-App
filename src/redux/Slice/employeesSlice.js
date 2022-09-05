import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Redirect } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { CToast, CToastHeader, CToastBody } from "@coreui/react";
// import employeesList from "../../../views/pages/Employees/ViewEmployees/Data/UsersData";

const baseUrl = "https://time-tracking-app-backend.herokuapp.com";
const token = localStorage.getItem("Token");

const initialState = {
  employeesView: [1],
  isLoading: false,
  isScuessfull: false,
};

const header = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
export const getEmployees = createAsyncThunk(
  //action type string
  "employees/getall",
  // callback function

  async (thunkAPI) => {
    try {
      const res = await axios(`${baseUrl}/users/getall`, header);
      return res?.data?.users;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (data, thunkAPI) => {
    delete data["accept"];
    try {
      const res = await axios.post(
        `${baseUrl}/users/admin/addnewuser`,
        data,
        header
      );
      thunkAPI.dispatch(getEmployees());
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`${baseUrl}/users/delete/${id}`, header);
      thunkAPI.dispatch(getEmployees());
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
export const editEmployee = createAsyncThunk(
  "employees/editEmployee",
  async (data, thunkAPI) => {
    // console.log("This is my id:", data);
    const id = data["id"];
    delete data["id"];
    delete data["accept"];
    data["password"] = "11221122";
    try {
      const res = await axios.put(
        `${baseUrl}/users/update/${id}`,
        data,
        header
      );
      thunkAPI.dispatch(getEmployees());
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
export const employeesSlice = createSlice({
  name: "employees",
  initialState,
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
    [addEmployee.pending]: (state) => {
      state.isLoading = true;
      state.isScuessfull = false;
    },
    [addEmployee.fulfilled]: (state) => {
      state.isLoading = false;
      state.isScuessfull = true;
    },
    [addEmployee.rejected]: (state) => {
      state.isLoading = false;
      state.isScuessfull = false;
    },
  },
});
// export const { redirect } = employeesSlice.actions;
export default employeesSlice.reducer;
