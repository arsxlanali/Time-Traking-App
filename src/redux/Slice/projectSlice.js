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
      console.log(res.data)
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

  async (projectInfo, thunkAPI) => {
    try {
      const res = await axios.post(
        `${baseURL}/projects/create`,
        projectInfo,
        header,
      );

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
    console.log("projectInfo: ",projectInfo)
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


export const viewProjectsSlice = createSlice({
  name: "projects",
  initialState,
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
  },
});

export default viewProjectsSlice.reducer;
