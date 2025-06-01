// src/pages/components/Sidebar.jsx
import React, { useEffect, useRef } from "react";
import { FaComments, FaSearch, FaCog, FaHome } from "react-icons/fa";
import defaultImage from "../../../assets/defaultAvatar.png"; // Adjust path as needed
import { gsap } from "gsap";

const Sidebar = ({ onSelectUser, selectedUser }) => {
  const headerIconsRef = useRef([]);
  const userItemsRef = useRef([]);
  const homeButtonRef = useRef(null);

  // Default user data
  const defaultUsers = [
    {
      _id: "682ac559d587fe5f04959af3",
      username: "Đạt Quang",
      role: "Doctor",
      avatar: defaultImage,
    },
    {
      _id: "6832f0d1925ac4e968aa2413",
      username: "Nhật Anh",
      role: "Patient",
      avatar: defaultImage,
    },
    {
      _id: "6837ff09abfbc09caf3cc06d",
      username: "Jane Roe",
      role: "Patient",
      avatar: defaultImage,
    },
  ];

  // GSAP Animations (Bottom to Top)
  useEffect(() => {
    // Animate Header Icons
    gsap.fromTo(
      headerIconsRef.current,
      { y: 50, opacity: 0 }, // Start from below
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        stagger: 0.2,
        ease: "power3.out",
      }
    );

    // Animate User List Items
    gsap.fromTo(
      userItemsRef.current,
      { y: 50, opacity: 0 }, // Start from below
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
        stagger: 0.2,
        ease: "power3.out",
      }
    );

    // Animate Home Button
    gsap.fromTo(
      homeButtonRef.current,
      { y: 50, opacity: 0 }, // Start from below
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 1,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div className="w-1/4 h-screen flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between bg-gradient-to-r from-gray-800 to-gray-900">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
          <FaComments
            className="text-blue-400"
            ref={(el) => (headerIconsRef.current[0] = el)}
          />
          Conversations
        </h2>
        <div className="flex gap-3">
          <button className="text-gray-400 hover:text-blue-400">
            <FaSearch ref={(el) => (headerIconsRef.current[1] = el)} />
          </button>
          <button className="text-gray-400 hover:text-blue-400">
            <FaCog ref={(el) => (headerIconsRef.current[2] = el)} />
          </button>
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto">
        {defaultUsers.map((user, index) => (
          <div
            key={user._id}
            className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-800 transition-all duration-300 ${
              selectedUser?._id === user._id
                ? "bg-gradient-to-r from-blue-900 to-blue-800"
                : ""
            }`}
            onClick={() => onSelectUser(user)}
            ref={(el) => (userItemsRef.current[index] = el)}
          >
            <img
              src={user.avatar}
              alt={user.username}
              className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
            />
            <div>
              <p className="font-medium text-white">{user.username}</p>
              <p className="text-sm text-gray-400">{user.role}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
        <button
          ref={homeButtonRef}
          className="flex items-center gap-2 w-full p-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          onClick={() => (window.location.href = "/")} // Redirect to home
        >
          <FaHome className="text-xl" />
          <span>Home</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
