import React, { use, useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { FaEdit,  FaTrashAlt } from 'react-icons/fa';
import { m } from 'framer-motion';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import Lottie from "lottie-react";
import noDataAnimation from '../../assets/No-Data.json';

const MyArtifacts = () => {

   const {user} = use(AuthContext);
const [myArtifacts, setMyArtifacts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const email = user?.email;
        const accessToken = user?.accessToken;
        fetch(`http://localhost:3000/myartifacts?email=${email}`,{

            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setMyArtifacts(data);
            })
           
    }, [user?.email]);

    const handleUpdate = (id) => {
        navigate(`/update/${id}`);
        console.log(id);
    };

        const handleDelete = (id) => {
            console.log(id);
             Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
    .then((result) => {
      if (result.isConfirmed) {
       
         axios.delete(`http://localhost:3000/allartifacts/${id}`)
            .then((res) => {
         
            if (res.data.deletedCount) {
                 setMyArtifacts(myArtifacts.filter(artifact => artifact._id !== id));
                   Swal.fire({
                       title: 'Deleted!',
                       text: 'Your artifact has been deleted.',
                       icon: 'success',
                        showConfirmButton: false,
                   timer: 1500,
                   });
                  
               }
            })
            }
            })
            .catch(error => {
              
                console.error("Error deleting artifact:", error);
            });
        };

    return (
          <div className="py-16 mt-10">
            <Helmet>
              <title>Artify - My Artifacts</title>
            </Helmet>
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-10 big">
          My Artifacts
        </h1>

        {myArtifacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <p className="text-center text-gray-500 mb-4">
              You haven't added any artifacts yet.
            </p>
             <div className="w-full max-w-md">
        <Lottie animationData={noDataAnimation} loop={true} />
      </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full shadow-md rounded-lg border border-gray-200">
              <thead className="bg-[#2a5298] text-white text-sm">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Image</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Created At</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myArtifacts.map((artifact, index) => (
                  <tr
                    key={artifact._id}
                    className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 
                  text-center  transition"
                  >
                    <td className="p-3 text-center">{index + 1}</td>
                    <td className="p-3">
                      <div className="w-32 h-20 rounded overflow-hidden mx-auto">
                        <img
                          src={artifact.artifactImage}
                          alt={artifact.artifactName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-3 font-semibold">{artifact.artifactName}</td>
                    <td className="p-3">
                      <span className="badge badge-accent px-3 py-1">
                        {artifact.artifactType}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="badge badge-info px-3 py-1">
                        {artifact.createdAt}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline btn-info"
                        onClick={() => handleUpdate(artifact._id)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-sm btn-outline btn-error ml-2"
                       onClick={() => handleDelete(artifact._id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
    </div>
    );
};

export default MyArtifacts;