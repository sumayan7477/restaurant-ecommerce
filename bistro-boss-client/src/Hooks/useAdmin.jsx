import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import useAxios from "./useAxios";
// use admin for vrfify admin 

const useAdmin = () => {
    const {user,loading}= UseAuth();
    const axiosSequre = useAxios();
    const {data :isAdmin , isPending: isAdminLoading} = useQuery({
        queryKey:[user?.email , 'isAdmin'],
        enabled:!loading,
        queryFn:async()=>{
            const res= await axiosSequre.get(`/users/admin/${user.email}`);
            console.log(res.data);
            return res.data?.admin;
        }
    })
    return [isAdmin , isAdminLoading];
};

export default useAdmin;