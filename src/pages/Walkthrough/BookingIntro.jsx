/* eslint-disable no-unused-vars */
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OfficeRoom } from "../../../public/models-room/Office";

// Messages for the intro slides
const messages = [
  { id: 1, text: "Đặt lịch khám với bác sĩ dễ dàng" },
  { id: 2, text: "Tiết kiệm thời gian và chi phí" },
  { id: 3, text: "Truy cập dịch vụ y tế mọi lúc, mọi nơi" },
  { id: 4, text: "Đội ngũ bác sĩ chuyên nghiệp hỗ trợ bạn" },
  { id: 5, text: "Hệ thống đặt lịch thông minh và tiện lợi" },
  { id: 6, text: "Chăm sóc sức khỏe chưa bao giờ dễ dàng hơn" },
];

// Text animation settings
const textVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    scale: [1, 1.05, 1],
    transition: {
      opacity: { duration: 3.5, ease: "easeInOut" },
      y: { duration: 3.5, ease: "easeInOut" },
      scale: {
        duration: 10,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
  },
  exit: {
    opacity: 0,
    y: -60,
    transition: { duration: 3.5, ease: "easeInOut" },
  },
};

// DoctorRoom component with lowered position
const StaticDoctorRoom = () => {
  return (
    <group>
      <OfficeRoom scale={1} position={[0, -1, 1]} />{" "}
      {/* Lowered by 2 units on y-axis */}
    </group>
  );
};

// Main component
const BookingIntro = () => {
  const [index, setIndex] = useState(0);
  const isLast = useMemo(() => index === messages.length - 1, [index]);

  useEffect(() => {
    let timer;
    if (isLast) {
      timer = setTimeout(() => {
        setIndex(0); // Quay lại thông điệp đầu tiên
      }, 13000); // 13 giây sau thông điệp cuối
    } else {
      timer = setInterval(() => {
        setIndex((prev) => prev + 1);
      }, 6000); // Chuyển thông điệp mỗi 6 giây
    }
    return () => clearTimeout(timer);
  }, [isLast]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 to-teal-900 overflow-hidden flex">
      {/* 3D DoctorRoom section */}
      <div className="hidden md:block w-1/2 h-full relative">
        <Canvas camera={{ position: [4, 0, 3], fov: 70 }}>
          <ambientLight intensity={0.8} />
          <directionalLight intensity={1} position={[5, 5, 5]} />
          <Suspense fallback={null}>
            <StaticDoctorRoom />
          </Suspense>
        </Canvas>
      </div>

      {/* Text section */}
      <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center gap-8 px-4">
        <AnimatePresence mode="wait">
          <motion.h1
            key={messages[index].id}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-3xl md:text-5xl font-bold text-white text-center"
          >
            {messages[index].text}
          </motion.h1>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookingIntro;
