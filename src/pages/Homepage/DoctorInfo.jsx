/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { gsap } from "gsap";
import defaultAvatar from "../../assets/defaultAvatar.png";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { getDoctors } from "../../redux/APIs/slices/doctorSlice";
import "./css/GetDoctor.css";
import { useNavigate } from "react-router-dom";

// Animation variants for the section
const sectionVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const GetDoctor = ({ setIsCardHovered }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { doctors, isLoading, isSuccess } = useSelector(
    (state) => state.doctorSlice
  );
  const cardRefs = useRef([]);

  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);

  useEffect(() => {
    // GSAP animation cho các card khi hiển thị
    cardRefs.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          delay: index * 0.1,
          ease: "power2.out",
        }
      );
    });
  }, [doctors, isSuccess]);

  const handleMouseEnter = (card) => {
    setIsCardHovered && setIsCardHovered(true);
    gsap.to(card, {
      scale: 1.05,
      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(card.querySelectorAll(".doctor-button"), {
      opacity: 1,
      y: 0,
      duration: 0.3,
      stagger: 0.1,
      ease: "power2.out",
    });
    gsap.to(card.querySelector(".doctor-card-overlay"), {
      opacity: 1,
      x: "100%",
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(card.querySelector(".doctor-card-overlay"), { x: "-100%", opacity: 0 });
      },
    });
  };

  const handleMouseLeave = (card) => {
    setIsCardHovered && setIsCardHovered(false);
    gsap.to(card, {
      scale: 1,
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(card.querySelectorAll(".doctor-button"), {
      opacity: 0,
      y: 10,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(card.querySelector(".doctor-card-overlay"), {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Meet Our Doctors
        </h3>

        {isLoading && (
          <p className="text-center text-gray-600">Loading doctors...</p>
        )}

        {!isLoading && !isSuccess && (
          <p className="text-center text-red-500">Error: Failed to load doctors</p>
        )}

        {!isLoading && isSuccess && (!Array.isArray(doctors) || doctors.length === 0) ? (
          <p className="text-center text-gray-600">No doctors available</p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={8}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="doctor-swiper"
          >
            {Array.isArray(doctors) &&
              doctors.map((doctor, index) => (
                <SwiperSlide key={doctor._id}>
                  <div
                    className="doctor-card relative w-64 bg-white p-6 rounded-lg shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
                    ref={(el) => (cardRefs.current[index] = el)}
                    onMouseEnter={() => handleMouseEnter(cardRefs.current[index])}
                    onMouseLeave={() => handleMouseLeave(cardRefs.current[index])}
                  >
                    <div className="doctor-card-overlay absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 -translate-x-full"></div>
                    <img
                      src={doctor.avatar || defaultAvatar}
                      alt={doctor.username}
                      className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-2 border-gray-300 transition-transform duration-300 hover:scale-110"
                      onError={(e) => {
                        e.target.src = defaultAvatar;
                      }}
                    />
                    <h3 className="text-lg font-semibold text-gray-700 text-center">
                      {doctor.username}
                    </h3>
                    <p className="text-sm text-gray-500 text-center mb-4">
                      {doctor.specialization || "Doctor"}
                    </p>
                    <div className="flex justify-center gap-4">
                      <button
                        className="doctor-button bg-blue-500 text-white px-4 py-2 rounded-md opacity-0 translate-y-10 hover:bg-blue-600 cursor-pointer"
                        onClick={() => navigate(`/profile/${doctor._id}`)}
                      >
                        Xem
                      </button>
                      <button className="doctor-button bg-green-500 text-white px-4 py-2 rounded-md opacity-0 translate-y-10 hover:bg-green-600 cursor-pointer">
                        Đặt lịch
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    </motion.section>
  );
};

export default GetDoctor;