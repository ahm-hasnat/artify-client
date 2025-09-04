import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router';

const Navbar = () => {
  const activeLink = ({ isActive }) => (isActive ? "underline md:text-[#B8860B]" :
     "md:text-white");

    return (
        <div className="navbar px-4 p-1 bg-[#666666] shadow-sm fixed top-0 z-10">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
         viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" 
         strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box
         z-1 mt-3 w-52 p-2 shadow">
        <li><a>Item 1</a></li>
        
        <li><a>Item 3</a></li>
      </ul>
    </div>

    <div className='flex items-center'>
        <span className='text-4xl mr-2 text-[#B8860B]'><FontAwesomeIcon 
         icon={faBuildingColumns} /></span>
  <a className="font-bold p-0 text-2xl text-white">ARTIFY</a>
    </div>
  
  </div>
  <div className="navbar-center gap-5 hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-white text-sm font-medium">
      <li><NavLink className={activeLink} to="/">Home</NavLink></li>

      <li><NavLink className={activeLink} to="/allartifacts">All Artifacts</NavLink></li>
      <li><NavLink className={activeLink} to="/addartifacts">Add Artifacts</NavLink></li>
    </ul>
  </div>
 <div className="navbar-end">
    
     <div className="avatar avatar-online mx-3 dropdown dropdown-center">
  <div className="w-12 rounded-full cursor-pointer" tabIndex={0} role='button'>
    <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
  </div>
 
   <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-[#2a5298e2] text-white
        rounded-box z-1 mt-15 w-40 p-2 shadow">
           <h3 className='font-bold text-lg'>User Name</h3>
         <li><NavLink className={activeLink} to="/myartifacts">My Artifacts</NavLink></li>

        <li><NavLink className={activeLink} to="/liked">Liked Artifacts</NavLink></li>
        <li><NavLink className={activeLink} to="/settings"></NavLink></li>
      </ul>
</div>

  <a className="btn btn1">Sign Out</a>

  </div>
</div>
    );
};

export default Navbar;