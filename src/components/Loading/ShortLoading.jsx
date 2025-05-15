/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const ShortLoading = ({ text }) => {
  const dotVariants = {
    hidden: { y: 0 },
    visible: (i) => ({
      y: -8,
      transition: {
        delay: i * 0.2,
        duration: 0.4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    }),
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <div className="flex items-center gap-1 text-white">
      {/* Text */}
      <span className="text-sm">{text}</span>
      {/* Second set of dots */}
      <div className="flex gap-0.5">
        {[3, 4, 5].map((index) => (
          <motion.span
            key={`right-${index}`}
            variants={dotVariants}
            initial="hidden"
            animate="visible"
            custom={index}
            className="text-green-500 text-xl"
          >
            .
          </motion.span>
        ))}
      </div>
      {/* Spinning circle */}
      <motion.div
        variants={spinnerVariants}
        animate="animate"
        className="w-4 h-4 border-2 border-t-green-500 border-l-green-500 border-r-transparent border-b-transparent rounded-full"
      />
    </div>
  );
};

ShortLoading.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ShortLoading;
