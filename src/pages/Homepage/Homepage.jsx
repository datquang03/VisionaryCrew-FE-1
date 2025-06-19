/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Navbar from "../../components/layout/Navbar/Navbar"; // Đảm bảo đường dẫn đúng
import MobileNavbar from "../../components/layout/Navbar/MobileNavbar"; // Đảm bảo đường dẫn đúng
import OptionSection from "./OptionSection";
import AchievementSection from "./AchievementSection";
import RatingReview from "./RatingReview";
import TechStack from "./TechStack";
import MobileIntroSection from "./MobileIntroSection";
import IntroSection from "./IntroSection";
import GetDoctor from "./DoctorInfo"

// Animation variants for all sections
const sectionVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const Homepage = () => {
  const [isStickyNavbar, setIsStickyNavbar] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [revealedSections, setRevealedSections] = useState({
    navbar: false,
    intro: false,
    option: false,
    doctor: false,
    achievement: false,
    rating: false,
    techStack: false,
  });
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  const optionRef = useRef(null);
  const doctorRef = useRef(null);
  const achievementRef = useRef(null);
  const ratingRef = useRef(null);
  const techStackRef = useRef(null);

  const { ref: optionInViewRef, inView: rawOptionInView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const { ref: doctorInViewRef, inView: rawDoctorInView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const { ref: achievementInViewRef, inView: rawAchievementInView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const { ref: ratingInViewRef, inView: rawRatingInView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const { ref: techStackInViewRef, inView: rawTechStackInView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const setOptionRefs = (node) => {
    optionRef.current = node;
    optionInViewRef(node);
  };

  const setDoctorRefs = (node) => {
    doctorRef.current = node;
    doctorInViewRef(node);
  };

  const setAchievementRefs = (node) => {
    achievementRef.current = node;
    achievementInViewRef(node);
  };

  const setRatingRefs = (node) => {
    ratingRef.current = node;
    ratingInViewRef(node);
  };

  const setTechStackRefs = (node) => {
    techStackRef.current = node;
    techStackInViewRef(node);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsStickyNavbar(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => {
        setRevealedSections((prev) => ({ ...prev, navbar: true }));
      }, 0),
      setTimeout(() => {
        setRevealedSections((prev) => ({ ...prev, intro: true }));
      }, 300),
      setTimeout(() => {
        setRevealedSections((prev) => ({ ...prev, option: true }));
      }, 600),
      setTimeout(() => {
        setRevealedSections((prev) => ({ ...prev, doctor: true }));
      }, 700),
      setTimeout(() => {
        setRevealedSections((prev) => ({ ...prev, achievement: true }));
      }, 900),
      setTimeout(() => {
        setRevealedSections((prev) => ({ ...prev, rating: true }));
      }, 1200),
      setTimeout(() => {
        setRevealedSections((prev) => ({ ...prev, techStack: true }));
        setInitialLoadComplete(true);
      }, 1500),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const getSectionAnimation = (sectionKey, inView) => {
    if (!initialLoadComplete) {
      return revealedSections[sectionKey] ? "visible" : "hidden";
    }
    return inView ? "visible" : "hidden";
  };

  return (
    <div className="relative p-4 min-h-screen">
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-gray-900 pointer-events-none transition-opacity duration-300 ${
          isCardHovered ? "opacity-50" : "opacity-0"
        }`}
      ></div>

      {/* Navbar Section */}
      <motion.div // Sửa từ motion.divider thành motion.div
        initial="hidden"
        animate={revealedSections.navbar ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <div
          className={`transition-all duration-300 ease-in-out ${
            isStickyNavbar
              ? "fixed top-0 left-0 w-full z-50 bg-white shadow-md"
              : "relative z-50"
          }`}
        >
          <div className="hidden md:block">
            <Navbar />
          </div>
          <div className="md:hidden">
            <MobileNavbar />
          </div>
        </div>
      </motion.div>

      {/* Intro Section */}
      <motion.div
        initial="hidden"
        animate={getSectionAnimation("intro", true)}
        variants={sectionVariants}
        className="relative z-10 mt-4"
      >
        <div className="hidden md:block">
          <IntroSection />
        </div>
        <div className="md:hidden">
          <MobileIntroSection />
        </div>
      </motion.div>

      {/* Option Section */}
      <motion.div
        ref={setOptionRefs}
        initial="hidden"
        animate={getSectionAnimation("option", rawOptionInView)}
        variants={sectionVariants}
        className="relative z-10"
      >
        <OptionSection setIsCardHovered={setIsCardHovered} />
      </motion.div>

      {/* Doctor Section */}
      <motion.div
        ref={setDoctorRefs}
        initial="hidden"
        animate={getSectionAnimation("doctor", rawDoctorInView)}
        variants={sectionVariants}
        className="relative z-10"
      >
        <GetDoctor setIsCardHovered={setIsCardHovered} />
      </motion.div>

      {/* Achievement Section */}
      <motion.div
        ref={setAchievementRefs}
        initial="hidden"
        animate={getSectionAnimation("achievement", rawAchievementInView)}
        variants={sectionVariants}
        className="relative z-10"
      >
        <AchievementSection />
      </motion.div>

      {/* Rating Review */}
      <motion.div
        ref={setRatingRefs}
        initial="hidden"
        animate={getSectionAnimation("rating", rawRatingInView)}
        variants={sectionVariants}
        className="relative z-10"
      >
        <RatingReview />
      </motion.div>

      {/* Tech Stack */}
      <motion.div
        ref={setTechStackRefs}
        initial="hidden"
        animate={getSectionAnimation("techStack", rawTechStackInView)}
        variants={sectionVariants}
        className="relative z-10"
      >
        <TechStack />
      </motion.div>
    </div>
  );
};

export default Homepage;