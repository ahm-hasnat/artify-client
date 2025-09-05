import React, { useEffect, useState } from "react";
import { FaArrowRight, FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router";

const FeaturedArtifact = () => {
  const [featured, setFeatured] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://artify-server-opdh.onrender.com/featured")
      .then((res) => res.json())
      .then((data) => setFeatured(data));
  }, []);

  return (
    <div className="py-16   max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6 big">
        Featured Artifacts
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-6">
        Discover some of the most fascinating artifacts from around the world,
        carefully selected for their historical and cultural significance.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-6">
        {featured.map((item, index) => (
          <div
            key={item._id || index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={item.artifactImage}
              alt={item.artifactName}
              className="w-full h-60 object-cover"
            />

            <div className="p-5 flex flex-col justify-center gap-3">
              <div>
                <h2 className="text-2xl font-semibold mb-2 big">
                  {item.artifactName}
                </h2>
                <p className="text-gray-700">{item.shortDescription}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FaHeart className="text-red-500" /> {item.likes}
              </div>

              <div className="">
                <button
                  onClick={() => navigate(`/details/${item._id}`)}
                  className="font-bold btn-md btn2 p-0 text-md
                 hover:underline flex items-center gap-2"
                >
                  View Details <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to="/allartifacts">
          <button className="btn btn-md btn1">View All Artifacts</button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedArtifact;
