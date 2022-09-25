import axios from 'axios';
import { toast } from "react-toastify";
import { clearEmployee } from './redux/Slice/employeesSlice';
import { clearProjects } from './redux/Slice/projectSlice';
import { clearLogin } from './redux/Slice/loginSlice';
import { clearTimeSheet } from './redux/Slice/viewTimeSheetSlice';

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
                toast.error(error.message)
            }
            else if (error.response.status === 401) {
                if (error?.response?.data?.message !== 'Please check your login credentials') {
                    toast.error("Your session is expired!")
                    setTimeout(() => {
                        localStorage.clear();
                        store.dispatch(clearEmployee())
                        store.dispatch(clearProjects())
                        store.dispatch(clearLogin())
                        store.dispatch(clearTimeSheet())
                        history.push('/login')
                    }, 4000)
                }
                else {
                    // setErrors({ email: error.response.data.message })

                    toast.error(error?.response?.data?.message)

                }

            }
            else {
                // console.log("this is ", error)
                toast.error(error?.response?.data?.message[0])
            }
            return Promise.reject(error);
        });
    },
};

export default NetworkService;