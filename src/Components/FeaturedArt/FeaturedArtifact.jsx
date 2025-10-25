import React, { useEffect, useState } from "react";
import { FaArrowRight, FaHeart, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import axios from "axios";

const FeaturedArtifact = () => {
  const [featured, setFeatured] = useState([]);
  const [ratings, setRatings] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(
          "https://artify-server-opdh.onrender.com/featured"
        );
        const data = await res.json();
        setFeatured(data);

        const ratingsPromises = data.map((item) =>
          axios
            .get(
              `https://artify-server-opdh.onrender.com/reviews/${item._id}/average`
            )
            .then((res) => ({ id: item._id, avg: res.data.average || 0 }))
            .catch(() => ({ id: item._id, avg: 0 }))
        );

        const ratingsResults = await Promise.all(ratingsPromises);
        const ratingsMap = {};
        ratingsResults.forEach((r) => (ratingsMap[r.id] = r.avg));
        setRatings(ratingsMap);
      } catch (err) {
        console.error("Error fetching featured artifacts:", err);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div className="py-16 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-3">
        Featured Artifacts
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
        Discover some of the most fascinating artifacts from around the world,
        carefully selected for their historical and cultural significance.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-6">
        {featured.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded shadow overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={item.artifactImage}
              alt={item.artifactName}
              className="w-full h-60 object-cover"
            />

            <div className="p-5 flex flex-col justify-center gap-2">
              <h2 className="text-2xl font-semibold ">
                {item.artifactName}
              </h2>
              <p className="text-gray-700">
                {item.shortDescription.split(" ").slice(0, 13).join(" ")}
                {item.shortDescription.split(" ").length > 13 ? "..." : ""}
              </p>

              <div className="flex items-center gap-3 mt-2">
                <span className="flex items-center gap-1 bg-red-50 text-red-600 font-semibold px-3 py-0.5 rounded-full border border-red-100">
                  <FaHeart className="text-red-500" /> {item.likes || 0}
                </span>

                <span className="flex items-center gap-1 bg-yellow-50 text-yellow-600 font-semibold px-3 py-0.5 rounded-full border border-yellow-100">
                  <FaStar className="text-yellow-500" />{" "}
                  {ratings[item._id] ? ratings[item._id].toFixed(1) : "0.0"}
                </span>
              </div>

              <button
                onClick={() => navigate(`/details/${item._id}`)}
                className="mt-3 font-bold btn-md btn2 p-0 text-md hover:underline flex items-center gap-2"
              >
                View Details <FaArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
        <Link to="/allartifacts">
          <button className="btn btn-md btn1">View All Artifacts</button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedArtifact;
