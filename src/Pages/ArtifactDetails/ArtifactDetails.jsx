import React, { useState } from "react";
import { useLoaderData } from "react-router";
import { FaHeart, FaThumbsUp } from "react-icons/fa";

const ArtifactDetails = () => {
  const artifact = useLoaderData();
  const [likes, setLikes] = useState(artifact.likes || 0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div className="py-12 px-4 mt-16 mb-10">
    
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold mb-4">Artifact Details</h1>
        
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore this artifact in detail, learn about its historical context, discovery, and significance.
        </p>
      </div>

     
      <div className="card w-full sm:w-3/4 lg:w-2/3 bg-base-100 shadow-xl border border-gray-200 rounded-2xl overflow-hidden mx-auto">
     
        <figure>
          <img
            src={artifact.artifactImage}
            alt={artifact.artifactName}
            className="w-full h-96 object-cover"
          />
        </figure>

        <div className="card-body flex flex-col">
        
          <h1 className="text-4xl font-bold text-center mb-6">
            {artifact.artifactName}
          </h1>

         
          <div className="flex justify-center mb-8">
            <span className="badge badge-outline px-4 py-3 text-lg flex items-center gap-2">
              <FaHeart className="text-red-500" /> {likes} Likes
            </span>
          </div>

          {/* Artifact Description */}
          <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
            <p><strong>Type:</strong> {artifact.artifactType}</p>
            <p><strong>Historical Context:</strong> {artifact.historicalContext}</p>
            <p><strong>Created At:</strong> {artifact.createdAt}</p>
            <p><strong>Discovered At:</strong> {artifact.discoveredAt}</p>
            <p><strong>Discovered By:</strong> {artifact.discoveredBy}</p>
            <p><strong>Present Location:</strong> {artifact.presentLocation}</p>
            <p><strong>Description:</strong> {artifact.shortDescription}</p>
          </div>

          {/* Like Button */}
          <div className="flex justify-center mt-10">
            <button
              onClick={handleLike}
              className="btn btn-outline btn-primary flex items-center gap-2"
            >
              <FaThumbsUp /> Like
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtifactDetails;
