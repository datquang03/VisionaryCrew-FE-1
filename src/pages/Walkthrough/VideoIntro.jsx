/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Suspense, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Zoom } from "../../../public/3d-zoom-app-logo/source/Zoom";

// Messages for the intro slides
const videoMessages = [
  { id: 1, text: "Kết nối với bác sĩ qua video call" },
  { id: 2, text: "Sử dụng Zoom SDK cho trải nghiệm mượt mà" },
  {
    id: 3,
    text: "Bạn sẽ không cần lúc nào cũng phải đi ra bệnh viện để có phương án tốt nhất",
  },
  {
    id: 4,
    text: "Hỗ trợ sức khỏe từ xa, mọi lúc, mọi nơi với giá thành rất rẻ",
  },
  {
    id: 5,
    text: "Luôn sẵn sàng đáp ứng các nhu cầu về sức khỏe của bạn",
  },
  {
    id: 6,
    text: "Cung cấp những dịch vụ tốt nhất dành cho bạn",
  },
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

// Floating Zoom logo component
const AnimatedZoom = () => {
  const zoomRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (zoomRef.current) {
      zoomRef.current.position.y = -3 + Math.sin(time * 1.5) * 0.5;
    }
  });

  return (
    <group ref={zoomRef}>
      <Zoom scale={1} position={[0, 0, 0]} />
    </group>
  );
};

// Main component
const VideoIntro = ({ onContinue }) => {
  const [index, setIndex] = useState(0);
  const isLast = useMemo(() => index === videoMessages.length - 1, [index]);

  useEffect(() => {
    let timer;
    if (isLast) {
      timer = setTimeout(() => {
        onContinue(); // Automatically proceed to next section
      }, 11000); // 12-second delay after last message
    } else {
      timer = setInterval(() => {
        setIndex((prev) => prev + 1);
      }, 6000); // Change message every 7s
    }
    return () => clearTimeout(timer);
  }, [isLast, onContinue]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 to-teal-900 overflow-hidden flex">
      {/* Text section */}
      <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center gap-8 px-4">
        <AnimatePresence mode="wait">
          <motion.h1
            key={videoMessages[index].id}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-3xl md:text-5xl font-bold text-white text-center"
          >
            {videoMessages[index].text}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* 3D Zoom logo section */}
      <div className="hidden md:block w-1/2 h-full relative">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.8} />
          <directionalLight intensity={1} position={[5, 5, 5]} />
          <Suspense fallback={null}>
            <AnimatedZoom />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default VideoIntro;
