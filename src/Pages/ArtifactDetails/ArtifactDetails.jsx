import React, { useEffect, useState, useContext } from "react";
import { useLoaderData, useParams } from "react-router";
import { FaHeart, FaThumbsUp } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const ArtifactDetails = () => {
  const { id } = useParams();
  const initialArtifact = useLoaderData();
  const { user } = useContext(AuthContext);

  const [artifact, setArtifact] = useState(initialArtifact);
  const [likes, setLikes] = useState(initialArtifact.likes || 0);
  const [liked, setLiked] = useState(
    initialArtifact.likedBy?.includes(user?.email) || false
  );

 
  const fetchArtifact = async () => {
    try {
      const res = await axios.get(
        `https://artify-server-opdh.onrender.com/artifacts/${id}`
      );
      const freshArtifact = res.data;
      setArtifact(freshArtifact);
      setLikes(freshArtifact.likes || 0);
      setLiked(freshArtifact.likedBy?.includes(user?.email) || false);
    } catch (err) {
      console.error("Error fetching artifact:", err);
    }
  };

  const handleLike = async () => {
    if (!user) {
      toast.error("You must be signed in to like an artifact");
      return;
    }

    try {
      await axios.post(
        `https://artify-server-opdh.onrender.com/artifacts/${artifact._id}/like`,
        { email: user.email }
      );

      
      await fetchArtifact();

      if (!liked) {
        toast.success("You liked this artifact");
      } else {
        toast.error("You unliked this artifact");
      }
    } catch (err) {
      console.error("Error liking artifact:", err);
    }
  };

  
  useEffect(() => {
    fetchArtifact();
  }, [id]);

  return (
    <div className="py-12 px-4 mt-16 mb-10">
      <Helmet>
        <title>Artify - Artifact Details</title>
      </Helmet>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Artifact Details</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore this artifact in detail, learn about its historical context,
          discovery, and significance.
        </p>
      </div>

      <div className="card w-full sm:w-3/4 lg:w-2/3 bg-base-100 
      shadow-xl border border-gray-200 rounded-2xl overflow-hidden mx-auto">
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
            <span className="badge badge-outline px-4 py-3 text-lg flex 
            items-center gap-2">
              <FaHeart className="text-red-500" /> {likes} Likes
            </span>
          </div>

          <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
            <p>
              <strong>Type:</strong> {artifact.artifactType}
            </p>
            <p>
              <strong>Historical Context:</strong> {artifact.historicalContext}
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
              <strong>Present Location:</strong> {artifact.presentLocation}
            </p>
            <p>
              <strong>Description:</strong> {artifact.shortDescription}
            </p>
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={handleLike}
              className={`btn flex items-center gap-2 ${
                liked ? "btn-primary" : "btn-outline"
              }`}
            >
              <FaThumbsUp /> {liked ? "Liked" : "Like"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtifactDetails;
