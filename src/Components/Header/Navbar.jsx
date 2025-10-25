import React, { use } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, signout } = use(AuthContext);
  const navigate = useNavigate();

  const admin = import.meta.env.VITE_adminEmail;

  const handleSignOut = () => {
    signout().then(() => {
      Swal.fire({
        title: "Signed Out!",
        text: "User signed Out!.",
        icon: "info",
      });
      navigate("/auth/signin");
    });
  };
  const activeLink = ({ isActive }) =>
    isActive ? "underline md:text-yellow-500" : "md:text-white";

  return (
    <div className="navbar px-19 p-1 bg-[#666666] shadow-sm fixed top-0 z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box
         z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink className={activeLink} to="/">
                Home
              </NavLink>
            </li>

            <li>
              <NavLink className={activeLink} to="/allartifacts">
                All Artifacts
              </NavLink>
            </li>
            <li>
              <NavLink className={activeLink} to="/addartifact">
                Add Artifacts
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="flex items-center">
          <span className="text-4xl mr-2 text-[#B8860B]">
            <FontAwesomeIcon icon={faBuildingColumns} />
          </span>
          <a className="font-bold p-0 text-2xl text-white">ARTIFY</a>
        </div>
      </div>
      <div className="navbar-center gap-5 hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-white text-sm font-medium">
          <li>
            <NavLink className={activeLink} to="/">
              Home
            </NavLink>
          </li>

          <li>
            <NavLink className={activeLink} to="/allartifacts">
              All Artifacts
            </NavLink>
          </li>

          {user && user.email !== admin && (
            <>
              <li>
                <NavLink className={activeLink} to="/myartifacts">
                  My Artifacts
                </NavLink>
              </li>

              <li>
                <NavLink to={"/liked"} className={activeLink}>
                  Liked Artifacts
                </NavLink>
              </li>
            </>
          )}

           {(!user || user.email !== admin) && (
            <li>
              <NavLink className={activeLink} to="/addartifact">
                Add Artifacts
              </NavLink>
            </li>
          )}
          
          {user?.email === admin && (
            <li>
              <NavLink className={activeLink} to="/dashboard">
                Dashboard
              </NavLink>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="avatar avatar-online mx-3 dropdown dropdown-left">
            <div
              className="w-12 rounded-full cursor-pointer"
              tabIndex={0}
              role="button"
            >
              <img src={user?.photoURL} />
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#666666] text-white
        rounded z-1 mt-14 w-40 p-2 shadow -left-7 flex items-center"
            >
              <div className="w-16 rounded-full" tabIndex={0}>
                <img className="rounded-full" src={user?.photoURL} />
              </div>
              <h3 className="font-bold text-lg">{user?.displayName}</h3>
              <p className="font-light break-words max-w-[140px] text-center">
                {user?.email}
              </p>
              <li>
                <NavLink className={activeLink} to="/settings"></NavLink>
              </li>
              <button onClick={handleSignOut} className="btn btn1 btn-sm">
                Sign Out
              </button>
            </ul>
          </div>
        ) : (
          <Link to={"/auth/signin"} className="btn btn1">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
