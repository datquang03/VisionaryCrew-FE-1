/* eslint-disable no-unused-vars */
import Navbar from "../../components/layout/Navbar";
import IntroSection from "./IntroSection";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef, useEffect, useState } from "react";
import OptionSection from "./OptionSection";
import AchievementSection from "./AchievementSection";
import RatingReview from "./RatingReview";
import TechStack from "./TechStack";

// Animation variants for all sections, including Navbar
const sectionVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 }, // Slide up from below, slightly scaled
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
  // State to track which sections are revealed in sequence
  const [revealedSections, setRevealedSections] = useState({
    navbar: false,
    intro: false,
    option: false,
    achievement: false,
    rating: false,
    techStack: false,
  });

  // Track if initial load sequence is complete
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  // Refs for inView detection
  const optionRef = useRef(null);
  const achievementRef = useRef(null);
  const ratingRef = useRef(null);
  const techStackRef = useRef(null);

  // useInView hooks
  const { ref: optionInViewRef, inView: rawOptionInView } = useInView({
    threshold: 0.3,
    triggerOnce: false, // Allow re-triggering on scroll
  });

  const { ref: achievementInViewRef, inView: rawAchievementInView } = useInView(
    {
      threshold: 0.3,
      triggerOnce: false,
    }
  );

  const { ref: ratingInViewRef, inView: rawRatingInView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const { ref: techStackInViewRef, inView: rawTechStackInView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  // Combine refs for each section
  const setOptionRefs = (node) => {
    optionRef.current = node;
    optionInViewRef(node);
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

  // Sticky Navbar logic
  useEffect(() => {
    const handleScroll = () => {
      setIsStickyNavbar(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sequential animation on page load
  useEffect(() => {
    const timers = [];
    // Animate sections in sequence
    timers.push(
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
        setRevealedSections((prev) => ({ ...prev, achievement: true }));
      }, 900),
      setTimeout(() => {
        setRevealedSections((prev) => ({ ...prev, rating: true }));
      }, 1200),
      setTimeout(() => {
        setRevealedSections((prev) => ({ ...prev, techStack: true }));
        setInitialLoadComplete(true); // Mark initial sequence complete
      }, 1500)
    );

    return () => timers.forEach(clearTimeout); // Cleanup timers
  }, []);

  // Determine animation state for each section
  const getSectionAnimation = (sectionKey, inView) => {
    // During initial load, use revealedSections state
    if (!initialLoadComplete) {
      return revealedSections[sectionKey] ? "visible" : "hidden";
    }
    // After initial load, use inView for scroll-based animations
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

      {/* Navbar with initial animation + sticky behavior */}
      <motion.div
        initial="hidden"
        animate={revealedSections.navbar ? "visible" : "hidden"}
        variants={sectionVariants}
      >
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

      {/* Intro Section */}
      <motion.div
        initial="hidden"
        animate={getSectionAnimation("intro", true)} // Intro always visible after initial load
        variants={sectionVariants}
        className="relative z-10 mt-4" // Increased margin to avoid overlap with sticky navbar
      >
        <IntroSection />
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
