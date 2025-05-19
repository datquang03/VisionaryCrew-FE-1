/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const CardContainer = ({
  children,
  className,
  containerClassName,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 15;
    const rotateY = ((centerX - x) / centerX) * 15;
    setMousePosition({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div
      className={cn("relative group/card z-10 cursor-pointer", containerClassName)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div style={{ perspective: "1000px" }} className="w-full h-full">
        <motion.div
          style={{
            transform: isHovering
              ? `rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg) scale(1.02)`
              : "rotateX(0deg) rotateY(0deg) scale(1)",
            transition: "transform 0.3s ease-out",
          }}
          className="w-full h-full"
        >
          <div
            className={cn(
              "w-full h-full rounded-2xl shadow-xl transition-all duration-500",
              className
            )}
          >
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const CardBody = ({ children, className }) => {
  return (
    <div
      className={cn(
        "h-[400px] w-[340px] md:w-[400px] transform-style-3d bg-gray-800 rounded-xl overflow-hidden transition-all duration-500 group-hover/card:bg-white group-hover/card:text-black flex flex-col justify-between p-6 border border-white/10 group-hover/card:border-white/30",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}) => {
  const style = {
    transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
  };

  return (
    <Tag className={cn("w-fit transition-transform duration-500", className)} style={style} {...rest}>
      {children}
    </Tag>
  );
};
