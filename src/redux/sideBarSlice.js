import { createSlice } from "@reduxjs/toolkit";

export const sideBarSlice = createSlice({
    name: "sideBar",

    initialState: {
        sidebarShow: 'responsive',
        asideShow: false,
        darkMode: false
    },
    reducers: {

        set: (state, rest) => {
            return { ...state, ...rest }

        },


    }

})




export const { set } = sideBarSlice.actions;

export default sideBarSlice.reducer;