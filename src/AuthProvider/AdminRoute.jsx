
import React, { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "./AuthProvider";
import Loader from "../Components/Loader/Loader";



const AdminRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const admin = import.meta.env.VITE_adminEmail;
  
  const location = useLocation();
  
  if (loading) {
    return <Loader></Loader>;
  }

  if (user && user?.email === admin) {
    return children;
  }
  return <Navigate state={location.pathname} to="/auth/signin"></Navigate>;
};
export default AdminRoute;

