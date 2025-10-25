import React, { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const Register = () => {
  const { createUser, updateUser } = useContext(AuthContext);
  const [passError, setPassError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries());
    const { name, photo, email, password } = userData;

    // Password validation
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasLength = password.length >= 6;

    if (!hasLength) {
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

    try {

      const result = await createUser(email, password);
      const user = result.user;

      await updateUser({ displayName: name, photoURL: photo });

      await axios.post("https://artify-server-opdh.onrender.com/users", {
        name,
        email,
        photo,
        createdAt: new Date(),
      });

      Swal.fire({
        title: "Success!",
        text: "Registration completed!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Swal.fire({
          title: "User already exists!",
          text: "Please log in!",
          icon: "warning",
          draggable: true,
        });
        navigate("/auth/signin");
      } else {
        Swal.fire({
          title: "Error",
          text: error.message || "Something went wrong",
          icon: "error",
        });
      }
    }
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
        <div className="card shadow border border-gray-200">
          <div className="card-body md:w-lg">
            <form onSubmit={handleRegister} className="form w-full">
              <label className="label font-semibold">Name</label>
              <input
                type="text"
                name="name"
                className="input mb-1 my-2 w-full"
                placeholder="Name"
                required
              />

              <label className="label font-semibold">Email</label>
              <input
                type="email"
                name="email"
                className="input my-2 w-full"
                placeholder="Email"
                required
              />

              <label className="label font-semibold">Photo URL</label>
              <input
                type="url"
                name="photo"
                className="input my-2 w-full"
                placeholder="Photo URL"
              />

              <label className="label font-semibold">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  className="input bg-[#F3F3F3] w-full my-2"
                  placeholder="Password"
                  required
                />
                {passError && <p className="text-xs text-error">{passError}</p>}
                <button
                  type="button"
                  className="btn btn-sm text-gray-400 border-0 bg-[#F3F3F3] absolute top-3 right-1"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                </button>
              </div>

              <div className="flex items-center gap-2 mt-1">
                <input type="checkbox" defaultChecked className="checkbox checkbox-sm" required />
                <p className="text-xs">Accept terms & conditions</p>
              </div>

              <button type="submit" className="btn btn-neutral w-full mt-4 mb-2">
                Register
              </button>
              <p>
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/auth/signin")}
                  className="text-blue-700 font-bold hover:underline cursor-pointer text-xs"
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
