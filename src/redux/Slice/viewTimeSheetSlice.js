import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import swal from 'sweetalert';
import history from "src/hisotry";
import { clearProjects } from "./projectSlice";
import { clearEmployee } from "./employeesSlice";
import { clearLogin } from "./loginSlice";


import { authLink } from "./auth";
const baseURL = "https://time-tracking-app-backend.herokuapp.com";
const initialState = {
  timeSheet: [],
  loading: false,
  submitted: false,
}



export const viewTimeSheet = createAsyncThunk(
  'tasks/user',
  async ({ UserId, date }, thunkAPI) => {
    try {
      const res = await axios
        .get(`${baseURL}/tasks/user/${UserId}/date/${date}`, {
          // authLink();
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          }
        });
      return res.data;
    }
    catch (error) {
      if (error.response.data == 'Unauthorized') {

        // setTimeout(history.push('/login'), 2000)
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

      // return thunkAPI.rejectWithValue("Didn't get data");
    }


  })



export const deleteTask = createAsyncThunk(
  "tasks/delete",

  async ({ id, date, setSubmitting }, thunkAPI) => {
    console.log("taskid", date, id, SubmitEvent);
    try {
      const res = await axios.delete(
        `${baseURL}/tasks/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          }
        }
      );
      setSubmitting(false)
      swal("Deleted", { icon: "success" })
      const UserId = localStorage.getItem('key');
      thunkAPI.dispatch(viewTimeSheet({ UserId, date }));
      return res?.data;
    } catch (error) {
      setSubmitting(false)
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

export const addTask = createAsyncThunk(
  "tasks/create",

  async ({ data, setSubmitting, resetForm }, thunkAPI) => {

    try {
      const res = await axios.post(
        `${baseURL}/tasks/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          }
        }
      );
      setSubmitting(false);
      resetForm();
      // console.log("task info", taskInfo)
      // history.push('/')
      const UserId = localStorage.getItem('key');
      const date = data.date;
      thunkAPI.dispatch(viewTimeSheet({ UserId, date }));
      return res?.data;
    } catch (error) {
      setSubmitting(false)
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

export const editTask = createAsyncThunk(
  "tasks/update",

  async ({ data, id, setSubmitting, onClose }, thunkAPI) => {
    try {
      const res = await axios.patch(
        `${baseURL}/tasks/update/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          }
        }
      );

      // console.log("This is onClose", onClose);
      onClose();
      setSubmitting(false);
      swal("Updated", { icon: "success" })
      const UserId = localStorage.getItem('key');
      const date = data.date;
      thunkAPI.dispatch(viewTimeSheet({ UserId, date }));
      // console.log(res.data);
      return res?.data;
    } catch (error) {
      setSubmitting(false)
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
export const submitTasks = createAsyncThunk(
  "tasks/delete",

  async ({ date, setSubmitting }, thunkAPI) => {
    console.log("taskid", date, SubmitEvent);
    try {
      const res = await axios.delete(
        `${baseURL}/tasks/submit`,
        date,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          }
        }
      );
      setSubmitting(false)
      swal("Submmited", { icon: "success" })
      // const UserId = localStorage.getItem('key');
      // thunkAPI.dispatch(viewTimeSheet({ UserId, date }));
      return res?.data;
    } catch (error) {
      setSubmitting(false)
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
export const viewTimeSheetSlice = createSlice({
  name: 'viewTimeSheet',
  initialState,
  reducers: {
    clearTimeSheet: (state) => {
      state.timeSheet = [];
    }
  },


  extraReducers: {
    [viewTimeSheet.pending]: (state) => {
      state.loading = true
    },
    [viewTimeSheet.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.timeSheet = payload

    },
    [viewTimeSheet.rejected]: (state) => {
      state.submitted = false
    },
    [submitTasks.pending]: (state) => {
      state.submitted = false
    },
    [submitTasks.fulfilled]: (state, { payload }) => {
      state.submitted = payload.acknowledged;
    },
    [submitTasks.rejected]: (state) => {
      state.submitted = false
    },

  },

})
export const { clearTimeSheet } = viewTimeSheetSlice.actions;
export default viewTimeSheetSlice.reducer;
