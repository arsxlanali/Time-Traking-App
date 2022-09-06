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
  async ({ values, history }, thunkAPI) => {
    axios
      .post(`${baseURL}/users/login`, values)
      .then((response) => {
        localStorage.setItem("Token", response.data.accessToken);
        localStorage.setItem("Role", response.data.data.role);
        localStorage.setItem("key", response.data.data._id)

        if (response?.data?.data?.isDefault) {
          history.push('/passwordrest', response?.data?.data?._id)
        }
        else {
          history.push('/dashboard')
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
    values["oldPassword"] = "tdc@1234";
    // console.log("This is my id:", values);
    try {
      const res = await axios.post(
        `${baseURL}/users/resetPassword/${id}`,
        values,
      );
      // console.log("this is reset password", res?.data);
      // thunkAPI.dispatch(getEmployees());
      history.push('/dashboard');
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
