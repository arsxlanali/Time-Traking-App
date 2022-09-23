import axios from 'axios';
import { clearEmployee } from './redux/Slice/employeesSlice';
import { clearProjects } from './redux/Slice/projectSlice';
import { clearLogin } from './redux/Slice/loginSlice';
import { clearTimeSheet } from './redux/Slice/viewTimeSheetSlice';
export default {
    setupInterceptors: (store, history) => {
        axios.interceptors.response.use(response => {
            return response;
        }, error => {
            // console.log("thishishshsihs", error)
            if (error.response.status === 401) {
                localStorage.clear();
                store.dispatch(clearEmployee())
                store.dispatch(clearProjects())
                store.dispatch(clearLogin())
                store.dispatch(clearTimeSheet())
                history.push('/login')
            }
            if (error.response.status === 404) {
                history.push('/not-found');
            }
            return Promise.reject(error);
        });
    },
};