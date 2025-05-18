/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

// Animation variants for the navbar
const sectionVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const StickyNavbar = () => {
  const [isStickyNavbar, setIsStickyNavbar] = useState(false);

  // Sticky navbar logic
  useEffect(() => {
    const handleScroll = () => {
      setIsStickyNavbar(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isStickyNavbar
            ? "fixed top-0 left-0 w-full z-100 bg-white shadow-md"
            : "relative z-50"
        }`}
      >
        <Navbar />
      </div>
    </motion.div>
  );
};

export default StickyNavbar;
