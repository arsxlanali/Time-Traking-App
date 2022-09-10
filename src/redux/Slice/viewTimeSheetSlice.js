import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

const baseURL = "https://time-tracking-app-backend.herokuapp.com";
const Token = localStorage.getItem('Token');
console.log(Token)
const Role = localStorage.getItem('Role');
console.log(Role)
const id = localStorage.getItem('key');
const initialState = {
  timeSheet: [],
  loading: false,
}

const header = {
  headers: {
    Authorization: `Bearer ${Token}`,

  }
};

export const viewTimeSheet = createAsyncThunk(
  'tasks/user',
  async ({ UserId, date }, thunkAPI) => {
    // console.log("this is id and date", UserId, date)
    try {
      const res = await axios
        .get(`${baseURL}/tasks/user/${UserId}/date/${date}`, header);
      return res.data;

    }
    catch (error) {

      return thunkAPI.rejectWithValue("Didn't get data");

    }


  })



export const deleteTask = createAsyncThunk(
  "tasks/delete",

  async ({ _id, date }, thunkAPI) => {
    console.log("taskid", id)
    try {
      const res = await axios.delete(
        `${baseURL}/tasks/delete/${_id}`,
        header
      );
      const UserId = localStorage.getItem('key');
      // const date = data.date;
      thunkAPI.dispatch(viewTimeSheet({ UserId, date }));
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("task not found");
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks/create",

  async ({ data }, thunkAPI) => {

    try {
      const res = await axios.post(
        `${baseURL}/tasks/create`,
        data,
        header,
      );
      // console.log("task info", taskInfo)
      // history.push('/')
      const UserId = localStorage.getItem('key');
      const date = data.date;
      thunkAPI.dispatch(viewTimeSheet({ UserId, date }));
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("task not found");
    }
  }
);

export const editTask = createAsyncThunk(
  "tasks/update",

  async ({ data, id }, thunkAPI) => {
    // setTimeout(console.log("this is edit task,", taskInfo, id), 4000)

    // const data = taskInfo();
    // console.log("task id in slice ", data, id);
    // console.log("task data in slice ", data);
    try {
      const res = await axios.patch(
        `${baseURL}/tasks/update/${id}`,
        data,
        header,
      );
      const UserId = localStorage.getItem('key');
      const date = data.date;
      thunkAPI.dispatch(viewTimeSheet({ UserId, date }));
      // console.log(res.data);
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("task not updated");
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
      state.loading = false
    },

  },

})
export const { clearTimeSheet } = viewTimeSheetSlice.actions;
export default viewTimeSheetSlice.reducer;
