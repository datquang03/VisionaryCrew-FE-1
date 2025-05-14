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
    // Đảm bảo GSAP hoạt động sau khi component được render
    const container = containerRef.current;
    const title = titleRef.current;
    const stars = starsRef.current;
    const subtitle = subtitleRef.current;

    // Animation khi hover
    const onHover = () => {
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
        stagger: 0.1, // Hiệu ứng lần lượt cho từng sao
        repeat: 1, // Lặp lại để tạo hiệu ứng nhấp nháy
        yoyo: true, // Quay lại trạng thái ban đầu
      });

      gsap.to(subtitle, {
        color: "#fefce8", // amber-100
        opacity: 0.8,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    // Animation khi rời hover
    const onLeave = () => {
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

    // Thêm sự kiện hover
    container.addEventListener("mouseenter", onHover);
    container.addEventListener("mouseleave", onLeave);

    // Cleanup sự kiện khi component unmount
    return () => {
      container.removeEventListener("mouseenter", onHover);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full mt-4 rounded-3xl p-4 from-green-300 via-green-500 to-green-600 bg-gradient-to-br shadow-lg relative h-100 flex justify-center items-center"
    >
      <div className="w-[70%] mx-auto text-center">
        <h2 ref={titleRef} className="text-4xl font-bold text-cyan-100">
          Chúng tôi đã nhận được hơn 1000+ lượt tương tác tốt trên tất cả các
          mạng xã hội
        </h2>
        <div
          ref={starsRef}
          className="flex justify-center mt-10 text-yellow-600 gap-2 text-2xl"
        >
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalfAlt />
        </div>
        <p ref={subtitleRef} className="text-lg text-amber-300 mt-5">
          Đánh giá trung bình trên mạng xã hội là 4.6
        </p>
      </div>
    </div>
  );
};

export default RatingReview;
