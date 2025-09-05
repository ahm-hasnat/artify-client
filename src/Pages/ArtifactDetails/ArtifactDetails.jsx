import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { FaHeart, FaThumbsUp } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";

const API_BASE = "https://artify-server-opdh.onrender.com";

const ArtifactDetails = () => {
  const initialArtifact = useLoaderData() || {};
  const { user } = useContext(AuthContext);

  const [artifact, setArtifact] = useState(initialArtifact);
  const [likes, setLikes] = useState(initialArtifact.likes || 0);
  const [liked, setLiked] = useState(false);
  const userEmail = user?.email;

  
  useEffect(() => {
    setArtifact(initialArtifact);
    setLikes(initialArtifact?.likes || 0);
    setLiked(
      Boolean(userEmail && initialArtifact?.likedBy?.includes(userEmail))
    );
  }, [initialArtifact, userEmail]);

  
  const buildHeaders = () => {
    const headers = { "Content-Type": "application/json" };
    if (user?.accessToken)
      headers["authorization"] = `Bearer ${user.accessToken}`;
    return headers;
  };

  
  const fetchArtifact = async () => {
    try {
      if (!artifact?._id) return;
      const res = await axios.get(`${API_BASE}/allartifacts/${artifact._id}`, {
        headers: buildHeaders(),
      });
      const fresh = res.data || {};
      setArtifact(fresh);
      setLikes(fresh.likes || 0);
      setLiked(Boolean(userEmail && fresh.likedBy?.includes(userEmail)));
      return fresh;
    } catch (err) {
      console.error("Error refetching artifact:", err);
      return null;
    }
  };

  const handleLike = async () => {
    if (!userEmail) {
      toast.error("You must be logged in to like an artifact");
      return;
    }
    if (!artifact?._id) {
      toast.error("Artifact id missing");
      return;
    }

    try {
      const res = await axios.post(
        `${API_BASE}/artifacts/${artifact._id}/like`,
        { email: userEmail },
        { headers: buildHeaders() }
      );

      const updated = res.data;

  
      if (updated && Array.isArray(updated.likedBy)) {
        setArtifact(updated);
        setLikes(updated.likes || 0);
        const nowLiked = updated.likedBy.includes(userEmail);
        setLiked(nowLiked);
        if (nowLiked) {
          toast.success("You liked this artifact");
        } else {
          toast.error("You removed your like");
        }
        return;
      }

      
      const fresh = await fetchArtifact();
      if (fresh) {
        const nowLiked = Boolean(fresh.likedBy?.includes(userEmail));
        if (nowLiked) toast.success("You liked this artifact");
        else toast.error("You removed your like");
      } else {
        toast.error("Like updated but failed to refresh artifact");
      }
    } catch (err) {
      console.error("Like error:", err);
      toast.error("Something went wrong while updating your like");
    }
  };

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

      <div className="card w-full sm:w-3/4 lg:w-2/3 bg-base-100 shadow-xl 
      border border-gray-200 rounded-2xl overflow-hidden mx-auto">
        <figure>
          <img
            src={artifact.artifactImage}
            alt={artifact.artifactName || "artifact"}
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
              <strong>Historical Context:</strong>
              {artifact.historicalContext}
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
              <strong>Present Location:</strong>
              {artifact.presentLocation}
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
