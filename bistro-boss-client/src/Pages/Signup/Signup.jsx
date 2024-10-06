import { useForm } from "react-hook-form";
import img from "../../assets/others/authentication2.png";
import "../Login/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublis from "../../Hooks/useAxiosPublis";
import SecialLogin from "../../Components/SecialLogin/SecialLogin";


// form using reack hook form

const Signup = () => {
  const axiosPublic = useAxiosPublis();
  const { creatUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    creatUser(data.email, data.password).then((result) => {
      const loggerUser = result.user;
      console.log(loggerUser);
      updateUserProfile(data.name, data.PhotoURL)
        .then(() => {
          console.log("user profile updated");
          // creat user entry in the database
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            console.log(res);
            if (res.data.insertedId) {
              reset();
              console.log("user added");
              Swal.fire({
                position: "center",
                icon: "success",
                title: "User Created Successfull",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
        })
        .catch((error) => console.log(error));
    });
  };
  //   console.log(watch("example")) // watch input value by passing the name of it

  return (
    // use helmate
    <div className="hero hero-pattern bglogin ">
      <div className="hero-content   lg:flex  w-10/12 mx-auto my-24 hero-pattern  p-16 shadow-xl">
        <div className="text-center lg:text-left">
          <img src={img} alt="" />
        </div>
        <div className="card  w-full max-w-sm shrink-0 ">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                {...register("email")}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                {...register("password", {
                  required: true,
                  maxLength: 20,
                  minLength: 5,
                  pattern: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/,
                })}
                name="password"
                className="input input-bordered"
              />
              {errors.password && (
                <span className="text-red-500"> Required</span>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500"> Must be 6 Charectar</p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500">
                  {" "}
                  Must have number and special Character
                </p>
              )}

              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <label className="label">Name</label>
              <input
                type="text"
                placeholder="name"
                name="captcha"
                {...register("name", { required: true })}
                className="input input-bordered"
              />
              {/* errors will return when field validation fails  */}
              {errors.name && <span className="text-red-500"> Required</span>}
            </div>
            <div className="form-control">
              <label className="label">Photo URL</label>
              <input
                type="text"
                placeholder="Photo URL"
                {...register("PhotoURL", { required: true })}
                className="input input-bordered"
              />
              {/* errors will return when field validation fails  */}
              {errors.PhotoURL && (
                <span className="text-red-500">Photo URL is Required</span>
              )}
            </div>
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Signup"
                className="btn btn-primary"
              ></input>
            </div>
            
            <p>
              have a account{" "}
              <Link className="text-orange-400 " to="/login">
                Login
              </Link>
            </p>
            <p className="mt-4">or, signin with another</p>
            <SecialLogin></SecialLogin>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
