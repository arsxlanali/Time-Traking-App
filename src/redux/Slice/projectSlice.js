import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "https://time-tracking-app-backend.herokuapp.com";
const token = localStorage.getItem("Token");

const initialState = {
  projects: [],
  loading: true,
};

const header = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
export const viewProjects = createAsyncThunk(

  "projects/getall",

  async (data, thunkAPI) => {

    try {
      const res = await axios
        .get(`${baseURL}/projects/getall`, header);
      // console.log("This is project data", res.data)
      return res.data;

    } catch (error) {
      return thunkAPI.rejectWithValue("can't find any project");
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/delete",

  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(
        `${baseURL}/projects/delete/${id}`,
        header
      );

      thunkAPI.dispatch(viewProjects());
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("project not found");
    }
  }
);

export const addProject = createAsyncThunk(
  "projects/create",

  async ({ data, history }, thunkAPI) => {
    // console.log("project info", data)
    try {

      const res = await axios.post(
        `${baseURL}/projects/create`,
        data,
        header,
      );
      history.push('/viewproject')
      thunkAPI.dispatch(viewProjects());
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("not added");
    }
  }
);

export const editProject = createAsyncThunk(
  "projects/update",

  async ({ data, id }, thunkAPI) => {
    const projectInfo = data();
    // console.log("projectInfo: ", projectInfo)
    try {
      const res = await axios.patch(
        `${baseURL}/projects/update/${id}`,
        projectInfo,
        header,
      );

      thunkAPI.dispatch(viewProjects());
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("not edited");
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
        header,
      );
      // console.log("this is date", res?.data)
      // console.log("task info", taskInfo)
      // history.push('/')
      // thunkAPI.dispatch(viewTimeSheet(localStorage.getItem('key')));
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("task not found");
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
