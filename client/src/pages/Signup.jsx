import { useForm } from "react-hook-form";
import {useMutation} from "@tanstack/react-query"
import axios from "axios"
import { useNavigate , Link} from "react-router-dom";
import { useContext } from "react";
import {UserContext} from "../context/UserContextProvider.jsx"

function Signup() {
  const navigate = useNavigate()
  const {setUser} = useContext(UserContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submit = (data)=>{
    axios.post("/api/auth/signup" , data).then((res)=>{
      setUser(res.data)
      localStorage.setItem("user",res.data._id)
      navigate("/")
    })
  }
  const{mutateAsync} = useMutation({
    mutationFn:submit,
  })
  const onsubmit = (data) => {
    mutateAsync(data)
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(onsubmit)}
        method="post"
        className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8  md:mt-0"
      >
        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
          Sign Up
        </h2>
        <div className=" mb-4">
          <label
            htmlFor="full-name"
            className="leading-7 text-sm text-gray-600"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: true,
            })}
            name="name"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-600">Name is required</p>
          )}
        </div>
        <div className=" mb-4">
          <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
            Number
          </label>
          <input
            type="text"
            id="phone"
            {...register("phone", {
              required: true,
              minLength: 10,
            })}
            name="phone"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          {errors.phone?.type === "required" && (
            <p className="text-red-600">Phone number is required</p>
          )}
          {errors.phone?.type === "minLength" && (
            <p className="text-red-600">minimum 10 characters are required</p>
          )}
        </div>
        <div className=" mb-4">
          <label htmlFor="password" className="leading-7 text-sm text-gray-600">
            Password
          </label>
          <input
            type="text"
            id="password"
            {...register("password", {
              required: true,
              minLength: 8,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            })}
            name="password"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-600">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-600">minimum 8 characters are required</p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-600">
              password should contain atlest one upper case letter, lower case
              letter, special case character and number
            </p>
          )}
        </div>
        <div className=" mb-4">
          <label
            htmlFor="cpassword"
            className="leading-7 text-sm text-gray-600"
          >
            Confirm Password
          </label>
          <input
            type="text"
            id="cpassword"
            {...register("cpassword", {
              required: true,
              minLength: 8,
            })}
            name="cpassword"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          {errors.cpassword?.type === "required" && (
            <p className="text-red-600">Password is required</p>
          )}
          {errors.cpassword?.type === "minLength" && (
            <p className="text-red-600">minimum 8 characters are required</p>
          )}
        </div>
        <button
          type="submit"
          className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Sign up
        </button>
        <p className="text-xs text-gray-500 mt-3">
        <Link to="/login" className="text-blue-400">already have an account ? Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
