import { useLoaderData } from "react-router-dom";
import SectionTItle from "../../../Components/SectionTItle/SectionTItle";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublis from "../../../Hooks/useAxiosPublis";
import useAxios from "../../../Hooks/useAxios";
import { FaUtensils } from "react-icons/fa6";
// code from imagebb about apii
const image_upload_key = import.meta.env.VITE_image_upload_key;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_upload_key}`;


const UpdateItem = () => {
  const { register, handleSubmit, reset } = useForm();
  const {name , category , recipe, price , image, _id} = useLoaderData();
  const axiosPublic = useAxiosPublis();
  const axiosSequre = useAxios();

  const onSubmit = async (data) => {
    try{
        console.log(data);
    // image upload to imagebb and get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_upload_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      // now send the data to database with the url
      const menuitem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };
      //
      const menuResponse = await axiosSequre.patch(`/menu/${_id}`, menuitem);
      console.log(menuResponse.status); // Make sure this exists
      console.log(menuResponse.data);
      if (menuResponse.data.modifiedCount>0) {
        reset();
        // ?show popup
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${data.name} updated `,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    console.log(res.data);
    }catch (error) {
        if (error.response) {
          // Server responded with a status other than 200
          console.error('Error status:', error.response.status);
        } else if (error.request) {
          // No response received from server
          console.error('No response received', error.request);
        } else {
          // Other errors
          console.error('Error:', error.message);
        }
      }
  };
  return (
    <div>
      <SectionTItle
        subHeading={"Refresh info"}
        heading={"update item"}
      ></SectionTItle>

      
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4 justify-center items-center bg-gray-50 rounded m-8 p-10"
      >
        <label className="form-control w-full col-span-2">
          <div className="label">
            <span className="label-text"> Name</span>
          </div>
          <input
            {...register("name", { required: true })}
            required
            type="text"
            defaultValue={name}
            placeholder="Type here"
            className="input input-bordered w-full "
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Catagory</span>
          </div>
          <select
            {...register("category", { required: true })}
            className="select select-bordered w-auto"
            defaultValue={category}
          >
            <option disabled value={"default"}>
              Select the catagory
            </option>
            <option value="salad">salad</option>
            <option value="pizza">pizza</option>
            <option value="pasta">pasta</option>
          </select>
        </label>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text"> Price</span>
          </div>
          <input
            {...register("price", { required: true })}
            type="number"
            defaultValue={price}
            placeholder="Type here"
            className="input input-bordered w-full "
          />
        </label>
        <label className="form-control col-span-2">
          <div className="label">
            <span className="label-text">Recipe Details</span>
          </div>
          <textarea
            {...register("recipe")}
            className="textarea textarea-bordered h-24"
            placeholder="Bio"
            defaultValue={recipe}
          ></textarea>
        </label>
        
        <input
          {...register("image", { required: true })}
          type="file"
          className="file-input w-full max-w-xs"
        />
        <img className="w-1/2" src={image} alt="" />

        <button className="btn w-1/2 btn-outline btn-secondary">
          Update Items <FaUtensils></FaUtensils>{" "}
        </button>
      </form>
    </div>
  );
};

export default UpdateItem;
