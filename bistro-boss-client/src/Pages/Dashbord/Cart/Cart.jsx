import Swal from "sweetalert2";
import useCart from "../../../Hooks/useCart";
import { AiTwotoneDelete } from "react-icons/ai";
import useAxios from "../../../Hooks/useAxios";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart] = useCart();
  const[,refetch] =useCart();
  const TotalPrice = cart.reduce((total, item) => total + item.price, 0);
  const axiosSequre = useAxios();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSequre.delete(`/carts/${id}`).then((res) => {
          //   console.log(res.data.deletedCoun);
          if (res.data.deletedCount> 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div className="bg-gray-100 p-4">
      <div className="uppercase flex items-center  justify-between bg-white  p-4">
        <p>Total Order : {cart.length}</p>
        <p>Total peice :{TotalPrice}</p>

        <Link disabled={!cart.length} to='/dashbord/payment' className="btn btn-primary">Pay</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                    </div>
                  </div>
                </td>
                <td>{item.price}</td>

                <th>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn"
                  >
                    <AiTwotoneDelete className="text-red-500 text-2xl" />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
