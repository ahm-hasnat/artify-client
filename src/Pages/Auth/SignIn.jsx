import React from 'react';
import { Link } from 'react-router';

const SignIn = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
      <div className="card w-full max-w-md shadow-xl bg-base-100 border border-gray-200 rounded-2xl">
        <div className="card-body">
         
          <h1 className="text-4xl font-bold text-center mb-4">Sign In Now</h1>
         
         
          <form className="space-y-4">
        
            <div>
              <label className="label font-semibold">Email</label>
              <input
                type="email"
                name="email"
               
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
            </div>

           
            <div>
              <label className="label font-semibold">Password</label>
              <input
                type="password"
                name="password"
                
                placeholder="Enter your password"
                className="input input-bordered w-full"
                required
              />
            </div>

         
            <div>
              <button type="submit" className="btn btn-primary w-full">
                Sign In
              </button>
            </div>
          </form>

          
          <p className="text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link to="/auth/register" className="link link-primary font-semibold">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
    );
};

export default SignIn;