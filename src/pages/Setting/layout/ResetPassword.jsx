"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const ResetPassword = () => {
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const eyeIconRefs = useRef([]); // Array to store refs for eye icons

  // State to track visibility for each password field
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    // Container animation: fade-in with slight rotation
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, rotateX: 10 },
      { opacity: 1, rotateX: 0, duration: 1, ease: 'power3.out' }
    );

    // Input fields: staggered fade-in with upward motion and scale
    gsap.fromTo(
      '.input-field',
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out', delay: 0.2 }
    );

    // Button: pulse effect on load
    gsap.fromTo(
      buttonRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.7)', delay: 0.8 }
    );
    gsap.to(buttonRef.current, {
      scale: 1.02,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  const handleButtonHover = (e) => {
    gsap.to(buttonRef.current, {
      scale: e.type === 'mouseenter' ? 1.1 : 1,
      boxShadow: e.type === 'mouseenter' ? '0 0 15px rgba(59, 130, 246, 0.5)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      duration: 0.3,
      ease: 'power1.inOut',
    });
  };

  const handleButtonClick = () => {
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut',
      onComplete: () => {
        gsap.to(buttonRef.current, { scale: 1, duration: 0.2 });
      },
    });
  };

  const togglePasswordVisibility = (field, index) => {
    // Toggle the appropriate state based on the field
    if (field === 'old') setShowOldPassword((prev) => !prev);
    if (field === 'new') setShowNewPassword((prev) => !prev);
    if (field === 'confirm') setShowConfirmPassword((prev) => !prev);

    // Animate the eye icon on toggle
    gsap.to(eyeIconRefs.current[index], {
      scale: 0.8,
      opacity: 0.7,
      duration: 0.2,
      ease: 'power1.inOut',
      onComplete: () => {
        gsap.to(eyeIconRefs.current[index], {
          scale: 1,
          opacity: 1,
          duration: 0.2,
          ease: 'power1.inOut',
        });
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[400px] max-w-lg mx-auto">
      <div
        ref={containerRef}
        className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
          Cài Đặt Mật Khẩu
        </h2>
        <div className="relative mb-4">
          <input
            type={showOldPassword ? 'text' : 'password'}
            placeholder="Mật khẩu cũ"
            className="input-field w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-all duration-300"
          />
          {showOldPassword ? (
            <IoMdEyeOff
              ref={(el) => (eyeIconRefs.current[0] = el)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 cursor-pointer text-xl"
              onClick={() => togglePasswordVisibility('old', 0)}
            />
          ) : (
            <IoMdEye
              ref={(el) => (eyeIconRefs.current[0] = el)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 cursor-pointer text-xl"
              onClick={() => togglePasswordVisibility('old', 0)}
            />
          )}
        </div>
        <div className="relative mb-4">
          <input
            type={showNewPassword ? 'text' : 'password'}
            placeholder="Mật khẩu mới"
            className="input-field w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-all duration-300"
          />
          {showNewPassword ? (
            <IoMdEyeOff
              ref={(el) => (eyeIconRefs.current[1] = el)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 cursor-pointer text-xl"
              onClick={() => togglePasswordVisibility('new', 1)}
            />
          ) : (
            <IoMdEye
              ref={(el) => (eyeIconRefs.current[1] = el)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 cursor-pointer text-xl"
              onClick={() => togglePasswordVisibility('new', 1)}
            />
          )}
        </div>
        <div className="relative mb-6">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Xác nhận mật khẩu"
            className="input-field w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-all duration-300"
          />
          {showConfirmPassword ? (
            <IoMdEyeOff
              ref={(el) => (eyeIconRefs.current[2] = el)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 cursor-pointer text-xl"
              onClick={() => togglePasswordVisibility('confirm', 2)}
            />
          ) : (
            <IoMdEye
              ref={(el) => (eyeIconRefs.current[2] = el)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 cursor-pointer text-xl"
              onClick={() => togglePasswordVisibility('confirm', 2)}
            />
          )}
        </div>
        <button
          ref={buttonRef}
          className="submit-button w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold shadow-md cursor-pointer"
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonHover}
          onClick={handleButtonClick}
        >
          Đặt lại
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;