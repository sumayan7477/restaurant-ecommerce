import axios from "axios";
// import { useNavigate } from "react-router-dom";
import UseAuth from "./UseAuth";

export const axiosSequre = axios.create({
    baseURL:'http://localhost:5000'
})
const useAxios = () => {
    // const navigate = useNavigate();
    const {logout}= UseAuth();
    // use of interceptor getting token for every single call to the api
    axiosSequre.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token');
        console.log('request stoped by interceptor');
        config.headers.authorization = `Bearer ${token}`;
        return config;
    },function(error){
        return Promise.reject(error);
    });

    // copy pest code from axios docd interceptor for status 404 401
    axiosSequre.interceptors.response.use(function(response){
        return response;
    }, async(error)=>{
        const status = error?.response?.status;
        console.log('status error',status, error);
        // for logout and navigate is status is 501 404
        if(status===401|| status ===403){
            await logout();
            // navigate('/login')
        }
        return Promise.reject(error);
    })
    return axiosSequre;
};

export default useAxios;