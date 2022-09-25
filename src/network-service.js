import axios from 'axios';
import { clearEmployee } from './redux/Slice/employeesSlice';
import { clearProjects } from './redux/Slice/projectSlice';
import { clearLogin } from './redux/Slice/loginSlice';
import { clearTimeSheet } from './redux/Slice/viewTimeSheetSlice';
import swal from 'sweetalert';

const NetworkService = {
    setupInterceptorsRequest: () => {
        axios.interceptors.request.use(request => {
            request.headers.Authorization = `Bearer ${localStorage.getItem("Token")}`;
            return request;
        })
    },
    setupInterceptorsResponse: (store, history) => {
        axios.interceptors.response.use(response => {
            return response;
        }, error => {
            if (error.code === "ERR_NETWORK") {
                swal("Opps!", error.message, { icon: "error", timer: 1500, buttons: false })
            }
            else if (error.response.status === 401) {
                if (error.response.data.message !== 'Please check your login credentials') {
                    swal('Login Again', 'Your session is out', { timer: 4000, buttons: false })
                    setTimeout(() => {
                        localStorage.clear();
                        store.dispatch(clearEmployee())
                        store.dispatch(clearProjects())
                        store.dispatch(clearLogin())
                        store.dispatch(clearTimeSheet())
                        history.push('/login')
                    }, 4000)
                }
            }
            else {
                swal("Opps!", error.response.data.message, { icon: "error", timer: 1500, buttons: false })
            }
            return Promise.reject(error);
        });
    },
};

export default NetworkService;