import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


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
  'tasks/findOneUserTasks',
  async (thunkAPI) => {
    try {
      const res = await axios
        .get(`${baseURL}/tasks/findOneUserTasks/630f0020de145d523f8d365b`, header);

      return res.data;

    }
    catch (error) {

      return thunkAPI.rejectWithValue("Didn't get data");

    }


  })


export const viewTimeSheetSlice = createSlice({
  name: 'viewTimeSheet',
  initialState,
  reducers: {},
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


export default viewTimeSheetSlice.reducer
