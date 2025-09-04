import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const Exhibitions = () => {
  const [exhibitions, setExhibitions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/allartifacts")
      .then((res) => res.json())
      .then((data) => {
        const ongoing = data.filter((ex) => ex.status === "ongoing");
        setExhibitions(ongoing);
      });
  }, []);

  return (
    <div className="py-12 w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6 big">
        Ongoing Exhibitions
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-6">
        Explore our ongoing exhibitions showcasing remarkable artifacts and
        cultural treasures from around the world. Don’t miss these unique displays!
      </p>

      <div className="flex flex-col gap-4 px-6">
        {exhibitions.map((exhibition) => (
          <div
            key={exhibition._id}
            className="flex items-center gap-3 bg-white rounded-2xl 
            shadow-md hover:shadow-xl h-72
              transition-shadow duration-300 overflow-hidden"
          >
            {/* Left Date Section */}
            <div className="flex flex-col gap-3 justify-center items-center bg-white
             p-6 w-28 border-r">
              <p className="text-sm font-semibold text-gray-500 uppercase">
                {new Date(exhibition.startDate).toLocaleString("default", {
                  month: "short",
                })}
              </p>
              <h2 className="text-3xl font-bold text-[#1A3E6F]">
                {new Date(exhibition.startDate).getDate()}
              </h2>
            </div>

            {/* Middle Content */}
            <div className="flex-1 p-6 gap-3">
              <p className="text-gray-500 text-sm flex items-center gap-2 mb-1">
                <FaCalendarAlt className="text-[#B8860B]" />
                {exhibition.startDate} – {exhibition.endDate}
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {exhibition.name}
              </h2>
              <p className="text-gray-700 font-medium mb-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#B8860B]" />
                {exhibition.location}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {exhibition.description}
              </p>
            </div>

            {/* Right Image */}
            <div className="w-1/3 min-w-[250px] h-full">
              <img
                src={exhibition.image}
                alt={exhibition.name}
                className="w-full h-full object-cover p-6"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exhibitions;
