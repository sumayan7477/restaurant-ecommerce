import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import UseAuth from "./UseAuth";

const useCart = () => {
    // with tan stack query
    const axiousSequre = useAxios();
    const {user}= UseAuth();
    const {refetch ,data:cart=[]}= useQuery({
        queryKey:['cart', user?.email],
        queryFn:async ()=>{
            const res = await axiousSequre.get(`/carts?email=${user.email}`)
            return res.data
        }
    })
    return [cart, refetch]

};

export default useCart;