import React, { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AddArtifact = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const handleAddArtifact = (e) => {
    e.preventDefault();
    const form = e.target;
    const addedBy = user?.displayName;
    const email = user?.email;
    const formData = new FormData(form);
    const newData = Object.fromEntries(formData.entries());

    const newArtifact = { ...newData, addedBy, email, likes: 0 };

    axios
      .post("https://artify-server-opdh.onrender.com/artifactdata", newArtifact)
      .then((res) => {
        console.log("Artifact added:", res.data);
        if (res.data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Artifact added successfully!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });

          form.reset();
        }
      })
      .catch((error) => {
        console.error("Error adding artifact:", error);
      });
  };

  return (
    <div className="py-12 px-6 mt-16 bg-base-200">
      <Helmet>
        <title>Artify - Add Artifact</title>
      </Helmet>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Add a New Artifact</h1>
      </div>

      <div
        className="card w-full lg:w-2/3 mx-auto shadow-xl 
      bg-base-100 border border-gray-200 rounded-2xl"
      >
        <div className="card-body">
          <form onSubmit={handleAddArtifact} className="space-y-6">
            <div>
              <label className="label font-semibold">Artifact Name</label>
              <input
                type="text"
                name="artifactName"
                placeholder="Enter artifact name"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-semibold">
                Artifact Image (URL)
              </label>
              <input
                type="url"
                name="artifactImage"
                placeholder="Enter image URL"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-semibold">Artifact Type</label>
              <select
                name="artifactType"
                className="select select-bordered w-full"
                required
              >
                <option value="">Select type</option>
                <option value="Tools">Tools</option>
                <option value="Weapons">Weapons</option>
                <option value="Documents">Documents</option>
                <option value="Writings">Writings</option>
                <option value="Relics">Relics</option>
                <option value="Statues">Statues</option>
              </select>
            </div>

            <div>
              <label className="label font-semibold">Historical Context</label>
              <input
                type="text"
                name="historicalContext"
                placeholder="e.g., Ancient Greece"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-semibold">Short Description</label>
              <textarea
                name="shortDescription"
                placeholder="Write a short description..."
                className="textarea textarea-bordered w-full"
                rows="3"
                required
              ></textarea>
            </div>

            <div>
              <label className="label font-semibold">Created At</label>
              <input
                type="text"
                name="createdAt"
                placeholder="e.g., 100 BC"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-semibold">Discovered At</label>
              <input
                type="text"
                name="discoveredAt"
                placeholder="e.g., 1799"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-semibold">Discovered By</label>
              <input
                type="text"
                name="discoveredBy"
                placeholder="e.g., Pierre Bouchard"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-semibold">Present Location</label>
              <input
                type="text"
                name="presentLocation"
                placeholder="e.g., British Museum, London"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label font-semibold">Adder Name</label>
                <input
                  type="text"
                  value={user?.displayName}
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                />
              </div>
              <div>
                <label className="label font-semibold">Adder Email</label>
                <input
                  type="email"
                  value={user?.email}
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="btn btn-primary px-8 bg-[#204e51]
               border-none hover:bg-[#183b3d]"
              >
                Add Artifact
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddArtifact;
