import React, { use, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const { createUser, updateUser } = use(AuthContext);
  const [passError, setPassError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries());

    const { name, photo, email, password } = userData;

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasLength = password.length >= 6;

    if (!hasLength && !hasUpper && !hasLower) {
      setPassError(
        "Password must be at least 6 characters, include at least one uppercase,one lowercase letter."
      );
      return;
    } else if (!hasLength) {
      setPassError("Password must be at least 6 characters.");
      return;
    } else if (!hasUpper) {
      setPassError("Include at least one uppercase letter.");
      return;
    } else if (!hasLower) {
      setPassError("Include at least one lowercase letter.");
      return;
    } else {
      setPassError("");
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        updateUser({
          displayName: name,
          photoURL: photo,
        }).then(() => {
          Swal.fire({
            title: "Success!",
            text: "Registration completed.!!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Swal.fire({
            title: "User already exists!",
            icon: "warning",
            text: "Please log in!",
            draggable: true,
          });
          navigate("/auth/signin");
        }
      });
  };

  return (
    <div className="hero mt-12">
      <Helmet>
        <title>Artify - Register</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex ">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold mb-3 mt-4">Register now!</h1>
        </div>
        <div
          className="card   h-full  
    shadow-2xl border border-gray-200 nob"
        >
          <div className="card-body md:w-lg ">
            <form onSubmit={handleRegister} className="form w-full">
              <label className="label">Name</label>
              <br />
              <input
                type="text"
                name="name"
                className="input mb-1 mt-2 w-full kala"
                placeholder="name"
              />
              <br />
              <label className="label">Email</label>
              <br />
              <input
                type="email"
                name="email"
                className="input mb-1 mt-2 w-full kala"
                placeholder="Email"
              />
              <br />
              <label className="label">Photo URL</label>
              <br />
              <input
                type="link"
                name="photo"
                className="input mb-1 mt-2 w-full kala"
                placeholder="photo"
              />
              <br />
              <label className="label mt-3">Password</label>
              <br />
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  className="input bg-[#F3F3F3] w-full mt-2 kala"
                  placeholder="Password"
                  required
                />
                {passError && <p className="text-xs text-error">{passError}</p>}
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
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-sm "
                  required
                />
                <p className="text-xs">Accept terms & conditions</p>
              </div>
              <button
                type="submit"
                className="btn btn-neutral w-full mt-4 mb-2 "
              >
                Register
              </button>
              <p>
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/auth/signin")}
                  className="text-blue-700 
          font-bold hover:underline cursor-pointer text-xs"
                >
                  Signin
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
