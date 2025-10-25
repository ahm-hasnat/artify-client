import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import Loader from "../../Components/Loader/Loader";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [artifacts, setArtifacts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = use(AuthContext);
  const accessToken = user?.accessToken;
  const [userSearch, setUserSearch] = useState("");
  const [artifactSearch, setArtifactSearch] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersRes, artifactsRes, reviewsRes] = await Promise.all([
        axios.get("https://artify-server-opdh.onrender.com/users", {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
        axios.get("https://artify-server-opdh.onrender.com/allartifacts"),
        axios.get("https://artify-server-opdh.onrender.com/reviews"),
      ]);

      setUsers(usersRes.data || []);
      setArtifacts(artifactsRes.data || []);
      setReviews(reviewsRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteUser = async (id) => {
    Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://artify-server-opdh.onrender.com/users/${id}`
          );
          setUsers(users.filter((u) => u._id !== id));
          Swal.fire("Deleted!", "User has been removed.", "success");
        } catch (err) {
          Swal.fire("Error!", "Something went wrong.", "error");
          console.error(err);
        }
      }
    });
  };

  const handleDeleteArtifact = async (id) => {
    Swal.fire({
      title: "Delete Artifact?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://artify-server-opdh.onrender.com/allartifacts/${id}`
          );
          setArtifacts(artifacts.filter((a) => a._id !== id));
          Swal.fire("Deleted!", "Artifact has been removed.", "success");
        } catch (err) {
          Swal.fire("Error!", "Something went wrong.", "error");
          console.error(err);
        }
      }
    });
  };

  if (loading) return <Loader />;

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email?.toLowerCase().includes(userSearch.toLowerCase())
  );

 const filteredArtifacts = artifacts
  .filter(
    (a) =>
      a.artifactName?.toLowerCase().includes(artifactSearch.toLowerCase()) ||
      a.artifactType?.toLowerCase().includes(artifactSearch.toLowerCase())
  )
  .filter((a) => a.status?.toLowerCase() !== "ongoing");


  return (
    <div className="max-w-6xl mx-auto py-12 px-7 mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-blue-50 p-6 rounded shadow flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold">{users.length}</p>
        </div>
        <div className="bg-green-50 p-6 rounded shadow flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Total Artifacts</h2>
          <p className="text-3xl font-bold">{filteredArtifacts.length}</p>
        </div>
        <div className="bg-yellow-50 p-6 rounded shadow flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Total Reviews</h2>
          <p className="text-3xl font-bold">{reviews.length}</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="mb-10">
        <div className="flex flex-col justify-center mb-8 gap-4 items-center">
          <h2 className="text-2xl font-semibold">All Users</h2>
          <input
            type="text"
            placeholder="Search users..."
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            className="input input-bordered w-64"
          />
        </div>

        <div className="overflow-x-auto shadow rounded">
          <table className="table table-zebra w-full text-center">
            <thead>
              <tr className="bg-green-100">
                <th className="w-6">#</th>
                <th className="w-28">Photo</th>
                <th className="w-48">Name</th>
                <th className="w-64">Email</th>
                <th className="w-32">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={user?.photoURL}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover mx-auto"
                    />
                  </td>
                  <td>
                    <span className="badge badge-soft badge-primary">
                      {user.name || "Unknown"}
                    </span>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Artifacts Table */}
      <div>
        <div className="flex flex-col justify-center items-center gap-4 mb-8">
          <h2 className="text-2xl font-semibold">All Artifacts</h2>
          <input
            type="text"
            placeholder="Search artifacts..."
            value={artifactSearch}
            onChange={(e) => setArtifactSearch(e.target.value)}
            className="input input-bordered w-64"
          />
        </div>

        <div className="overflow-x-auto shadow rounded">
          <table className="table table-zebra w-full text-center">
            <thead>
              <tr className="bg-green-100">
                <th className="w-5">#</th>
                <th className="w-28">Image</th>
                <th className="w-48">Name</th>
                <th className="w-48">Type</th>
                <th className="w-32">Likes</th>
                <th className="w-32">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredArtifacts.map((artifact, index) => (
                <tr key={artifact._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={artifact.artifactImage || "/default-artifact.png"}
                      alt={artifact.artifactName}
                      className="w-24 h-16 rounded object-cover mx-auto"
                    />
                  </td>
                  <td>
                    <span className="font-semibold">
                      {artifact.artifactName}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-soft badge-secondary">
                      {artifact.artifactType}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center justify-center gap-1">
                      <span className="badge badge-soft badge-success flex items-center gap-1">
                        <FaHeart className="text-red-500" />
                        {artifact.likes || 0}
                      </span>
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteArtifact(artifact._id)}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
