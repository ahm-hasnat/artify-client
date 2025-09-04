import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import { FaHeart, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router"; // make sure this is react-router-dom

const AllArtifacts = () => {
  const allArtifacts = useLoaderData();
  const artifacts = allArtifacts.filter(artifact => !artifact.status);
  const navigate = useNavigate();
  return (
    <div className="py-12 mt-16 w-6xl mx-auto mb-6">
      <h1 className="text-4xl font-bold text-center mb-6 big">
        All Our Collection
      </h1>
      <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
        Explore our complete collection of artifacts from various cultures and time periods.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {artifacts.map((item, index) => (
          <div
            key={item._id || index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={item.artifactImage}
              alt={item.artifactName}
              className="w-full h-60 object-cover"
            />
            <div className="p-5 flex flex-col justify-center gap-2">
              <div>
                <h2 className="text-2xl font-semibold mb-2 big">
                  {item.artifactName}
                </h2>
                <p className="text-gray-700 h-18">{item.shortDescription}</p>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <FaHeart className="text-red-500" /> {item.likes || 0}
              </div>

              <div>

                  <button onClick={() => navigate(`/details/${item._id}`)} className="btn btn-md btn2 p-0 text-md flex
                   items-center gap-2 ">
                    View Details <FaArrowRight />
                  </button>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllArtifacts;
