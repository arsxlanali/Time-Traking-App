import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "https://time-tracking-app-backend.herokuapp.com";

const initialState = {
  entities: [],
  loading: false,
}



export const login = createAsyncThunk(
  'users/login',
  async ({ data, navigate }, thunkAPI) => {
    axios
      .post(`${baseURL}/users/login`, data)
      .then((response) => {
        localStorage.setItem("Token", response.data.accessToken);

        localStorage.setItem("Role", response.data.data.role);
        localStorage.setItem("key", response.data.data._id)
        console.log(response.data)
        navigate()
        console.log(response.data)
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
      state.loading = true
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.entities = payload

    },
    [login.rejected]: (state) => {
      state.loading = false
    },
  },
})


export default loginSlice.reducer
