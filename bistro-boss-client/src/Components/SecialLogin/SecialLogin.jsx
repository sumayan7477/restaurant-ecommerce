import { FaGoogle } from "react-icons/fa6";
import UseAuth from "../../Hooks/UseAuth";
import useAxiosPublis from "../../Hooks/useAxiosPublis";
import { useNavigate } from "react-router-dom";

const SecialLogin = () => {
    const {googleSignin}= UseAuth();
    const axiosPublic = useAxiosPublis();
    const navigate = useNavigate();

    const handleGoogleSignin =()=>{
        googleSignin()
        .then(res=>{
            console.log(res.user);
            const userInfo = {
              email :res.user?.email,
              name :res.user?.displayName
            }
            axiosPublic.post('/users',userInfo)
            .then(res=>{
              console.log(res.data);
              navigate('/');
            })
        })
    }
  return (
    <div>
      <div className="flex justify-center ">
        <button onClick={handleGoogleSignin} className="btn btn-circle btn-outline">
          <FaGoogle />
        </button>
      </div>
    </div>
  );
};

export default SecialLogin;
