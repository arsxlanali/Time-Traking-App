// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";


// const baseURL = "https://time-tracking-app-backend.herokuapp.com";
// const Token=localStorage.get('Token');
// console.log(Token)
// const Role=localStorage.get('Role');
// console.log(Role)

// const initialState = {
//   entities: [],
//   loading: false,
// }

// const header = {
//   headers:{
//    accessToken : Token,

//   }
// };

// export const viewTimeSheet = createAsyncThunk(
//   'users/login',
//   async () => {
//     axios
//       .get(`${baseURL}/users/login${Token}`, header)
//       .then((response) => {
//         console.log(response.data);
//         return response.data;
//       }).catch((error) => {

//         return Promise.reject (error)
//       }
//       )

//   })


// export const viewTimeSheetSlice = createSlice({
//   name: 'viewTimeSheet',
//   initialState,
//   reducers: {},
//   extraReducers: {
//     [viewTimeSheet.pending]: (state) => {
//       state.loading = true
//     },
//     [viewTimeSheet.fulfilled]: (state, { payload }) => {
//       state.loading = false
//       state.entities = payload

//     },
//     [viewTimeSheet.rejected]: (state) => {
//       state.loading = false
//     },
//   },
// })


// export default viewTimeSheetSlice.reducer
