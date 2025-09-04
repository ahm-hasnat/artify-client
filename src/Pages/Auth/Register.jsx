import React from 'react';
import { Link } from 'react-router';

const Register = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200 px-4 mt-16">
      <div className="card w-full max-w-md shadow-xl bg-base-100 border border-gray-200 rounded-2xl">
        <div className="card-body">
       
          <h1 className="text-4xl font-bold text-center mb-4">Register Now</h1>
         

         
          <form  className="space-y-4">
          
            <div>
              <label className="label font-semibold">Name</label>
              <input
                type="text"
                name="name"
               
                placeholder="Enter your full name"
                className="input input-bordered w-full"
                required
              />
            </div>

          
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
              <label className="label font-semibold">Photo URL</label>
              <input
                type="url"
                name="photoURL"
            
                placeholder="Profile picture URL"
                className="input input-bordered w-full"
              />
            </div>

         
            <div>
              <label className="label font-semibold">Password</label>
              <input
                type="password"
                name="password"
              
                placeholder="Enter a strong password"
                className="input input-bordered w-full"
                required
              />
            </div>

          
            <div className="form-control">
              <label className="cursor-pointer label justify-start gap-2">
                <input
                  type="checkbox"
                  name="termsAccepted"
                
                  className="checkbox checkbox-sm"
                />
                <span className="label-text">
                  I agree to the{" "}
                  <a href="#" className="link link-primary">
                    Terms and Conditions
                  </a>
                </span>
              </label>
            </div>

          
            <div>
              <button type="submit" className="btn btn-primary w-full">
                Register
              </button>
            </div>
          </form>
         
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/auth/signin" className="link link-primary font-semibold">
              Sign In here
            </Link>
          </p>
        </div>
      </div>
    </div>
    );
};

export default Register;