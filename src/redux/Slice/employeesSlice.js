import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import swal from 'sweetalert';
import history from "src/hisotry";
import { clearProjects } from "./projectSlice";
import { clearTimeSheet } from "./viewTimeSheetSlice";
import { clearLogin } from "./loginSlice";
import DelayRedirect from "./delayRedirect";

const baseUrl = "https://time-tracking-app-backend.herokuapp.com";

const initialState = {
  employeesView: [1],
  isLoading: false,
  isScuessfull: false,
};

export const getEmployees = createAsyncThunk(
  //action type string
  "employees/getall",
  // callback function

  async (thunkAPI) => {
    try {
      // console.log('This is getAll Employees', header)
      const res = await axios(`${baseUrl}/users/getall`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          }
        }
      );
      return res?.data?.users;
    } catch (error) {
      if (error.response.data == 'Unauthorized') {

        setTimeout(history.push('/login'), 2000)
        swal("Opps!", "Session Expired", "error")
        localStorage.clear();
        thunkAPI.dispatch(clearEmployee())
        thunkAPI.dispatch(clearProjects())
        thunkAPI.dispatch(clearLogin())
        thunkAPI.dispatch(clearTimeSheet())
      }
      else {
        swal("Opps!", error.response.data.message, "error")

      }
    }
  }
);
export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async ({ values, setSubmitting, history }, thunkAPI) => {
    delete values["accept"];
    const phone = '0' + values['phone'].toString();
    delete values["phone"];
    values["phone"] = phone;
    // console.log("this is employee add data", values, setSubmitting);
    try {
      const res = await axios.post(
        `${baseUrl}/users/admin/addnewuser`,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          }
        }
      );
      setSubmitting(false);
      history.push('/listemployee')
      swal("Employee Addded", { icon: "success" })
      thunkAPI.dispatch(getEmployees());
      return res?.data;
    } catch (error) {
      setSubmitting(false);
      if (error.response.data == 'Unauthorized') {

        setTimeout(history.push('/login'), 1000)
        swal("Opps!", "Session Expired", "error")
        localStorage.clear();
        thunkAPI.dispatch(clearEmployee())
        thunkAPI.dispatch(clearProjects())
        thunkAPI.dispatch(clearLogin())
        thunkAPI.dispatch(clearTimeSheet())
      }
      else {
        swal("Opps!", error.response.data.message, "error")

      }
    }
  }
);
export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async ({ id, setSubmitting }, thunkAPI) => {
    try {
      const res = await axios.delete(`${baseUrl}/users/admin/deleteuser/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        }
      });
      setSubmitting(false);
      history.push('/viewemployee')
      swal("Deleted", { icon: "success" })
      // setTimeout(
      //   function, 2000)
      thunkAPI.dispatch(getEmployees());
      return res?.data;
    } catch (error) {
      setSubmitting(false);
      if (error.response.data == 'Unauthorized') {

        setTimeout(history.push('/login'), 2000)
        swal("Opps!", "Session Expired", "error")
        localStorage.clear();
        thunkAPI.dispatch(clearEmployee())
        thunkAPI.dispatch(clearProjects())
        thunkAPI.dispatch(clearLogin())
        thunkAPI.dispatch(clearTimeSheet())
      }
      else {
        swal("Opps!", error.response.data.message, "error")

      }
    }
  }
);
export const editEmployee = createAsyncThunk(
  "employees/editEmployee",
  async ({ values, setSubmitting, history }, thunkAPI) => {
    const id = values["id"];
    delete values["id"];
    delete values["accept"];
    const phone = '0' + values['phone'].toString();
    delete values["phone"];
    values["phone"] = phone;

    try {
      const res = await axios.patch(
        `${baseUrl}/users/admin/updateuser/${id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          }
        }
      );
      swal("Employee Update", { icon: "success" })
      history.push('/listemployee')
      thunkAPI.dispatch(getEmployees());
      return res?.data;
    } catch (error) {
      setSubmitting(false);
      if (error.response.data == 'Unauthorized') {

        setTimeout(history.push('/login'), 2000)
        swal("Opps!", "Session Expired", "error")
        localStorage.clear();
        thunkAPI.dispatch(clearEmployee())
        thunkAPI.dispatch(clearProjects())
        thunkAPI.dispatch(clearLogin())
        thunkAPI.dispatch(clearTimeSheet())
      }
      else {
        swal("Opps!", error.response.data.message, "error")

      }
    }
  }
);
export const resetPassword = createAsyncThunk(
  "employees/resetPassword",
  async ({ values, setSubmitting, history }, thunkAPI) => {
    const id = values["id"];
    delete values["id"];
    delete values["accept1"];
    delete values["confirmPassword"];
    console.log("this is passwrod", values)
    try {
      const res = await axios.patch(
        `${baseUrl}/users/admin/updateuser/${id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          }
        }
      );
      setSubmitting(false);
      swal("Password Update", { icon: "success" })

      history.push("/listemployee")
      thunkAPI.dispatch(getEmployees());
      return res?.data;
    } catch (error) {
      setSubmitting(false);
      if (error.response.data == 'Unauthorized') {

        setTimeout(history.push('/login'), 2000)
        swal("Opps!", "Session Expired", "error")
        localStorage.clear();
        thunkAPI.dispatch(clearEmployee())
        thunkAPI.dispatch(clearProjects())
        thunkAPI.dispatch(clearLogin())
        thunkAPI.dispatch(clearTimeSheet())
      }
      else {
        swal("Opps!", error.response.data.message, "error")

      }
    }
  }
);
export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    clearEmployee: (state) => {
      state.employeesView = [];
    }
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
    [editEmployee.pending]: (state) => {
      state.isLoading = true;
      state.isScuessfull = false;
    },
    [editEmployee.fulfilled]: (state) => {
      state.isLoading = false;
      state.isScuessfull = true;
    },
    [editEmployee.rejected]: (state) => {
      state.isLoading = false;
      state.isScuessfull = false;
    },
    [resetPassword.pending]: (state) => {
      state.isLoading = true;
      state.isScuessfull = false;
    },
    [resetPassword.fulfilled]: (state) => {
      state.isLoading = false;
      state.isScuessfull = true;
    },
    [resetPassword.rejected]: (state) => {
      state.isLoading = false;
      state.isScuessfull = false;
    },
  },
});
export const { clearEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
