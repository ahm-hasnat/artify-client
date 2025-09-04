import React from 'react';

const AddArtifact = () => {
    return (
        <div className="py-12 px-6 mt-16 bg-base-200">
      
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Add a New Artifact</h1>
       
      </div>

    
      <div className="card w-full lg:w-2/3 mx-auto shadow-xl 
      bg-base-100 border border-gray-200 rounded-2xl">
        <div className="card-body">
          <form  className="space-y-6">
         
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
              <label className="label font-semibold">Artifact Image (URL)</label>
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
                 
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                />
              </div>
              <div>
                <label className="label font-semibold">Adder Email</label>
                <input
                  type="email"
                 
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                />
              </div>
            </div>

         
            <div className="flex justify-center">
              <button type="submit" className="btn btn1 px-8">
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