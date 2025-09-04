import React, { useContext } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { FaHeart, FaMapMarkerAlt } from "react-icons/fa";

const LikedArtifact = () => {
  const { user } = useContext(AuthContext);
  const artifactsData = useLoaderData();

  const likedArtifacts = artifactsData.filter((artifact) =>
    artifact?.likedBy?.includes(user?.email)
  );

  return (
    <div className="kala">
      <div className="max-w-6xl mx-auto px-4 py-16 mt-10">
        <h1 className="text-3xl font-bold text-center mb-10 big">
          My Liked Artifacts
        </h1>

        {likedArtifacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <p className="text-center text-gray-500">
              You haven't liked any artifacts yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {likedArtifacts.map((artifact) => (
              <div
                key={artifact._id}
                className="card bg-base-100 shadow-xl rounded-2xl overflow-hidden flex flex-col"
              >
                <figure className="h-48 overflow-hidden">
                  <img
                    src={artifact.artifactImage}
                    alt={artifact.artifactName}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="card-body flex flex-col flex-1">
                  <h2 className="card-title text-xl font-bold">
                    {artifact.artifactName}
                  </h2>

                  <div className="flex flex-wrap gap-2 mt-2 mb-4">
                    <span className="badge badge-accent">
                      {artifact.artifactType}
                    </span>
                    <span className="badge badge-info">
                      {artifact.historicalContext}
                    </span>
                  </div>

                  <p className="text-gray-700 text-sm flex-1 mb-4">
                    {artifact.shortDescription}
                  </p>

                 
                  <div className="flex flex-col gap-2 mt-auto text-sm">
                    <div className="flex items-center gap-2">
                      <FaHeart className="text-red-500" /> {artifact.likes || 0}{" "}
                      Likes
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-[#B8860B]" />
                      <span className=" text-sm">
                        {artifact.presentLocation}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedArtifact;
