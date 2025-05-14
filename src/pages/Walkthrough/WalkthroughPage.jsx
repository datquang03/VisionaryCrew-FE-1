/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TechIntro from "./TechIntro";
import WelcomeSection from "./WelcomeSection";
import VideoIntro from "./VideoIntro";
import MusicPlayer from "./MusicPlayer";
import { FaVolumeMute } from "react-icons/fa";
import { FaVolumeHigh } from "react-icons/fa6";
import BookingIntro from "./BookingIntro";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import { useNavigate } from "react-router-dom"; // Thêm hook điều hướng (react-router-dom)

const pageVariants = {
  initial: { opacity: 0, x: "100vw" },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    x: "-100vw",
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};

const WalkthroughPage = () => {
  const [currentSection, setCurrentSection] = useState("welcome");
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [loading, setLoading] = useState(true); // Initial loading state
  const navigate = useNavigate(); // Hook điều hướng

  // Fake loading for 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timeout);
  }, []);

  const handleIconClick = () => {
    setIsMuted((prev) => !prev);
  };

  const handlePromptResponse = () => {
    setIsMuted(false);
    setHasInteracted(true);
    setShowPrompt(false);
  };

  const handleGoHome = () => {
    navigate("/"); // Điều hướng về trang chủ
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="min-h-screen relative">
        {/* Nút quay về trang chủ */}
        <motion.div
          className="fixed top-4 left-4 z-50"
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <button
            onClick={handleGoHome}
            className="p-2 bg-teal-800 rounded-full text-white hover:bg-teal-500 transition-all cursor-pointer hover:scale-110 duration-500 ease-in-out"
          >
            Trở về trang chủ
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          {hasInteracted && (
            <motion.div
              key={`volume-${currentSection}`}
              className="fixed top-10 right-12 z-50"
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <button
                onClick={handleIconClick}
                className="p-2 bg-teal-800 rounded-full hover:bg-teal-500 transition-all cursor-pointer hover:scale-110 duration-500 ease-in-out"
              >
                {isMuted ? (
                  <FaVolumeMute className="text-white size-10" />
                ) : (
                  <FaVolumeHigh className="text-white size-10" />
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showPrompt && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
            >
              <motion.div
                className="bg-gray-800 p-6 rounded-lg text-white max-w-sm text-center"
                initial={{ scale: 1 }}
                animate={{
                  scale: [1, 1.05, 1],
                  transition: {
                    duration: 1.2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 0.8,
                  },
                }}
              >
                <h2 className="text-xl font-semibold mb-4">
                  Chú ý ! Có âm thanh nền 🔊⚠️
                </h2>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handlePromptResponse}
                    className="px-4 py-2 bg-teal-600 rounded hover:bg-teal-500 transition-colors cursor-pointer"
                  >
                    Tôi hiểu !
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {hasInteracted && (
          <>
            <MusicPlayer isMuted={isMuted} shouldPlay={hasInteracted} />
            <AnimatePresence mode="wait">
              {currentSection === "welcome" && (
                <motion.div
                  key="welcome"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <WelcomeSection
                    onContinue={() => setCurrentSection("techIntro")}
                  />
                </motion.div>
              )}
              {currentSection === "techIntro" && (
                <motion.div
                  key="techIntro"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <TechIntro
                    onContinue={() => setCurrentSection("videoIntro")}
                  />
                </motion.div>
              )}
              {currentSection === "videoIntro" && (
                <motion.div
                  key="videoIntro"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <VideoIntro
                    onContinue={() => setCurrentSection("bookingIntro")}
                  />
                </motion.div>
              )}
              {currentSection === "bookingIntro" && (
                <motion.div
                  key="bookingIntro"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <BookingIntro />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </Suspense>
  );
};

export default WalkthroughPage;
