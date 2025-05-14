/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import FloatingParticles from "../../components/3D_Threejs/FloatingPraticles";
import { OrbitControls } from "@react-three/drei";

const messages = [
  { id: 1, text: "Visionary Crew xin kính chào" },
  { id: 2, text: "Chúng tôi là những người yêu sáng tạo" },
  {
    id: 3,
    text: "Ngày nay khi mọi thứ càng phát triển, chúng ta vẫn luôn chú ý đến việc bảo vệ sức khỏe",
  },
  { id: 4, text: "Chỉ có sức khỏe tốt mới là vàng bạc châu báu thực sự" },
  {
    id: 5,
    text: "Hãy cùng Visionary Crew đồng hành với bạn trong việc gìn giữ sức khỏe",
  },
  {
    id: 6,
    text: "Với nhiều công nghệ tiên tiến, đảm bảo sức khỏe của bạn sẽ được theo dõi và hỗ trợ",
  },
  {
    id: 7,
    text: "Hãy cùng chúng tôi trải nghiệm những thứ tốt đẹp mà chúng tôi mang đến cho bạn",
  },
];

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

const WelcomeSection = ({ onContinue }) => {
  const [index, setIndex] = useState(0);
  const [showIcons, setShowIcons] = useState(false);

  useEffect(() => {
    let timeout;
    if (index < messages.length - 1) {
      timeout = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 6000); // Time delay between each text
    } else {
      // Delay showing icons and trigger onContinue after last message
      timeout = setTimeout(() => {
        setShowIcons(true);
        onContinue(); // Automatically proceed to next section
      }, 13000); // 13-second delay after last message
    }
    return () => clearTimeout(timeout);
  }, [index, onContinue]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 to-teal-900 overflow-hidden">
      <Canvas className="absolute inset-0 pointer-events-none z-10">
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} intensity={0.5} color="#d05edb" />
        <OrbitControls />
        <FloatingParticles showIcons={showIcons} />
      </Canvas>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.h1
            key={messages[index].id}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="min-h-[80px] text-4xl md:text-6xl font-bold text-white text-center px-4"
          >
            {messages[index].text}
          </motion.h1>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WelcomeSection;
