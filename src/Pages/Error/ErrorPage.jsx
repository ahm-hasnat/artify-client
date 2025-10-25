import React from "react";
import { Helmet } from "react-helmet-async";
import Lottie from "lottie-react";
import { Link } from "react-router";
import errorAnimation from "../../assets/error-404.json";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen
     bg-gray-50 text-center px-4">
      <Helmet>
        <title>Artify - 404 Not Found</title>
      </Helmet>

      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-6">
        Oops! Page Not Found
      </h1>

      <div className="w-full max-w-md">
        <Lottie animationData={errorAnimation} loop={true} />
      </div>

      <p className="text-gray-600 mt-3 max-w-lg">
        The page you’re looking for might have been removed, renamed, or is
        temporarily unavailable.
      </p>

      <Link
        to="/"
        className="btn btn1 mt-5 
        shadow transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
