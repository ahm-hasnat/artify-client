import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const feedbackData = [
  {
    id: 1,
    name: "David Warner",
    role: "Visitor",
    image: "https://i.pravatar.cc/200?img=12",
    feedback:
      "The exhibition was absolutely breathtaking! I loved the detailed history behind each artifact. I’ll definitely come back again.",
  },
  {
    id: 2,
    name: "Sophia Miller",
    role: "Visitor",
    image: "https://i.pravatar.cc/200?img=32",
    feedback:
      "A wonderful experience! The staff was so helpful, and the artifacts were displayed beautifully.",
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "Visitor",
    image: "https://i.pravatar.cc/200?img=18",
    feedback:
      "It felt like traveling back in time. The exhibitions are very well organized and engaging.",
  },
];

const Visitors = () => {
  return (
    <div className="py-10 mb-8 text-center">
      <h1 className="text-4xl font-bold mb-12 big">Visitors Feedback</h1>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="max-w-2xl"
      >
        {feedbackData.map(({ id, name, role, image, feedback }) => (
          <SwiperSlide key={id}>
            <div className="flex flex-col items-center px-6">
              <img
                src={image}
                alt={name}
                className="w-32 h-32 object-cover rounded-full shadow-md mb-6"
              />
              <h2 className="text-xl font-semibold">{name}</h2>
              <p className="text-[#B8860B] font-medium mb-4">{role}</p>
              <p className="italic text-gray-600 text-lg leading-relaxed">
                “{feedback}”
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Visitors;
