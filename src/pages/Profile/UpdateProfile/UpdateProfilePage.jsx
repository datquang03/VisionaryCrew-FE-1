/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import userImage from "../../../assets/defaultAvatar.png";

const UpdateProfilePage = () => {
  const navigate = useNavigate();
  const { isLoading, isError } = useSelector((state) => state.userLogin);
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const [formData, setFormData] = useState({
    username: userInfo?.username || "",
    email: userInfo?.email || "",
    phone: userInfo?.phone || "",
    dateOfBirth: userInfo?.dateOfBirth
      ? moment(userInfo.dateOfBirth).format("YYYY-MM-DD")
      : "",
    description: userInfo?.description || "",
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const detailVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
    }),
  };

  const avatarVariants = {
    hidden: { scale: 0, rotate: 0 },
    visible: {
      scale: 1,
      rotate: 360,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to dispatch update action (e.g., updateProfileAction) with formData
    console.log("Form submitted:", formData);
    // Example: dispatch(updateProfileAction(formData));
    // On success, navigate back to profile page
    navigate("/profile");
  };

  return (
    <div className="min-h-screen max-h-screen custom-scrollbar bg-gradient-to-br from-gray-900 via-teal-900 to-cyan-900 p-6 flex items-center justify-center">
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-white text-xl"
          >
            Đang tải thông tin...
          </motion.div>
        ) : isError ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-red-400 text-xl"
          >
            Lỗi khi tải thông tin người dùng.
          </motion.div>
        ) : userInfo ? (
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-cyan-300/30 max-h-[calc(100vh-3rem)] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <motion.div
                variants={avatarVariants}
                initial="hidden"
                animate="visible"
                className="relative"
              >
                <img
                  src={userInfo.avatar || userImage}
                  alt={userInfo.username}
                  className="w-32 h-32 rounded-full object-cover border-4 border-cyan-400 shadow-lg"
                />
                <motion.div
                  className="absolute p-2 bottom-0 right-0 w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center border-2 border-white"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-white font-bold text-xs">
                    {userInfo.role === "doctor"
                      ? "Bác sĩ"
                      : userInfo.role === "admin"
                        ? "Admin"
                        : "Người dùng"}
                  </span>
                </motion.div>
              </motion.div>

              <div className="flex-1 text-center md:text-left">
                <motion.h2
                  variants={detailVariants}
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  className="text-3xl font-bold text-white"
                >
                  Cập nhật thông tin
                </motion.h2>
                <motion.p
                  variants={detailVariants}
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  className="text-cyan-200 mt-1"
                >
                  Chỉnh sửa thông tin cá nhân của bạn
                </motion.p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <motion.div
                variants={detailVariants}
                custom={2}
                initial="hidden"
                animate="visible"
                className="flex flex-col"
              >
                <label className="text-cyan-300 font-semibold mb-1">
                  Tên tài khoản:
                </label>
                <input
                  disabled
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="bg-cyan-500/1 text-cyan-100 p-3 rounded-lg border border-cyan-400/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="Nhập tên người dùng"
                />
              </motion.div>
              <motion.div
                variants={detailVariants}
                custom={3}
                initial="hidden"
                animate="visible"
                className="flex flex-col"
              >
                <label className="text-cyan-300 font-semibold mb-1">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-cyan-500/10 text-cyan-100 p-3 rounded-lg border border-cyan-400/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="Nhập email"
                />
              </motion.div>
              <motion.div
                variants={detailVariants}
                custom={4}
                initial="hidden"
                animate="visible"
                className="flex flex-col"
              >
                <label className="text-cyan-300 font-semibold mb-1">
                  Số điện thoại:
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-cyan-500/10 text-cyan-100 p-3 rounded-lg border border-cyan-400/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="Nhập số điện thoại"
                />
              </motion.div>
              <motion.div
                variants={detailVariants}
                custom={5}
                initial="hidden"
                animate="visible"
                className="flex flex-col"
              >
                <label className="text-cyan-300 font-semibold mb-1">
                  Ngày sinh:
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="bg-cyan-500/10 text-cyan-100 p-3 rounded-lg border border-cyan-400/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </motion.div>
              <motion.div
                variants={detailVariants}
                custom={6}
                initial="hidden"
                animate="visible"
                className="flex flex-col"
              >
                <label className="text-cyan-300 font-semibold mb-1">
                  Mô tả:
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="bg-cyan-500/immunity text-cyan-100 p-3 rounded-lg border border-cyan-400/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
                  rows="4"
                  placeholder="Nhập mô tả cá nhân"
                />
              </motion.div>

              {/* Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <motion.button
                  variants={detailVariants}
                  custom={7}
                  initial="hidden"
                  animate="visible"
                  type="button"
                  onClick={() => navigate("/profile")}
                  className="w-full sm:w-auto bg-gray-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-gray-700 transition duration-300 cursor-pointer"
                >
                  Hủy
                </motion.button>
                <motion.button
                  variants={detailVariants}
                  custom={8}
                  initial="hidden"
                  animate="visible"
                  type="submit"
                  className="w-full sm:w-auto bg-cyan-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-cyan-700 transition duration-300 cursor-pointer"
                >
                  Lưu thay đổi
                </motion.button>
              </div>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default UpdateProfilePage;
