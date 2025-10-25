import React, { useState, useContext, useEffect } from "react";
import { useLoaderData } from "react-router";
import { FaHeart, FaThumbsUp, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";
import RatingReview from "../RatingReview/RatingReview";

const ArtifactDetails = () => {
  const artifact = useLoaderData();
  const { user } = useContext(AuthContext);

  const [likes, setLikes] = useState(artifact.likes || 0);
  const [liked, setLiked] = useState(
    artifact.likedBy?.includes(user?.email) || false
  );
  const [averageRating, setAverageRating] = useState(0);

  // Fetch average rating from server
   useEffect(() => {
    axios
      .get(`https://artify-server-opdh.onrender.com/reviews/${artifact._id}/average`)
      .then((res) => setAverageRating(res.data.average || 0))
      .catch((err) => console.error("Error fetching average rating:", err));
  }, [artifact._id]);

  

  const handleLike = () => {
    if (!user) {
      toast.error("You must be signed in to like an artifact");
      return;
    }
    axios
      .post(
        `https://artify-server-opdh.onrender.com/artifacts/${artifact._id}/like`,
        { email: user.email }
      )
      .then((res) => {
        const updatedArtifact = res.data;
        setLikes(updatedArtifact.likes);
        setLiked(updatedArtifact.likedBy.includes(user.email));

        if (updatedArtifact.likedBy.includes(user.email)) {
          toast.success("You liked this artifact");
        } else {
          toast.error("You unliked this artifact");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="py-12 px-7 mt-16 mb-10 max-w-6xl mx-auto">
      <Helmet>
        <title>Artify - Artifact Details</title>
      </Helmet>

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Artifact Details
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore this artifact in detail — learn about its creation, discovery,
          and lasting cultural significance.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start bg-white shadow border border-gray-200 rounded-xl overflow-hidden p-6">
        {/* Left: Image */}
        <div className="w-full h-full">
          <img
            src={artifact.artifactImage}
            alt={artifact.artifactName}
            className="w-full h-[500px] object-cover rounded-lg shadow-sm"
          />
        </div>

        {/* Right: Details */}
        <div className="flex flex-col justify-between h-full px-2">
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold text-gray-900">
              {artifact.artifactName}
            </h1>

           
            <div className="flex flex-wrap items-center gap-4">
            
              <span className="flex items-center gap-2 bg-red-50 text-red-600 font-semibold px-4 py-2 rounded-full border border-red-100">
                <FaHeart className="text-red-500" /> {likes} Likes
              </span>

            
              <span className="flex items-center gap-2 bg-yellow-50 text-yellow-700 font-semibold px-4 py-2 rounded-full border border-yellow-100">
                <FaStar className="text-yellow-500" />
                {averageRating > 0 ? averageRating.toFixed(1) : "No ratings yet"}
              </span>
            </div>

           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-gray-700 text-base leading-relaxed">
              <p>
                <strong>Type:</strong> {artifact.artifactType}
              </p>
              <p>
                <strong>Added By:</strong> {artifact.addedBy || "Unknown"}
              </p>
              <p>
                <strong>Created At:</strong> {artifact.createdAt}
              </p>
              <p>
                <strong>Discovered At:</strong> {artifact.discoveredAt}
              </p>
              <p>
                <strong>Discovered By:</strong> {artifact.discoveredBy}
              </p>
              <p>
                <strong>Location:</strong> {artifact.presentLocation}
              </p>
            </div>

            {/* Description */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-gray-800 text-justify leading-relaxed">
                <strong className="block mb-2 text-lg text-gray-900">
                  Description:
                </strong>
                {artifact.shortDescription}
              </p>
            </div>

            {/* Historical Context */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-gray-800 text-justify leading-relaxed">
                <strong className="block mb-2 text-lg text-gray-900">
                  Historical Context:
                </strong>
                {artifact.historicalContext}
              </p>
            </div>
          </div>

          {/* Like Button */}
          <div className="mt-8">
            <button
              onClick={handleLike}
              className={`btn flex items-center gap-2 ${
                liked ? "btn-primary" : "btn-outline"
              } transition-all duration-300`}
            >
              <FaThumbsUp /> {liked ? "Liked" : "Like"}
            </button>
          </div>
        </div>
      </div>

      {/* Rating & Review */}
      <div className="mt-12">
        <RatingReview artifactId={artifact._id} />
      </div>
    </div>
  );
};

export default ArtifactDetails;
