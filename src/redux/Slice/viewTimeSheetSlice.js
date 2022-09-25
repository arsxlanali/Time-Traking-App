import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import swal from 'sweetalert';
import history from "src/hisotry";

const baseURL = "https://time-tracking-app-backend.herokuapp.com";
const initialState = {
  timeSheet: [],
  pending: [],
  loading: false,
  submitted: false,
}

export const viewTimeSheet = createAsyncThunk(
  'tasks/user',
  async ({ UserId, date }) => {
    const res = await axios
      .get(`${baseURL}/tasks/user/${UserId}/date/${date}`, {
      });
    return res.data;

  })

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async ({ id, date, setSubmitting }, thunkAPI) => {
    try {
      const res = await axios.delete(
        `${baseURL}/tasks/delete/${id}`
      );
      setSubmitting(false)
      swal("Deleted", { icon: "success", timer: 1500, buttons: false })
      const UserId = localStorage.getItem('key');
      thunkAPI.dispatch(viewTimeSheet({ UserId, date }));
      return res?.data;
    } catch (error) {
      setSubmitting(false)
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks/create",

  async ({ data, setSubmitting, resetForm, setErrors }, thunkAPI) => {

    try {
      const res = await axios.post(
        `${baseURL}/tasks/create`,
        data
      );
      setSubmitting(false);
      resetForm();
      const UserId = localStorage.getItem('key');
      const date = data.date;
      thunkAPI.dispatch(viewTimeSheet({ UserId, date }));
      return res?.data;
    } catch (error) {
      setSubmitting(false)
      setErrors({ description: error.response.data.message })
    }
  }
);

export const editTask = createAsyncThunk(
  "tasks/update",

  async ({ data, id, setSubmitting, onClose }, thunkAPI) => {
    try {
      const res = await axios.patch(
        `${baseURL}/tasks/update/${id}`,
        data
      );
      onClose();
      setSubmitting(false);
      swal("Updated", { icon: "success", timer: 1500, buttons: false })
      const UserId = localStorage.getItem('key');
      const date = data.date;
      thunkAPI.dispatch(viewTimeSheet({ UserId, date }));
      return res?.data;
    } catch (error) {
      setSubmitting(false)
    }
  }
);
export const submitTasks = createAsyncThunk(
  "tasks/submitTasks",

  async ({ date, setSubmit }, thunkAPI) => {
    const data = { date: date }
    try {
      const res = await axios.post(
        `${baseURL}/tasks/submit`, data);
      setSubmit(false)
      swal("Submmited", { icon: "success", timer: 1500, buttons: false })
      return res?.data;
    } catch (error) {
      setSubmit(false)
    }
  }
);

export const checkSubmit = createAsyncThunk(
  'tasks/checkSubmit',
  async ({ UserId, date }) => {
    const res = await axios
      .get(`${baseURL}/tasks/checksubmit/user/${UserId}/date/${date}`);
    return res.data;
  })

export const checkPending = createAsyncThunk(
  'tasks/checkPending',
  async ({ UserId }) => {
    const res = await axios
      .get(`${baseURL}/tasks/last30days/user/${UserId}`);
    return res.data;
  })

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
    [submitTasks.fulfilled]: (state) => {
      state.submitted = true;
    },
    [submitTasks.rejected]: (state) => {
      state.submitted = false
    },
    [checkSubmit.pending]: (state) => {
      state.submitted = false
    },
    [checkSubmit.fulfilled]: (state, { payload }) => {
      state.submitted = payload;
    },
    [checkSubmit.rejected]: (state) => {
      state.submitted = false
    },
    [checkPending.pending]: (state) => {
      state.submitted = false
    },
    [checkPending.fulfilled]: (state, { payload }) => {
      state.pending = payload;
    },
    [checkPending.rejected]: (state) => {
      state.submitted = false
    },
  },
})
export const { clearTimeSheet } = viewTimeSheetSlice.actions;
export default viewTimeSheetSlice.reducer;
