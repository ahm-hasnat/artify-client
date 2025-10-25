import React, { use, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";

import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";

const Signin = () => {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const { user, signIn, signInWithGoggle } = use(AuthContext);

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
       
        Swal.fire({
          title: "Success!",
          text: "Signed in Successfully!.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
      

        if (error.code === "auth/invalid-credential") {
          Swal.fire({
            title: "Signin Failed",
            text: "Email or password is incorrect.",
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }
      });
  };
  return (
    <div className="hero mt-16">
      <Helmet>
        <title>Artify - Sign In</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold mb-3 mt-4">Sign In now!</h1>
        </div>
        <div
          className="card  w-full h-full shrink-0 
    shadow border border-gray-200 nob"
        >
          <div className="card-body md:w-md ">
            <form onSubmit={handleSignIn} className="form w-full ">
              <label className="label font-semibold">Email</label>
              <br />
              <input
                type="email"
                name="email"
                className="input mb-1 mt-2 w-full kala"
                placeholder="Email"
              />
              <label className="label mt-3 font-semibold">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  className="input bg-[#F3F3F3] w-full mt-2 kala"
                  placeholder="Password"
                  required
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  type="button"
                  className="btn btn-sm text-gray-400 border-0 bg-[#F3F3F3] 
                  absolute top-3 right-1 kala"
                >
                  {showPass ? (
                    <FaEyeSlash className="text-lg"></FaEyeSlash>
                  ) : (
                    <FaEye className="text-lg"></FaEye>
                  )}
                </button>
              </div>
              <div>
                <Link to="/auth/forget" className="link link-hover text-xs mt-2">
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="btn btn-neutral w-full mt-4 mb-2 "
              >
                Signin
              </button>
              <p>
                Don't have an account?
                <span
                  onClick={() => navigate("/auth/register")}
                  className="text-blue-700 
          font-bold hover:underline cursor-pointer text-xs"
                >
                  Register
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
