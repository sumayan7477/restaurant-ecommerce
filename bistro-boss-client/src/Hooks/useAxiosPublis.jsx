import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'http://localhost:5000'
})
const useAxiosPublis = () => {
    return axiosPublic;
};

export default useAxiosPublis;