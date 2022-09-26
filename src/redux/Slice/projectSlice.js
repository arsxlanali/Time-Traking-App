import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// import swal from 'sweetalert';
import history from "src/hisotry";

const baseURL = "https://time-tracking-app-backend.herokuapp.com";

const initialState = {
  projects: [],
  loading: true,
};

export const viewProjects = createAsyncThunk(
  "projects/getall",
  async () => {
    const res = await axios
      .get(`${baseURL}/projects/getall`);
    return res?.data;
  }
);

export const deleteProject = createAsyncThunk(
  "projects/delete",
  async ({ id, setSubmitting }, thunkAPI) => {
    try {
      const res = await axios.delete(
        `${baseURL}/projects/delete/${id}`);
      setSubmitting(false)
      toast.success(res.data.message);
      // swal("Deleted", { icon: "success", timer: 1500, buttons: false })
      thunkAPI.dispatch(viewProjects());
      return res?.data;
    } catch (error) {
      setSubmitting(false);
    }
  }
);

export const addProject = createAsyncThunk(
  "projects/create",
  async ({ data, setSubmitting }, thunkAPI) => {
    try {
      const res = await axios.post(
        `${baseURL}/projects/create`, data);
      setSubmitting(false)
      toast.success(res.data.message);

      // swal("Project Added", { icon: "success", timer: 1500, buttons: false })
      history.push('/listprojects')
      thunkAPI.dispatch(viewProjects());
      return res?.data;
    } catch (error) {
      setSubmitting(false);
    }
  }
);

export const editProject = createAsyncThunk(
  "projects/update",

  async ({ data, id, setSubmitting }, thunkAPI) => {
    const assignBy = data['assignBy']
    delete data["assignBy"]
    const id1 = id[0]
    try {
      const res = await axios.patch(
        `${baseURL}/projects/update/${id1}`,
        data);
      setSubmitting(false);
      toast.success(res.data.message);
      // swal("Project Update", { icon: "success", timer: 1500, buttons: false })
      history.goBack();
      thunkAPI.dispatch(viewProjects());
      return res?.data;
    } catch (error) {
      setSubmitting(false);
    }
  }
);

export const getProjects = createAsyncThunk(
  "tasks/getProjects",
  async () => {
    const id = localStorage.getItem('key')
    const res = await axios.get(
      `${baseURL}/projects/findprojectsbyuser/${id}`);
    return res?.data;

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
