import { useForm } from "react-hook-form";
import SectionTItle from "../../../Components/SectionTItle/SectionTItle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublis from "../../../Hooks/useAxiosPublis";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";

// code from imagebb about apii
const image_upload_key = import.meta.env.VITE_image_upload_key;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_upload_key}`;


const AddItems = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublis();
  const axiosSequre= useAxios();

  const onSubmit = async(data) => {
    console.log(data);
     // image upload to imagebb and get an url
     const imageFile = {image : data.image[0]}
    const res = await axiosPublic.post(image_upload_api,
      imageFile,{
      headers:{
        'content-type':'multipart/form-data'
      }
    });

    if(res.data.success){
      // now send the data to database with the url
      const menuitem ={
        name:data.name,
        category:data.category,
        price:parseFloat(data.price),
        recipe:data.recipe,
        image:res.data.data.display_url
      }
      // 
      const menuResponse = await axiosSequre.post('/menu',menuitem);
      console.log(menuResponse.data);
      if(menuResponse.data.insertedId){
        reset();
        // ?show popup
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${data.name} added to the menu`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
    console.log(res.data);
  };
  return (
    <div>
      <SectionTItle
        heading={"addd an item"}
        subHeading={"whats new"}
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
            {...register("name" ,{required:true})}
            required
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full "
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Catagory</span>
           
          </div>
          <select
          {...register("category" ,{required:true})}
          className="select select-bordered w-auto"
          defaultValue='default'
        >
          <option disabled value={'default'}>
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
            {...register("price",{required:true})}
            type="number"
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
          ></textarea>
        </label>
        <input {...register('image',{required:true})} type="file" className="file-input w-full max-w-xs" />

        <br />
        <button className="btn w-1/2 btn-outline btn-secondary">Add Items <FaUtensils></FaUtensils> </button>
        
      </form>
    </div>
  );
};

export default AddItems;
