/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const AchievementSection = () => {
  const [inViewRef, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [isVisible, setIsVisible] = useState(false);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (inView) setIsVisible(true);
  }, [inView]);

  const baseAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const handleHover = (index, enter) => {
    const el = cardRefs.current[index];
    if (!el) return;

    gsap.to(el, {
      scale: enter ? 1.05 : 1,
      y: enter ? -5 : 0,
      boxShadow: enter
        ? `0 0 20px rgba(255, 0, 102, 0.6),
           0 0 30px rgba(0, 204, 255, 0.5),
           0 0 40px rgba(102, 255, 102, 0.4)`
        : "0 4px 10px rgba(0,0,0,0.1)",
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleParallax = (e, index) => {
    const el = cardRefs.current[index];
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;

    gsap.to(el, {
      rotateX: -y,
      rotateY: x,
      transformPerspective: 800,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const resetParallax = (index) => {
    const el = cardRefs.current[index];
    if (!el) return;
    gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.4, ease: "power3.out" });
  };

  const setCardRef = (el, index) => {
    if (el) cardRefs.current[index] = el;
  };

  const cardProps = (index) => ({
    ref: (el) => setCardRef(el, index),
    onMouseEnter: () => handleHover(index, true),
    onMouseLeave: () => {
      handleHover(index, false);
      resetParallax(index);
    },
    onMouseMove: (e) => handleParallax(e, index),
  });

  return (
    <div ref={inViewRef} className="px-4 py-16 bg-white rounded-4xl">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Left Card */}
        <motion.div
          {...cardProps(0)}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={baseAnimation}
          className="bg-yellow-400 rounded-2xl p-6 flex flex-col justify-between shadow-md flex-1 cursor-pointer"
        >
          <div>
            <span className="text-sm font-medium text-gray-800 inline-block mb-2">
              🎧 Podcast
            </span>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
              Nutrition and <br /> Mental Health
            </h3>
            <p className="text-gray-900 text-sm">
              The food we eat provides the nutrients that our bodies and brains
              need to function properly.
            </p>
          </div>
          <div className="mt-6 flex justify-between items-end">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4341/4341139.png"
              alt="icon"
              className="w-20 h-auto object-contain"
            />
            <button className="w-10 h-10 bg-white text-blue-500 rounded-full flex items-center justify-center shadow hover:scale-110 transition">
              ▶
            </button>
          </div>
        </motion.div>

        {/* Right Column */}
        <div className="flex flex-col justify-between gap-6 flex-1">
          {/* Top Right */}
          <motion.div
            {...cardProps(1)}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={baseAnimation}
            className="bg-blue-700 text-white rounded-2xl p-6 shadow-md flex justify-between items-start cursor-pointer h-40"
          >
            <div>
              <span className="text-sm font-medium text-red-200 mb-2 inline-block">
                🔴 Live Event
              </span>
              <h3 className="text-xl font-bold leading-snug">
                Healthy Habits for a Happy Heart
              </h3>
            </div>
            <p className="text-sm text-blue-200">Feb 28, 2023 08:00 PM</p>
          </motion.div>

          {/* Bottom Right */}
          <div className="flex flex-col sm:flex-row gap-6">
            <motion.div
              {...cardProps(2)}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={baseAnimation}
              className="bg-green-100 rounded-2xl p-6 shadow-md flex-1 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-gray-800">08</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </motion.div>

            <motion.div
              {...cardProps(3)}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={baseAnimation}
              className="bg-pink-100 rounded-2xl p-6 shadow-md flex-1 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-gray-800">120k</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementSection;
