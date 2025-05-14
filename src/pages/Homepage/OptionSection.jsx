/* eslint-disable no-unused-vars */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { useRef } from "react";
import { motion } from "framer-motion";
import optionData from "../../data/OptionData";
import { GrFormNextLink } from "react-icons/gr";

const OptionSection = ({ setIsCardHovered }) => {
  const swiperRef = useRef(null);

  const handleMouseEnter = () => {
    swiperRef.current?.autoplay?.stop();
    setIsCardHovered(true);
  };

  const handleMouseLeave = () => {
    swiperRef.current?.autoplay?.start();
    setIsCardHovered(false);
  };

  return (
    <div className="w-full py-8 relative">
      {/* Wrapper for Swiper with overflow-hidden to contain cards */}
      <div className="overflow-hidden">
        <Swiper
          spaceBetween={20}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {optionData.map((item) => (
            <SwiperSlide key={item.id}>
              <motion.div
                className={`${item.bgColor} relative rounded-xl p-6 h-82 cursor-pointer transition-all duration-300 z-10 option-card`}
                onClick={() => (window.location.href = item.navigation)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <h3 className="text-3xl font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-lg text-gray-600 mt-4">{item.description}</p>
                {item.icon}
                <div className="absolute bottom-4 left-4 text-white bg-blue-900 p-2 rounded-full size-10">
                  <GrFormNextLink className="size-6" />
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .option-card {
          transition: filter 0.5s ease-in-out, transform 0.5s ease-in-out;
        }
        .option-card:hover {
          transform: scale(1.05);
          filter: grayscale(0%) brightness(100%) !important;
          z-index: 20;
        }
        .swiper:hover .option-card {
          filter: grayscale(100%) brightness(50%);
        }
        .option-card:hover ~ .option-card,
        .swiper:hover .option-card:not(:hover) {
          filter: grayscale(100%) brightness(50%);
        }
        @media (max-width: 640px) {
          .swiper-button-prev,
          .swiper-button-next {
            /* No positioning adjustments needed for mobile */
          }
        }
      `}</style>
    </div>
  );
};

export default OptionSection;
