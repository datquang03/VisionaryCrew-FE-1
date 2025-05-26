/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { IoIosSearch, IoIosMenu, IoIosClose } from "react-icons/io";
import { FiTag, FiShoppingCart, FiUser } from "react-icons/fi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import logo from "../../../assets/VisionaryCrew.png";
import { FaMoneyBill } from "react-icons/fa";
import userImage from "../../../assets/defaultAvatar.png";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/APIs/slices/authSlice";
import { showToast } from "../../../utils/Toast";
import { IoLogOut, IoSettings } from "react-icons/io5";

const MobileNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  const memoizedUserInfo = useMemo(() => userInfo, [userInfo]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Determine user role
  const isAdminOrDoctor =
    memoizedUserInfo?.role === "admin" || memoizedUserInfo?.role === "doctor";

  // Set dashboard path based on role
  const dashboardPath =
    memoizedUserInfo?.role === "admin" ? "/dashboard/admin" : "/dashboard";

  // Get settings path based on role
  const getSettingsPath = () => {
    if (!memoizedUserInfo) return "/settings";
    switch (memoizedUserInfo?.role) {
      case "doctor":
        return "/settings/doctor";
      case "admin":
        return "/settings/admin";
      default:
        return "/settings";
    }
  };

  // Define sidebar menu items
  const menuItems = useMemo(
    () => [
      ...(isAdminOrDoctor ? [{ label: "Dashboard", path: dashboardPath }] : []),
      { label: "Offers", path: "/" },
      { label: "Gói", path: "/cart" },
      { label: "Trang cá nhân", path: "/profile" },
      { label: "Cài đặt", path: getSettingsPath() },
      { label: "Số dư", path: "/balance" },
      { label: "Đăng xuất", path: "/logout" },
    ],
    [isAdminOrDoctor, dashboardPath, memoizedUserInfo]
  );

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    showToast("Đăng xuất thành công", "success");
    navigate("/login");
    setIsSidebarOpen(false);
  };

  // Handle navigation and sidebar toggle
  const handleMenuItemClick = (path) => {
    if (path === "/logout") {
      handleLogout();
    } else {
      navigate(path);
      setIsSidebarOpen(false);
    }
  };

  // Sidebar animation variants
  const sidebarVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <div className="w-full h-16 flex items-center justify-center md:hidden">
      <div className="w-full h-12 bg-gray-200 rounded-lg flex justify-between items-center px-4">
        {/* Logo */}
        <img
          src={logo}
          className="h-8 object-contain cursor-pointer"
          alt="logo"
          onClick={() => navigate("/")}
        />

        {/* Menu Icon */}
        <div
          className="text-indigo-900 cursor-pointer"
          onClick={() => setIsSidebarOpen(true)}
        >
          <IoIosMenu className="text-2xl" />
        </div>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-50"
              onClick={() => setIsSidebarOpen(false)}
            ></motion.div>

            {/* Sidebar Content */}
            <motion.div
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 w-1/2 max-w-xs h-full bg-gradient-to-br from-white to-indigo-50 z-50 shadow-lg flex flex-col"
            >
              {/* Sidebar Header */}
              <div className="flex justify-between items-center p-4 border-b border-indigo-200">
                {memoizedUserInfo ? (
                  <div className="flex items-center space-x-2">
                    <img
                      src={memoizedUserInfo?.image || userImage}
                      alt={memoizedUserInfo?.username}
                      className="size-10 rounded-full object-cover border-2 border-indigo-300"
                    />
                    <span className="text-sm font-semibold text-gray-800">
                      {memoizedUserInfo?.username}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm font-semibold text-gray-800">
                    Guest
                  </span>
                )}
                <IoIosClose
                  className="text-2xl text-indigo-900 cursor-pointer"
                  onClick={() => setIsSidebarOpen(false)}
                />
              </div>

              {/* Sidebar Menu Items */}
              <div className="flex flex-col p-4 space-y-2">
                {memoizedUserInfo ? (
                  menuItems.map((item) => (
                    <motion.div
                      key={item.label}
                      onClick={() => handleMenuItemClick(item.path)}
                      className="px-4 py-2 text-gray-800 hover:bg-indigo-100 cursor-pointer rounded-lg flex items-center space-x-2 transition-colors duration-200"
                      whileHover={{ scale: 1.02, backgroundColor: "#e0e7ff" }}
                    >
                      {item.label === "Dashboard" && (
                        <MdOutlineSpaceDashboard className="text-lg" />
                      )}
                      {item.label === "Orders" && (
                        <IoCart className="text-lg" />
                      )}
                      {item.label === "Offers" && <FiTag className="text-lg" />}
                      {item.label === "Gói" && (
                        <FiShoppingCart className="text-lg" />
                      )}
                      {item.label === "Trang cá nhân" && (
                        <ImProfile className="text-lg" />
                      )}
                      {item.label === "Cài đặt" && (
                        <IoSettings className="text-lg" />
                      )}
                      {item.label === "Đăng xuất" && (
                        <IoLogOut className="text-lg" />
                      )}
                      {item.label === "Số dư" ? (
                        <>
                          <FaMoneyBill className="text-lg" />
                          <span className="text-sm font-semibold">
                            Số dư:{" "}
                            {(memoizedUserInfo?.balance || 0).toLocaleString(
                              "vi-VN"
                            )}{" "}
                            VNĐ
                          </span>
                        </>
                      ) : (
                        <span className="text-sm font-semibold">
                          {item.label}
                        </span>
                      )}
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    onClick={() => handleMenuItemClick("/login")}
                    className="px-4 py-2 text-gray-800 hover:bg-indigo-100 cursor-pointer rounded-lg flex items-center space-x-2 transition-colors duration-200"
                    whileHover={{ scale: 1.02, backgroundColor: "#e0e7ff" }}
                  >
                    <FiUser className="text-lg" />
                    <span className="text-sm font-semibold">Login</span>
                  </motion.div>
                )}
              </div>

              {/* Search Bar */}
              <div className="p-4 border-t border-indigo-200 mt-auto">
                <div className="flex items-center bg-white rounded-full shadow-md h-10 overflow-hidden">
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNavbar;
