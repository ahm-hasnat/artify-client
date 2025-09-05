import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLoaderData, useParams } from "react-router";
import Swal from "sweetalert2";

const UpdateArtifact = () => {
  const artifactData = useLoaderData();
  console.log(artifactData);
  const {
    artifactName,
    artifactImage,
    artifactType,
    historicalContext,
    createdAt,
    discoveredAt,
    discoveredBy,
    presentLocation,
    addedBy,
    email,
  } = artifactData;

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = addedBy;
    const email = artifactData.email;
    const formData = new FormData(form);
    const newData = Object.fromEntries(formData.entries());

    const updatedArtifact = { ...newData, name, email };

    axios
      .put(
        `http://localhost:3000/allartifacts/${artifactData._id}`,
        updatedArtifact
      )
      .then((res) => {
        console.log("Artifact updated:", res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Artifact updated successfully!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error updating artifact:", error);
      });
  };

  return (
    <div className=" max-w-5xl mx-auto my-16 px-6 pt-10">
      <Helmet>
        <title>Artify - Update Artifact</title>
      </Helmet>
      <h1 className="text-4xl font-bold mb-8 text-center">Update Artifact</h1>
      <div className="shadow-lg rounded-xl p-8 bg-white">
        <form onSubmit={handleUpdate} className="space-y-6 ">
       
          <div>
            <label className="block font-semibold mb-1">Artifact Name</label>
            <input
              type="text"
              name="artifactName"
              defaultValue={artifactName}
              className="input input-bordered w-full"
              required
            />
          </div>

         
          <div>
            <label className="block font-semibold mb-1">
              Artifact Image (URL)
            </label>
            <input
              type="url"
              name="artifactImage"
              defaultValue={artifactImage}
              className="input input-bordered w-full"
              required
            />
          </div>

         
          <div>
            <label className="block font-semibold mb-1">Artifact Type</label>
            <select
              name="artifactType"
              defaultValue={artifactType}
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
            <label className="block font-semibold mb-1">
              Historical Context
            </label>
            <input
              type="text"
              name="historicalContext"
              defaultValue={historicalContext}
              className="input input-bordered w-full"
              required
            />
          </div>

        
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Created At</label>
              <input
                type="text"
                name="createdAt"
                defaultValue={createdAt}
                className="input input-bordered w-full"
                placeholder="e.g., 100 BC"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Discovered At</label>
              <input
                type="text"
                name="discoveredAt"
                defaultValue={discoveredAt}
                className="input input-bordered w-full"
                placeholder="e.g., 1799"
                required
              />
            </div>
          </div>

         
          <div>
            <label className="block font-semibold mb-1">Discovered By</label>
            <input
              type="text"
              name="discoveredBy"
              defaultValue={discoveredBy}
              className="input input-bordered w-full"
              required
            />
          </div>

         
          <div>
            <label className="block font-semibold mb-1">Present Location</label>
            <input
              type="text"
              name="presentLocation"
              defaultValue={presentLocation}
              className="input input-bordered w-full"
              required
            />
          </div>

       
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Adder Name</label>
              <input
                type="text"
                value={addedBy}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Adder Email</label>
              <input
                type="email"
                value={email}
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
              Update Artifact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateArtifact;
