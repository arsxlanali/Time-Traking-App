import { configureStore } from '@reduxjs/toolkit'
import slideBarSliceReducer from './sideBarSlice';
import projectSliceReducer from  './projectSlice';
export default configureStore({
    reducer: {
        slideBar: slideBarSliceReducer,
      
    },


});

