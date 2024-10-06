import Swal from "sweetalert2";
import UseAuth from "../../../Hooks/UseAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxios from "../../../Hooks/useAxios";
import useCart from "../../../Hooks/useCart";

const Foodcard = ({ item }) => {
  const { image, price, name, recipe,_id } = item;
  // code for handle cart
  const { user } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSequre = useAxios();
  const[,refetch] =useCart();

  const handleCurt = () => {
   
    if (user && user.email) {
      // send cart item to the data basse
      // console.log(user.email , food);
      const cartItem ={
        menuId: _id,
        email:user.email,
        name,
        price,
        image
      }
      axiosSequre.post('/carts',cartItem)
      .then(res=>{
        // console.log(res.data)
        if(res.data.insertedId){
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${name} added`,
            showConfirmButton: false,
            timer: 1500
          });
          // refecth cart
          refetch()
        }
      })
    } else {
      Swal.fire({
        title: "You are not Login",
        text: "You won't be able to do this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login",
      }).then((result) => {
        if (result.isConfirmed) {
          // send the user to login
          navigate('/login',{state:{from:location}} )
        }
      });
    }
  };
  // code for handle cart

  return (
    <div className="card bg-base-100 sm:w-96 md:w-auto shadow-xl">
      <figure className="relative">
        <img src={image} alt="Shoes" />
        <p className=" absolute top-2 right-2 bg-slate-700 px-2 text-white text-sm py-1">
          ${price}
        </p>
      </figure>
      <div className="card-body text-center">
        <h2 className="card-title mx-auto">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-center">
          <button onClick={ handleCurt} className="btn btn-outline">
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default Foodcard;
