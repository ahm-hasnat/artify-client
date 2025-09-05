import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    img: "https://i.ibb.co.com/YFvz1nGp/rosettastone.jpg",
    title: "Rosetta Stone",
    description:
      "The Rosetta Stone unlocked the secrets of Egyptian hieroglyphs, bridging the ancient and modern worlds.",
  },
  {
    img: "https://i.ibb.co.com/fVsSkfZS/sophie-laurent-BNdjmu-w-LFk-unsplash.jpg",
    title: "Moai Statues",
    description:
      "The iconic stone statues of Easter Island, carved by the Rapa Nui people, symbolizing ancestral power and protection.",
  },

  {
    img: "https://i.ibb.co.com/N2sG1PDV/terrocotta.jpg",
    title: "Terracotta Army",
    description:
      "Over 8,000 life-sized clay soldiers buried with China’s first emperor to protect him in the afterlife.",
  },
];

const Slider = () => {
  return (
    <div className="w-full h-[600px] mt-16">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[600px]">
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              <div
                className="absolute inset-0 bg-black/30 flex flex-col 
              items-center justify-center text-center text-white p-6"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {slide.title}
                </h1>
                <p className="text-lg max-w-2xl text-[#ffffffc9]">
                  {slide.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
