import React from "react";

const ThreeDButton = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`relative px-6 py-2 font-semibold text-white bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform duration-300 active:scale-95 ${className} cursor-pointer`}
    >
      {children}
    </button>
  );
};

export default ThreeDButton;
