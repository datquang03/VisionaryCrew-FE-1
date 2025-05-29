import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { gsap } from "gsap";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const DoctorModal = ({
  doctors = [],
  isOpen,
  onClose,
  onSelectDoctor,
  isLoading,
}) => {
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        ".modal-content",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
      gsap.fromTo(
        ".modal-overlay",
        { opacity: 0 },
        { opacity: 0.5, duration: 0.5 }
      );
    }
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(".modal-content", {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      onComplete: onClose,
    });
    gsap.to(".modal-overlay", {
      opacity: 0,
      duration: 0.3,
    });
  };

  if (!isOpen) return null;
  const doctorsToDisplay = Array.isArray(doctors) ? doctors : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="modal-overlay absolute inset-0 bg-black opacity-50"
        onClick={handleClose}
      ></div>

      <div className="modal-content relative bg-white rounded-2xl p-6 sm:p-8 max-w-4xl w-full mx-4 shadow-2xl">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
          onClick={handleClose}
        >
          <i className="fas fa-times"></i>
        </button>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          Choose a Doctor
        </h2>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-lg text-gray-600">Loading doctors...</p>
          </div>
        ) : doctors.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-lg text-gray-600">No doctors available</p>
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="py-4"
          >
            {doctorsToDisplay.map((doctor) => (
              <SwiperSlide key={doctor._id}>
                <div className="doctor-card bg-gradient-to-b from-blue-50 to-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all h-full">
                  <div className="flex flex-col items-center h-full">
                    <img
                      src={doctor.avatar || "https://via.placeholder.com/150"}
                      alt={doctor.username}
                      className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-blue-500"
                    />
                    <h3 className="text-xl font-semibold text-gray-800 text-center">
                      {doctor.username}
                    </h3>
                    <p className="text-gray-600 text-center mb-4">
                      {doctor.email}
                    </p>
                    <button
                      className="mt-auto w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                      onClick={() => onSelectDoctor(doctor._id)}
                    >
                      <i className="fas fa-phone"></i> Call
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default DoctorModal;
