import React, { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import spaceBg from "../../assets/universe.jpg";
import astronautImg from "../../assets/astronaut.png";

const NotFoundPage = () => {
  const notFoundRef = useRef(null);
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const notFoundElement = notFoundRef.current;
    const options = { root: null, rootMargin: "0px", threshold: 0.1 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0", "translate-y-8");
          entry.target.classList.add("opacity-100", "translate-y-0");
          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (notFoundElement) observer.observe(notFoundElement);

    return () => {
      if (notFoundElement) observer.unobserve(notFoundElement);
    };
  }, []);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  // ✅ Chỉ tạo particle 1 lần
  const particles = useMemo(() => {
    return [...Array(50)].map((_, i) => (
      <div
        key={i}
        className="absolute bg-white rounded-full animate-particle"
        style={{
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 5 + 5}s`,
          animationDelay: `${Math.random() * 2}s`,
        }}
      />
    ));
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: `url(${spaceBg})` }}
    >
      {/* Lớp overlay ánh sáng theo chuột */}
      <div
        className="absolute inset-0 z-10 pointer-events-none transition-all duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0) 60px, rgba(0,0,0,0.9) 180px)`,
        }}
      />

      {/* Hiệu ứng particle */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles}
      </div>

      <div
        ref={notFoundRef}
        className="text-center transition-all duration-1000 ease-in-out opacity-0 translate-y-8 relative z-20"
      >
        <div className="relative flex justify-center mb-8">
          <img
            src={astronautImg}
            alt="404 Astronaut"
            className="w-64 h-64 object-contain animate-float"
          />
          <div className="absolute w-4 h-4 bg-yellow-300 rounded-full animate-twinkle top-10 left-20"></div>
          <div className="absolute w-3 h-3 bg-yellow-200 rounded-full animate-twinkle top-20 right-16 delay-200"></div>
          <div className="absolute w-5 h-5 bg-yellow-400 rounded-full animate-twinkle bottom-10 left-16 delay-400"></div>
        </div>

        <h1 className="text-9xl font-bold animate-colorChange tracking-wider">
          404
        </h1>

        <p className="text-2xl mt-4 mb-8 animate-fadeIn font-bold text-white">
          Trang bạn đang tìm hiện không tồn tại
        </p>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-purple-600 text-white rounded-full shadow-lg scale-100 hover:scale-105 hover:bg-purple-700 transition-all duration-500 ease-in-out animate-bounceIn cursor-pointer"
        >
          Về trang chủ
        </button>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(2deg); }
          50% { transform: translateY(-20px) rotate(-2deg); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.7); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        .animate-twinkle { animation: twinkle 2.5s ease-in-out infinite; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }

        @keyframes colorChange {
          0% { color: #ff6f61; text-shadow: 0 0 10px rgba(255, 111, 97, 0.5); }
          50% { color: #ffcc5c; text-shadow: 0 0 20px rgba(255, 204, 92, 0.8); }
          100% { color: #ff6f61; text-shadow: 0 0 10px rgba(255, 111, 97, 0.5); }
        }
        .animate-colorChange { animation: colorChange 6s ease-in-out infinite; }

        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          animation-delay: 0.5s;
        }

        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3) translateY(50px); }
          50% { opacity: 1; transform: scale(1.1) translateY(-10px); }
          100% { transform: scale(1) translateY(0); }
        }
        .animate-bounceIn {
          animation: bounceIn 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          animation-delay: 1s;
        }

        @keyframes particle {
          0% { transform: translateY(0); opacity: 0.8; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .animate-particle {
          animation: particle linear infinite;
        }

        @media (max-width: 640px) {
          .text-9xl { font-size: 5rem; }
          .text-2xl { font-size: 1.25rem; }
          .w-64 { width: 12rem; height: 12rem; }
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;
