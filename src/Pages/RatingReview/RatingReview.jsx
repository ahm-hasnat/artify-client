import React, { useEffect, useState, useContext } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";

const RatingReview = ({ artifactId }) => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [hover, setHover] = useState(0);
  const [stars, setStars] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [avgRating, setAvgRating] = useState(0);

  // Fetch reviews + average rating
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const [reviewsRes, avgRes] = await Promise.all([
          axios.get(`https://artify-server-opdh.onrender.com/reviews/${artifactId}`),
          axios.get(`https://artify-server-opdh.onrender.com/reviews/${artifactId}/average`)
        ]);

        setReviews(reviewsRes.data);
        setAvgRating(avgRes.data.average || 0);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, [artifactId]);

  const handleSubmit = async () => {
    if (!user) return toast.error("Sign in to submit a review");
    if (!stars) return toast.error("Select star rating");

    try {
      await axios.post(`https://artify-server-opdh.onrender.com/reviews`, {
        artifactId,
        userName: user.displayName,
        rating: stars,
        reviewText,
      });

      toast.success("Review submitted!");
      setStars(0);
      setReviewText("");

      // Refresh reviews
      const updated = await axios.get(
        `https://artify-server-opdh.onrender.com/reviews/${artifactId}`
      );
      setReviews(updated.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review");
    }
  };

  return (
    <div className="mt-12 bg-white/80 rounded shadow p-8 backdrop-blur-sm">
      <h3 className="text-3xl font-bold mb-6 text-gray-800">⭐ Reviews & Ratings</h3>

      {/* Average Rating Display */}
      <div className="flex items-center mb-6">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            size={28}
            className={`${
              i < Math.round(avgRating) ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-3 text-lg font-semibold text-gray-700">
          {avgRating.toFixed(1)} / 5
        </span>
      </div>

      {/* Submit Review */}
      {user && (
        <div className="border-t border-gray-200 pt-6 mb-8">
          <h4 className="text-xl font-semibold mb-3 text-gray-800">Rate this Artifact</h4>
          <div className="flex gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                size={30}
                className={`cursor-pointer transition-colors duration-200 ${
                  i < (hover || stars) ? "text-yellow-400" : "text-gray-300"
                }`}
                onMouseEnter={() => setHover(i + 1)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setStars(i + 1)}
              />
            ))}
          </div>
          <textarea
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 mt-4 focus:outline-none focus:ring-2 focus:ring-green-400"
            rows={4}
          />
          <button
            onClick={handleSubmit}
            className="mt-3 btn btn1 rounded shadow transition-all duration-200"
          >
            Submit
          </button>
        </div>
      )}

      {/* Review List */}
      <div className="space-y-4">
        <h1 className="text-xl font-semibold text-gray-800">User Reviews({reviews.length})</h1>
        {reviews.length === 0 && (
          <p className="text-gray-500 italic">No reviews yet. Be the first to review!</p>
        )}
        {reviews.map((r, idx) => (
          <div
            key={idx}
            className="border border-gray-100 rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition"
          >
             <h1 className="my-2 text-md font-semibold text-gray-900">{r.userName}</h1>
            <div className="flex items-center mb-1">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  size={18}
                  className={i < r.rating ? "text-yellow-400" : "text-gray-300"}
                />
              ))}
             
            </div>
            <p className="text-gray-700">{r.reviewText}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingReview;
