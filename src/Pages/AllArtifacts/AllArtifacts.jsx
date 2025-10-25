import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaHeart, FaArrowRight, FaStar } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";

const AllArtifacts = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); // default cards per page
  const navigate = useNavigate();

  const fetchArtifacts = async (searchQuery = "") => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://artify-server-opdh.onrender.com/allartifacts?search=${searchQuery}`
      );
      const filtered = data.filter((item) => !item.status);
      setArtifacts(filtered);

      
      const ratingsPromises = filtered.map((item) =>
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
      console.error("Error fetching artifacts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtifacts();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchArtifacts(search);
  };

  // Sorting
  const sortedArtifacts = [...artifacts].sort((a, b) => {
    if (sortOrder === "most") return (b.likes || 0) - (a.likes || 0);
    if (sortOrder === "least") return (a.likes || 0) - (b.likes || 0);
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedArtifacts.length / itemsPerPage);
  const paginatedArtifacts = sortedArtifacts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <Loader />;

  return (
    <div className="py-12 mt-16 max-w-6xl mx-auto mb-6">
      <Helmet>
        <title>Artify - All Artifacts</title>
      </Helmet>

      <h1 className="text-4xl font-bold text-center mb-3">
        All Our Collection
      </h1>
      <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
        Explore our complete collection of artifacts from various cultures and
        time periods.
      </p>

     
      <div className="flex flex-col sm:flex-row justify-center items-center mb-10 gap-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Search by Artifact Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-72"
          />
          <button type="submit" className="btn btn1">
            Search
          </button>
        </form>
      </div>

      <div className="w-6xl mx-auto flex justify-end pr-6 mb-3 gap-1">
        <label className="font-light self-center">Sort by:</label>
        <select
          className="select select-bordered w-28 h-6"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">All</option>
          <option value="most">Most Liked</option>
          <option value="least">Least Liked</option>
        </select>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {paginatedArtifacts.map((item) => (
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
              <h2 className="text-2xl font-semibold">
                {item.artifactName}
              </h2>
              <p className="text-gray-700 mb-2">
                {item.shortDescription.split(" ").slice(0, 13).join(" ")}
                {item.shortDescription.split(" ").length > 13 ? "..." : ""}
              </p>

             
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 bg-red-50 text-red-600 font-semibold px-3 py-1 rounded-full border border-red-100">
                  <FaHeart className="text-red-500" /> {item.likes || 0}
                </span>
                <span className="flex items-center gap-1 bg-yellow-50 text-yellow-600 font-semibold px-3 py-1 rounded-full border border-yellow-100">
                  <FaStar className="text-yellow-500" />{" "}
                  {ratings[item._id] > 0 ? ratings[item._id].toFixed(1) : "0.0"}
                </span>
              </div>

              <button
                onClick={() => navigate(`/details/${item._id}`)}
                className="mt-3 font-bold btn-md btn2 hover:underline hover:bg-transparent p-0 text-md flex items-center gap-2"
              >
                View Details <FaArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>

    
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-8 items-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="btn  btn-sm"
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`btn btn-sm ${
                currentPage === idx + 1 ? "btn-primary" : "btn"
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="btn btn-sm"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
         
          <select
            className="select select-bordered w-14 p-2  h-8 ml-4"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={3}>3</option>
            <option value={6}>6</option>
            <option value={9}>9</option>
            <option value={12}>12</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default AllArtifacts;
