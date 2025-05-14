/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { WavingDoctor } from "../../../public/WavingDoctor";

// Text content for the right side
const techMessages = [
  { id: 1, text: "Xin chào từ đội ngũ công nghệ!" },
  { id: 2, text: "Giới thiệu bác sĩ ảo của bạn" },
  { id: 3, text: "Có thể giải đáp những thắc mắc về vấn đề sức khỏe của bạn" },
  { id: 4, text: "Và đưa ra những gợi ý tốt nhất" },
];

// Animation variants
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

const TechIntro = ({ onContinue }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeout;
    if (index < techMessages.length - 1) {
      timeout = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 7200); // 3.5s in + 3.5s out = 7s
    } else {
      // Automatically proceed to next section after 12-second delay
      timeout = setTimeout(() => {
        onContinue();
      }, 7000); // 12-second delay after last message
    }
    return () => clearTimeout(timeout);
  }, [index, onContinue]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 to-teal-900 overflow-hidden flex">
      {/* Left Side */}
      <div className="w-1/2 h-full relative">
        <Canvas>
          <directionalLight intensity={0.5} position={[5, 5, 5]} />
          <ambientLight intensity={1} />
          <group position={[0, -2, 1]}>
            <WavingDoctor scale={40} />
          </group>
        </Canvas>
      </div>

      {/* Right Side */}
      <div className="w-1/2 h-full flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.h1
            key={techMessages[index].id}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-4xl md:text-6xl font-bold text-white text-center px-4"
          >
            {techMessages[index].text}
          </motion.h1>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TechIntro;
