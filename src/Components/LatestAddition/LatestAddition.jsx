import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";


   const artifact = {
    title: "Pharaoh's Mask",
    date: "March 14, 1323 BCE",
    description: `This gold and lapis lazuli funerary mask belonged to Pharaoh Tutankhamun. 
It is a masterpiece of ancient Egyptian craftsmanship, featuring intricate details and vibrant colors that have survived thousands of years. 
Added by: Howard Carter. 
Origin: Ancient Egypt, Valley of the Kings. 
Material: Gold and Lapis Lazuli. 
Dimensions: 54cm x 39cm. 
Significance: Funerary mask of Pharaoh Tutankhamun, symbolizing power and divinity.`,
    image: "https://i.ibb.co.com/HL5xpyBM/Cairo-Eg-Museum-Taa-Mask-Mostly-Photographed.jpg",
  };


const LatestAddition = () => {
  return (
     <div className="max-w-6xl mx-auto px-7 py-16">
        <h2 className="text-4xl font-bold text-center mb-3">Latest Addition</h2>
        <p className="text-center text-gray-600 mb-8">
          Discover our latest addition to the collection, a remarkable artifact that showcases <br /> the rich history and artistry of its time.
        </p>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Left Column: Text */}
        <div className="flex flex-col justify-center gap-3">
          <h2 className="text-3xl font-bold mb-4">{artifact.title}</h2>
          <p className="text-gray-500 mb-6">{artifact.date}</p>
          <p className="text-gray-700 text-lg leading-relaxed">{artifact.description}</p>
           <Link
            to={`/details/68b88a19658c71afdbc6e274`}
            className="btn btn1 w-fit mt-4 text-white font-semibold px-6 py-3 rounded shadow transition-all duration-300"
          >
            View Details
          </Link>
        </div>

        {/* Right Column: Image */}
        <div className="w-full h-124">
          <img
            src={artifact.image}
            alt={artifact.title}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default LatestAddition;
