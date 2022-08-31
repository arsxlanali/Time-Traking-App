import { configureStore } from '@reduxjs/toolkit'
import slideBarSliceReducer from './sideBarSlice';
import  loginSliceReducer  from './loginSlice';
import  viewTimeSheetReducer  from './loginSlice';
export default configureStore({
    reducer: {
        slideBar: slideBarSliceReducer,
        login:loginSliceReducer,
        viewTimeSheet:viewTimeSheetReducer
    },


});

