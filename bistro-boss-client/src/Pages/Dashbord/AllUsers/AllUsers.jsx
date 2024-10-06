import { useQuery } from "@tanstack/react-query";
import { AiTwotoneDelete } from "react-icons/ai";
import useAxios from "../../../Hooks/useAxios";
import { FaUser } from "react-icons/fa6";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSequre = useAxios();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSequre.get("/users");
      return res.data;
    },
  });

  const handleDeleteUser = (user) => {
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
        axiosSequre.delete(`/users/${user._id}`).then((res) => {
          //   console.log(res.data.deletedCoun);
          if (res.data.deletedCount > 0) {
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

  const handleMakeAdmin = (user) => {
    axiosSequre.patch(`/users/${user._id}`)
    .then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${user.name} is an Admin Now !`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="bg-gray-100 p-4">
      <div className="uppercase flex items-center  justify-between bg-white  p-4">
        <p>Total Users :{users.length} </p>

        <button className="btn btn-primary">Pay</button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{item.name}</div>
                    </div>
                  </div>
                </td>
                <td>{item.email}</td>
                <td>
                  {item.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      className="btn bg-orange-300"
                      onClick={() => handleMakeAdmin(item)}
                    >
                      <FaUser className="text-white text-xl" />
                    </button>
                  )}
                </td>
                <th>
                  <button
                    className="btn"
                    onClick={() => handleDeleteUser(item)}
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

export default AllUsers;
