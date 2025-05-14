/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect } from "react";

// CustomHotToast component
const CustomHotToast = ({ id, message, type, visible, onClose }) => {
  // Xác định icon dựa trên type
  const getIcon = () => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "info":
        return "ℹ️";
      case "warning":
        return "⚠️";
      default:
        return "📢";
    }
  };

  // Xác định màu nền và viền dựa trên type
  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-gradient-to-r from-green-100 to-green-200 border-l-4 border-green-500";
      case "error":
        return "bg-gradient-to-r from-red-100 to-red-200 border-l-4 border-red-500";
      case "info":
        return "bg-gradient-to-r from-blue-100 to-blue-200 border-l-4 border-blue-500";
      case "warning":
        return "bg-gradient-to-r from-yellow-100 to-yellow-200 border-l-4 border-yellow-500";
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-200 border-l-4 border-gray-500";
    }
  };

  // Animation cho toast
  const toastVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.2 } },
  };

  // Animation cho icon
  const iconVariants = {
    hidden: { scale: 0, rotate: 0 },
    visible: {
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.5, repeat: 1 },
    },
  };

  // Tự động đóng toast sau duration
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose(id);
      }, 6000); // Phù hợp với toastOptions.duration
      return () => clearTimeout(timer);
    }
  }, [visible, id, onClose]);

  return (
    <motion.div
      className={`flex items-center p-4 m-2 rounded-lg shadow-lg min-w-[280px] max-w-[400px] font-sans ${getTypeStyles()}`}
      variants={toastVariants}
      initial="hidden"
      animate={visible ? "visible" : "exit"}
    >
      <motion.div className="text-2xl mr-3" variants={iconVariants}>
        {getIcon()}
      </motion.div>
      <div className="flex-1">
        <p className="text-sm md:text-base text-gray-800">{message}</p>
      </div>
      <motion.div
        className="text-lg cursor-pointer p-1 rounded-full hover:bg-gray-200/50"
        variants={iconVariants}
        whileHover={{ scale: 1.2, rotate: 90 }}
        onClick={() => onClose(id)}
      >
        ×
      </motion.div>
    </motion.div>
  );
};

export default CustomHotToast;
