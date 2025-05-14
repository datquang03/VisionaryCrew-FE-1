/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaMusic, FaHeadphones, FaWaveSquare } from "react-icons/fa";

const FloatingIcon = ({ icon: Icon, delay, x, y }) => (
  <motion.div
    className="absolute text-teal-400 opacity-60"
    initial={{ opacity: 0, y: 0 }}
    animate={{
      y: [0, -20, 0],
      opacity: [0, 1, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
    style={{ left: x, top: y }}
  >
    <Icon size={30} />
  </motion.div>
);

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 99) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5 + 1); // tăng ngẫu nhiên 1–5%
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
      {/* Vòng tròn loader */}
      <motion.div
        className="w-24 h-24 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-6"
        aria-label="Loading spinner"
      />
      <h1 className="text-xl font-semibold mb-2 animate-pulse">
        Đang chuẩn bị trải nghiệm âm thanh... 🎧
      </h1>
      <div className="text-lg">{progress}%</div>

      {/* Icon bay lơ lửng */}
      <FloatingIcon icon={FaMusic} delay={0} x="10%" y="20%" />
      <FloatingIcon icon={FaHeadphones} delay={1} x="80%" y="30%" />
      <FloatingIcon icon={FaWaveSquare} delay={2} x="50%" y="10%" />
      <FloatingIcon icon={FaMusic} delay={1.5} x="20%" y="70%" />
      <FloatingIcon icon={FaHeadphones} delay={0.8} x="70%" y="80%" />
    </div>
  );
};

export default LoadingScreen;
