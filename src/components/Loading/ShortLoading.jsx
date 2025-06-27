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

    </div>
  );
};

ShortLoading.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ShortLoading;
