import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "https://time-tracking-app-backend.herokuapp.com";

const initialState = {
  entities: [],
  isLoading: false,
}



export const login = createAsyncThunk(
  'users/login',
  async ({ values, history }, thunkAPI) => {
    axios
      .post(`${baseURL}/users/login`, values)
      .then((response) => {
        localStorage.setItem("Token", response.data.accessToken);
        localStorage.setItem("Role", response.data.data.role);
        localStorage.setItem("key", response.data.data._id)
        localStorage.setItem("isDefualt", response.data.data.isDefault)
        if (response?.data?.data?.isDefault) {
          history.push('/passwordrest', response?.data?.data?._id)
        }
        else {
          history.push('/viewsheet')
        }
        return response.data;
      }).catch((error) => {

        return Promise.reject(error)
      }
      )

  })
export const PasswordRest = createAsyncThunk(
  "PasswordRest",
  async ({ values, history }, thunkAPI) => {

    const id = values["id"];
    delete values["id"];
    delete values["accept2"];
    // console.log("this is isdefyalt", localStorage.getItem("isDefualt"))
    const isDefault = localStorage.getItem("isDefualt");
    if (isDefault) {
      values["oldPassword"] = "tdc@1234";
    }
    console.log("this is defualt", values)
    try {
      const res = await axios.post(
        `${baseURL}/users/resetPassword/${id}`,
        values,
      );
      history.push('/viewsheet');
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  reducers: {
    clearLogin: (state) => {
      state.entities = [];
    }
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.entities = payload

    },
    [PasswordRest.rejected]: (state) => {
      state.isLoading = false;
    },
    [PasswordRest.pending]: (state) => {
      state.isLoading = true;
    },
    [PasswordRest.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.entities = payload

    },
    [PasswordRest.rejected]: (state) => {
      state.isLoading = false;
    },
  },
})

export const { clearLogin } = loginSlice.actions;
export default loginSlice.reducer
