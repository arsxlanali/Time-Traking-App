import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "https://time-tracking-app-backend.herokuapp.com";

const initialState = {
  entities: [],
  loading: false,
  isScuessfull: false,
}



export const login = createAsyncThunk(
  'users/login',
  async (data, thunkAPI) => {
    axios
      .post(`${baseURL}/users/login`, data)
      .then((response) => {
        localStorage.setItem("Token", response.data.accessToken);

        localStorage.setItem("Role", response.data.data.role);
        localStorage.setItem("key", response.data.data._id)
        console.log(response.data)
        // navigate()
        // console.log(response.data)
        return response.data;
      }).catch((error) => {

        return Promise.reject(error)
      }
      )

  })


export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state) => {
      state.isLoading = true;
      state.isScuessfull = false;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isScuessfull = true;
      state.entities = payload

    },
    [login.rejected]: (state) => {
      state.isLoading = false;
      state.isScuessfull = false;
    },
  },
})


export default loginSlice.reducer
