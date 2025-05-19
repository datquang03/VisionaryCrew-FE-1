/* eslint-disable no-unused-vars */
import { IoIosSearch } from "react-icons/io";
import { FiTag, FiShoppingCart, FiUser } from "react-icons/fi";
import logo from "../../../assets/VisionaryCrew.png";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import userImage from "../../../assets/defaultAvatar.png";
import { logout } from "../../../redux/APIs/slices/authSlice";
import { showToast } from "../../../utils/Toast";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  const memoizedUserInfo = useMemo(() => userInfo, [userInfo]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Determine user role
  const isAdminOrDoctor =
    memoizedUserInfo?.role === "admin" || memoizedUserInfo?.role === "doctor";

  // Set dashboard path based on role
  const dashboardPath =
    memoizedUserInfo?.role === "admin" ? "/dashboard/admin" : "/dashboard";

  // Define dropdown menu items (excluding balance)
  const menuItems = useMemo(
    () => [
      ...(isAdminOrDoctor ? [{ label: "Dashboard", path: dashboardPath }] : []),
      { label: "Gói", path: "/cart" },
      { label: "Trang cá nhân", path: "/profile" },
      { label: "Cài đặt", path: "/settings" },
      { label: "Đăng xuất", path: "/logout" },
    ],
    [isAdminOrDoctor, dashboardPath]
  );

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    showToast("Đăng xuất thành công", "success");
    navigate("/login");
    setIsDropdownOpen(false);
  };

  // Handle navigation and dropdown toggle
  const handleAvatarClick = (path = null) => {
    if (path) {
      if (path === "/logout") {
        handleLogout();
      } else {
        navigate(path);
      }
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-full h-20 flex items-center justify-center">
      <div className="w-full h-14 bg-gray-200 rounded-lg flex justify-between items-center px-6">
        {/* Left side: Logo + Search */}
        <div className="flex items-center">
          <img
            src={logo}
            className="h-10 object-contain cursor-pointer"
            alt="logo"
            onClick={() => navigate("/")}
          />
          <div className="ml-4 border-l-2 border-gray-400 h-8"></div>
          <div className="ml-20">
            <div className="flex items-center bg-white rounded-full shadow-md w-80 h-10 overflow-hidden">
              <div className="w-10 h-10 bg-yellow-400 flex items-center justify-center rounded-full">
                <IoIosSearch className="text-xl text-black" />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm dịch vụ của bạn"
                className="pl-2 pr-4 py-2 text-gray-700 outline-none flex-1 bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* Right side: Offers, Cart, Login/Dropdown */}
        <div className="flex space-x-6 items-center relative">
          <div
            className="flex items-center space-x-1 text-indigo-900 cursor-pointer hover:text-indigo-700"
            onClick={() => navigate("/")}
          >
            <FiTag className="text-xl" />
            <span className="font-medium">Offers</span>
          </div>
          <div
            className="flex items-center space-x-1 text-indigo-900 cursor-pointer hover:text-indigo-700"
            onClick={() => navigate("/balance")}
          >
            <FiShoppingCart className="text-xl" />
            <span className="font-medium">Cart</span>
          </div>
          <div className="relative">
            <div
              onClick={() => handleAvatarClick()}
              className="flex items-center space-x-1 text-indigo-900 cursor-pointer"
            >
              {memoizedUserInfo ? (
                <img
                  src={memoizedUserInfo?.image || userImage}
                  alt={memoizedUserInfo?.username}
                  className="size-10 rounded-full object-cover border-2 border-indigo-300 hover:border-indigo-500 transition-colors duration-200"
                />
              ) : (
                <div
                  className="flex items-center space-x-1"
                  onClick={() => navigate("/login")}
                >
                  <FiUser className="text-xl" />
                  <span className="font-medium">Login</span>
                </div>
              )}
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {memoizedUserInfo && isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 mt-2 w-48 bg-gradient-to-br from-white to-indigo-50 rounded-xl shadow-lg border border-indigo-200 py-2"
                >
                  {/* Balance Item */}
                  <motion.div
                    onClick={() => handleAvatarClick("/balance")}
                    className="px-4 py-2 text-gray-800 hover:bg-indigo-100 cursor-pointer flex items-center border-b border-indigo-200 transition-colors duration-200 rounded-lg"
                    whileHover={{ scale: 1.02, backgroundColor: "#e0e7ff" }}
                  >
                    <span className="text-sm font-semibold">
                      Số dư: {(memoizedUserInfo?.balance || 0).toLocaleString("vi-VN")} VNĐ
                    </span>
                  </motion.div>

                  {/* Other Menu Items */}
                  {menuItems.map((item) => (
                    <motion.div
                      key={item.label}
                      onClick={() => handleAvatarClick(item.path)}
                      className="px-4 py-2 text-gray-800 hover:bg-indigo-100 cursor-pointer flex items-center transition-colors duration-200 rounded-lg"
                      whileHover={{ scale: 1.02, backgroundColor: "#e0e7ff" }}
                    >
                      <span className="text-sm font-semibold">
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;