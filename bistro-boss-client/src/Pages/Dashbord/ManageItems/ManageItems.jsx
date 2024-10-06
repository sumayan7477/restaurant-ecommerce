import { AiTwotoneDelete } from "react-icons/ai";
import { FaRegPenToSquare } from "react-icons/fa6";
import SectionTItle from "../../../Components/SectionTItle/SectionTItle";
import UseMenu from "../../../Hooks/UseMenu";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";
import { Link } from "react-router-dom";

const ManageItems = () => {
  const [menu, ,refetch] = UseMenu();
  const axiosSequre = useAxios();


  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const  res = await axiosSequre.delete(`/menu/${item._id}`);
        console.log(res.data);
        if (res.data.deletedCount> 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
      }
    });
  };
  return (
    <div>
      <SectionTItle
        subHeading={"Hurry up"}
        heading={"manage All items"}
      ></SectionTItle>
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
            {menu.map((item, index) => (
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
                <Link to={`/dashbord/updateItem/${item._id}`} className="btn">
                <FaRegPenToSquare className="text-red-500 text-2xl"/>
                </Link>
                </th>

                <th>
                    
                  <button
                    onClick={() => handleDelete(item)}
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

export default ManageItems;
