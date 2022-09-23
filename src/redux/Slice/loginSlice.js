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
  async ({ values, history, setSubmitting, setErrors }) => {
    axios
      .post(`${baseURL}/users/login`, values)
      .then((response) => {
        setSubmitting(false);
        localStorage.setItem("Token", response.data.accessToken);
        localStorage.setItem("Role", response.data.data.role);
        localStorage.setItem("key", response.data.data._id)
        localStorage.setItem("Department", response.data.data.department)
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
        if (error.code == "ERR_NETWORK") {
          swal("Opps!", error.message, { icon: "error", timer: 1500, buttons: false })
        } else {
          setErrors({ email: error.response.data.message })
        }
      })
  })
export const PasswordRest = createAsyncThunk(
  "PasswordRest",
  async ({ values, history, setSubmitting, setErrors }) => {

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
        values
      );
      setSubmitting(false);
      history.push('/viewsheet');
      swal("Password Reset", { icon: "success" })
      return res?.data;
    } catch (error) {
      setSubmitting(false);
      if (error.code == "ERR_NETWORK") {
        swal("Opps!", error.message, { icon: "error", timer: 1500, buttons: false })
      } else {
        setErrors({ email: error.response.data.message })
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
