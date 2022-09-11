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
  async (id,thunkAPI) => {
    try {
      const res = await axios
        .get(`${baseURL}/tasks/user/${id}`, header);
      return res.data;

    }
    catch (error) {

      return thunkAPI.rejectWithValue("Didn't get data");

    }


  })


 
export const deleteTask = createAsyncThunk(
  "tasks/delete",

  async (id, thunkAPI) => {
      console.log("taskid",id)
    try {
      const res = await axios.delete(
        `${baseURL}/tasks/delete/${id}`,
        header
      );
        
      thunkAPI.dispatch(viewTimeSheet(localStorage.getItem('key')));
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("task not found");
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks/create",

  async (taskInfo,thunkAPI) => {
    
    try {
      const res = await axios.post(
        `${baseURL}/tasks/create`,
        taskInfo,
        header,
        );
        console.log("task info",taskInfo)
      thunkAPI.dispatch(viewTimeSheet(localStorage.getItem('key')));
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("task not found");
    }
  }
);

export const editTask = createAsyncThunk(
  "tasks/update",

  async ({ taskInfo, id },thunkAPI) => {
    const data = taskInfo();
    console.log("task id in slice ",id);
    console.log("task data in slice ",data);
    try {
      const res = await axios.patch(
        `${baseURL}/tasks/update/${id}`,
        data,
        header,
        );

      thunkAPI.dispatch(viewTimeSheet(localStorage.getItem('key')));
      console.log(res.data);
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

export default viewTimeSheetSlice.reducer;
