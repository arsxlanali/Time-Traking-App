import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
// import swal from 'sweetalert';
import history from "src/hisotry";

const baseURL = "https://time-tracking-app-backend.herokuapp.com";

const initialState = {
  entities: [],
  isLoading: false,
}


export const login = createAsyncThunk(
  'users/login',
  async ({ values, setSubmitting, setErrors }) => {
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
          setTimeout(() => { history.push('/passwordrest', response?.data?.data?._id) }, 1000)
        }
        else {
          setTimeout(() => { history.push('/viewsheet') }, 1000)
        }
        toast.success(response?.data?.message);
        return response?.data;
      }).catch((error) => {
        setSubmitting(false);
        // console.log("this is error", error)
        setErrors({ email: "Invalid credentials" })

      })
  })
export const PasswordRest = createAsyncThunk(
  "PasswordRest",
  async ({ values, setSubmitting, setErrors }) => {

    const id = values["id"];
    delete values["id"];
    // delete values["accept2"];
    const isDefault = localStorage.getItem("isDefualt");
    if (isDefault) {
      values["oldPassword"] = "tdc@1234";
    }
    console.log("This is pass", values)
    try {
      const res = await axios.post(
        `${baseURL}/users/resetPassword/${id}`,
        values
      );
      localStorage.setItem('isDefualt', false)
      setSubmitting(false);
      setTimeout(() => { history.push('/viewsheet') }, 3000)
      toast.success(res.data.message);
      // swal("Password Reset", { icon: "success", timer: 1500, buttons: false })
      return res?.data;
    } catch (error) {
      setSubmitting(false);
      // setErrors({ email: error.response.data.message })
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
