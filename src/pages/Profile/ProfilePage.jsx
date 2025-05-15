/* eslint-disable no-unused-vars */
import { use, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import userImage from "../../assets/defaultAvatar.png";
const ProfilePage = () => {
  const navigate = useNavigate();
  const { isLoading, isError } = useSelector((state) => state.userLogin);
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
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

  const formattedDateOfBirth = userInfo?.dateOfBirth
    ? moment(userInfo.dateOfBirth).format("DD-MM-YYYY")
    : "N/A";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-900 p-6 flex items-center justify-center">
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
            className="max-w-2xl w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-indigo-300/30"
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
                  className="w-32 h-32 rounded-full object-cover border-4 border-indigo-400 shadow-lg"
                />
                <motion.div
                  className="absolute bottom-0 right-0 w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center border-2 border-white"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-white font-bold text-xs">
                    {userInfo.role === "user"
                      ? "Doctor"
                      : userInfo.role === "admin"
                        ? "Admin"
                        : "User"}
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
                  {userInfo.username}
                </motion.h2>
                <motion.p
                  variants={detailVariants}
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  className="text-indigo-200 mt-1"
                >
                  {userInfo.email}
                </motion.p>
              </div>
            </div>

            {/* Details */}
            <div className="mt-6 grid gap-4">
              <motion.div
                variants={detailVariants}
                custom={2}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-3"
              >
                <span className="text-indigo-300 font-semibold">Số dư:</span>
                <span className="bg-indigo-500/20 text-indigo-100 px-3 py-1 rounded-full text-sm">
                  {userInfo.balance} VNĐ
                </span>
              </motion.div>
              <motion.div
                variants={detailVariants}
                custom={3}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-3"
              >
                <span className="text-indigo-300 font-semibold">
                  Ngày sinh:
                </span>
                <span className="bg-indigo-500/20 text-indigo-100 px-3 py-1 rounded-full text-sm">
                  {formattedDateOfBirth}
                </span>
              </motion.div>
              <motion.div
                variants={detailVariants}
                custom={4}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-3"
              >
                <span className="text-indigo-300 font-semibold">
                  Số điện thoại:
                </span>
                <span className="bg-indigo-500/20 text-indigo-100 px-3 py-1 rounded-full text-sm">
                  {userInfo.phone}
                </span>
              </motion.div>
              <motion.div
                variants={detailVariants}
                custom={5}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-3"
              >
                <span className="text-indigo-300 font-semibold">Vai trò:</span>
                <span className="bg-indigo-500/20 text-indigo-100 px-3 py-1 rounded-full text-sm">
                  {userInfo.role}
                </span>
              </motion.div>
              <motion.div
                variants={detailVariants}
                custom={6}
                initial="hidden"
                animate="visible"
                className="flex flex-col"
              >
                <span className="text-indigo-300 font-semibold mb-1">
                  Mô tả:
                </span>
                <div className="bg-indigo-500/10 text-indigo-100 p-3 rounded-lg text-sm leading-relaxed border border-indigo-400/20">
                  {userInfo.description || "Chưa có mô tả cá nhân."}
                </div>
              </motion.div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <motion.button
                variants={detailVariants}
                custom={7}
                initial="hidden"
                animate="visible"
                onClick={() => navigate("/")}
                className="w-full sm:w-auto bg-indigo-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                Quay lại trang chủ
              </motion.button>

              <motion.button
                variants={detailVariants}
                custom={8}
                initial="hidden"
                animate="visible"
                onClick={() => navigate("/update-profile")}
                className="w-full sm:w-auto bg-yellow-500 text-white font-medium px-6 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
              >
                Cập nhật thông tin
              </motion.button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;
