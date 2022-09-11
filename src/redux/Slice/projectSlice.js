import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import swal from 'sweetalert';
import history from "src/hisotry";
import { clearTimeSheet } from "./viewTimeSheetSlice";
import { clearEmployee } from "./employeesSlice";
import { clearLogin } from "./loginSlice";



const baseURL = "https://time-tracking-app-backend.herokuapp.com";
// const token = localStorage.getItem("Token");

const initialState = {
  projects: [],
  loading: true,
};

export const viewProjects = createAsyncThunk(

  "projects/getall",

  async (thunkAPI) => {

    try {
      const res = await axios
        .get(`${baseURL}/projects/getall`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          }
        });
      // console.log("This is project data", res.data)
      return res.data;

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

export const deleteProject = createAsyncThunk(
  "projects/delete",

  async ({ id, setSubmitting }, thunkAPI) => {
    try {
      const res = await axios.delete(
        `${baseURL}/projects/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          }
        }
      );
      setSubmitting(false)
      swal("Deleted", { icon: "success" })
      thunkAPI.dispatch(viewProjects());
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

export const addProject = createAsyncThunk(
  "projects/create",

  async ({ data, history, setSubmitting }, thunkAPI) => {
    // console.log("project info", data)
    try {

      const res = await axios.post(
        `${baseURL}/projects/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          }
        },
      );
      setSubmitting(false)
      swal("Project Added", { icon: "success" })
      history.push('/viewproject')
      thunkAPI.dispatch(viewProjects());
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

export const editProject = createAsyncThunk(
  "projects/update",

  async ({ data, id, setSubmitting }, thunkAPI) => {
    // const projectInfo = data();
    console.log("projectInfo: ", data)
    try {
      const res = await axios.patch(
        `${baseURL}/projects/update/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          }
        },
      );
      setSubmitting(false);
      swal("Project Update", { icon: "success" })
      thunkAPI.dispatch(viewProjects());
      return res?.data;
    } catch (error) {
      setSubmitting(false);
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

export const getProjects = createAsyncThunk(
  "tasks/getProjects",

  async (thunkAPI) => {
    const id = localStorage.getItem('key')
    // console.log("this is user id", id);
    try {
      const res = await axios.get(
        `${baseURL}/projects/findprojectsbyuser/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          }
        },
      );
      return res?.data;
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
export const viewProjectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    clearProjects: (state) => {
      state.projects = [];
    }
  },
  extraReducers: {
    [viewProjects.pending]: (state) => {
      state.loading = true;
    },
    [viewProjects.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.projects = payload;
      console.log(payload)
    },
    [viewProjects.rejected]: (state) => {
      state.loading = false;
    },
    [getProjects.fulfilled]: (state, { payload }) => {
      state.projects = payload
    },
  },
});
export const { clearProjects } = viewProjectsSlice.actions;
export default viewProjectsSlice.reducer;
