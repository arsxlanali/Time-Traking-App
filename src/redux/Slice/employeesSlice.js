import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { CToast, CToastHeader, CToastBody } from "@coreui/react";
// import employeesList from "../../../views/pages/Employees/ViewEmployees/Data/UsersData";

const baseUrl = "https://time-tracking-app-backend.herokuapp.com";
const token = localStorage.getItem("Token");

const initialState = {
  employeesView: [],
  isLoading: false,
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
  //action type string
  "employees/addEmployee",
  // callback function
  async (data, thunkAPI) => {
    delete data["accept"];
    // data["password"] = "11221122";
    try {
      const res = await axios.post(
        `${baseUrl}/users/admin/addnewuser`,
        data,
        header
      );

      <CToast
        position={"top-right"}
        // key={"toast"}
        show={true}
        autohide={5000}
        fade={true}
      >
        <CToastHeader closeButton={true}>helloooo</CToastHeader>
        <CToastBody>
          {`This is a toast in positioned toaster number.`}
        </CToastBody>
      </CToast>;
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
export const deleteEmployee = createAsyncThunk(
  //action type string
  "employees/deleteEmployee",
  // callback function
  async (id, thunkAPI) => {
    // console.log("This is delete,", id);
    try {
      const res = await axios.delete(`${baseUrl}/users/delete/${id}`, header);
      // console.log("This is data", res?.data);

      thunkAPI.dispatch(getEmployees());
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
export const editEmployee = createAsyncThunk(
  //action type string
  "employees/editEmployee",
  // callback function
  async (data, thunkAPI) => {
    console.log("This is my id:", data);
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
      // thunkAPI.dispatch(getEmployees());
      // console.log("This is data", res?.data);
      <CToast key={"toast"} show={true} autohide={true} fade={true}>
        <CToastHeader closeButton={true}>helloooo</CToastHeader>
        <CToastBody>
          {`This is a toast in positioned toaster number.`}
        </CToastBody>
      </CToast>;
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
    },
    [addEmployee.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [addEmployee.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default employeesSlice.reducer;
