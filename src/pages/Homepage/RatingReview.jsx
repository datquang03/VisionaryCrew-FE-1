/* eslint-disable no-unused-vars */
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const RatingReview = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const starsRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    const stars = starsRef.current;
    const subtitle = subtitleRef.current;

    // Animation when interacting (hover or touch)
    const onInteractStart = () => {
      gsap.to(container, {
        scale: 1.02,
        backgroundImage:
          "linear-gradient(to bottom right, #93c5fd, #3b82f6, #1d4ed8)",
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(title, {
        color: "#ecfeff", // cyan-50
        y: -10,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(stars.children, {
        scale: 1.2,
        color: "#facc15", // yellow-400
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.1,
        repeat: 1,
        yoyo: true,
      });

      gsap.to(subtitle, {
        color: "#fefce8", // amber-100
        opacity: 0.8,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const onInteractEnd = () => {
      gsap.to(container, {
        scale: 1,
        backgroundImage:
          "linear-gradient(to bottom right, #86efac, #22c55e, #15803d)",
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(title, {
        color: "#cffafe", // cyan-100
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(stars.children, {
        scale: 1,
        color: "#ca8a04", // yellow-600
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(subtitle, {
        color: "#fcd34d", // amber-300
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    // Add hover and touch events
    container.addEventListener("mouseenter", onInteractStart);
    container.addEventListener("mouseleave", onInteractEnd);
    container.addEventListener("touchstart", onInteractStart);
    container.addEventListener("touchend", onInteractEnd);

    // Cleanup events on unmount
    return () => {
      container.removeEventListener("mouseenter", onInteractStart);
      container.removeEventListener("mouseleave", onInteractEnd);
      container.removeEventListener("touchstart", onInteractStart);
      container.removeEventListener("touchend", onInteractEnd);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full mt-4 rounded-3xl p-4 sm:p-6 md:p-8 bg-gradient-to-br from-green-300 via-green-500 to-green-600 shadow-lg flex justify-center items-center min-h-[300px] sm:min-h-[350px] md:min-h-[400px] max-w-5xl mx-auto"
    >
      <div className="w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] mx-auto text-center">
        <h2
          ref={titleRef}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-100 mb-4 sm:mb-6 md:mb-8"
        >
          Chúng tôi đã nhận được hơn 1000+ lượt tương tác tốt trên tất cả các
          mạng xã hội
        </h2>
        <div
          ref={starsRef}
          className="flex justify-center gap-1 sm:gap-2 text-xl sm:text-2xl md:text-3xl text-yellow-600 mt-6 sm:mt-8 md:mt-10"
        >
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalfAlt />
        </div>
        <p
          ref={subtitleRef}
          className="text-sm sm:text-base md:text-lg text-amber-300 mt-4 sm:mt-5 md:mt-6"
        >
          Đánh giá trung bình trên mạng xã hội là 4.6
        </p>
      </div>
    </div>
  );
};

export default RatingReview;
