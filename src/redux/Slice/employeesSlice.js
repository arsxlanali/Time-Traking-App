import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
// import swal from 'sweetalert';
import history from "src/hisotry";

const baseUrl = "https://time-tracking-app-backend.herokuapp.com";

const initialState = {
  employeesView: [],
  isLoading: false,
  isScuessfull: false,
};

export const getEmployees = createAsyncThunk(
  "employees/getall",
  async () => {
    const res = await axios(`${baseUrl}/users/getall`);
    // toast.success(res.data.message);
    return res?.data?.users;
  }
);

export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async ({ values, setSubmitting }, thunkAPI) => {
    delete values["accept"];
    try {
      const res = await axios.post(
        `${baseUrl}/users/admin/addnewuser`, values);
      setSubmitting(false);
      history.push('/listemployees')
      toast.success(res.data.message);
      thunkAPI.dispatch(getEmployees());
      return res?.data;
    } catch (error) {
      setSubmitting(false);
    }
  }
);
export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async ({ id, setSubmitting, setModal }, thunkAPI) => {
    try {
      const res = await axios.delete(`${baseUrl}/users/admin/deleteuser/${id}`);
      setSubmitting(false);
      setModal(false);
      toast.success(res.data.message);
      // swal("Deleted", { icon: "success", timer: 1500, buttons: false })
      thunkAPI.dispatch(getEmployees());
      return res?.data;
    } catch (error) {
      setSubmitting(false);
      setModal(false);
    }
  }
);
export const editEmployee = createAsyncThunk(
  "employees/editEmployee",
  async ({ values, setSubmitting }, thunkAPI) => {
    const id = values["id"];
    delete values["id"];
    delete values["accept"];

    try {
      const res = await axios.patch(
        `${baseUrl}/users/admin/updateuser/${id}`,
        values);
      toast.success(res.data.message);
      // swal("Employee Update", { icon: "success", timer: 1500, buttons: false })
      history.goBack();
      thunkAPI.dispatch(getEmployees());
      return res?.data;
    } catch (error) {
      setSubmitting(false);
    }
  }
);
export const resetPassword = createAsyncThunk(
  "employees/resetPassword",
  async ({ values, setSubmitting }, thunkAPI) => {
    const id = values["id"];
    delete values["id"];
    delete values["accept1"];
    delete values["confirmPassword"];
    try {
      const res = await axios.patch(
        `${baseUrl}/users/admin/updateuser/${id}`,
        values);
      setSubmitting(false);
      toast.success(res.data.message);
      // swal("Password Update", { icon: "success", timer: 1500, buttons: false })
      history.goBack();
      thunkAPI.dispatch(getEmployees());
      return res?.data;
    } catch (error) {
      setSubmitting(false);
    }
  }
);
export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    clearEmployee: (state) => {
      state.employeesView = [];
    }
  },
  extraReducers: {
    [getEmployees.pending]: (state) => {
      state.isLoading = true;
    },
    [getEmployees.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.employeesView = payload;
    },
    [getEmployees.rejected]: (state) => {
      state.isLoading = false;
    },
    [addEmployee.pending]: (state) => {
      state.isLoading = true;
      state.isScuessfull = false;
    },
    [addEmployee.fulfilled]: (state) => {
      state.isLoading = false;
      state.isScuessfull = true;
    },
    [addEmployee.rejected]: (state) => {
      state.isLoading = false;
      state.isScuessfull = false;
    },
    [editEmployee.pending]: (state) => {
      state.isLoading = true;
      state.isScuessfull = false;
    },
    [editEmployee.fulfilled]: (state) => {
      state.isLoading = false;
      state.isScuessfull = true;
    },
    [editEmployee.rejected]: (state) => {
      state.isLoading = false;
      state.isScuessfull = false;
    },
    [resetPassword.pending]: (state) => {
      state.isLoading = true;
      state.isScuessfull = false;
    },
    [resetPassword.fulfilled]: (state) => {
      state.isLoading = false;
      state.isScuessfull = true;
    },
    [resetPassword.rejected]: (state) => {
      state.isLoading = false;
      state.isScuessfull = false;
    },
  },
});
export const { clearEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
