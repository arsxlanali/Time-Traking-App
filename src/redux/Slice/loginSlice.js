import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import swal from 'sweetalert';
import history from "src/hisotry";
import { clearProjects } from "./projectSlice";
import { clearEmployee } from "./employeesSlice";
import { clearTimeSheet } from "./viewTimeSheetSlice";
const baseURL = "https://time-tracking-app-backend.herokuapp.com";

const initialState = {
  entities: [],
  isLoading: false,
}



export const login = createAsyncThunk(
  'users/login',
  async ({ values, history, setSubmitting }, thunkAPI) => {
    axios
      .post(`${baseURL}/users/login`, values)
      .then((response) => {
        setSubmitting(false);
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
        setSubmitting(false);
        if (error.response.data == 'Unauthorized') {

          setTimeout(history.push('/login'), 2000)
          swal("Opps!", "Session Expired", "error")
          localStorage.clear();
          thunkAPI.dispatch(clearEmployee())
          thunkAPI.dispatch(clearProjects())
          thunkAPI.dispatch(clearLogin())
          thunkAPI.dispatch(clearTimeSheet())
        }
        else {
          swal("Opps!", error.response.data.message, "error")

        }

      }
      )

  })
export const PasswordRest = createAsyncThunk(
  "PasswordRest",
  async ({ values, history, setSubmitting }, thunkAPI) => {

    const id = values["id"];
    delete values["id"];
    delete values["accept2"];
    const isDefault = localStorage.getItem("isDefualt");
    if (isDefault) {
      values["oldPassword"] = "tdc@1234";
    }
    try {
      const res = await axios.post(
        `${baseURL}/users/resetPassword/${id}`,
        values,
      );
      setSubmitting(false);
      history.push('/viewsheet');
      swal("Password Reset", { icon: "success" })
      return res?.data;
    } catch (error) {
      setSubmitting(false);
      if (error.response.data == 'Unauthorized') {

        setTimeout(history.push('/login'), 2000)
        swal("Opps!", "Session Expired", "error")
        localStorage.clear();
        thunkAPI.dispatch(clearEmployee())
        thunkAPI.dispatch(clearProjects())
        thunkAPI.dispatch(clearLogin())
        thunkAPI.dispatch(clearTimeSheet())
      }
      else {
        swal("Opps!", error.response.data.message, "error")

      }
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
    },
    // logOut: (state) => {
    //   state.
    // }
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
