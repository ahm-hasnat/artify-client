import React from "react";
import Navbar from "../../Components/Header/Navbar";
import AdminDashboard from "../AdminDash/AdminDash";

const DashLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <AdminDashboard></AdminDashboard>
      <footer className="w-full border-t border-gray-300 mt-8 bg-gray-100 p-3">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between relative">
          <p className="text-gray-600 text-sm absolute left-1/2 transform -translate-x-1/2">
            &copy; {new Date().getFullYear()} Artify. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DashLayout;
