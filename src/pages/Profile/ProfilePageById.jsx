/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import userImage from "../../assets/defaultAvatar.png";
import { getUserByID, setNull } from "../../redux/APIs/slices/userSlice"; 
import { ColourfulText } from "../../components/3D_Threejs/ColorfulText";
import { sendRequest, getUserRequests, clearState } from "../../redux/APIs/slices/doctorRequestSlice";
import { toast } from "react-toastify"; // Thêm nếu dùng toast

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const detailVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" } }),
};

const avatarVariants = {
  hidden: { scale: 0, rotate: 0 },
  visible: { scale: 1, rotate: 360, transition: { duration: 0.8, ease: "easeOut" } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
};

const ProfilePageById = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.userSlice);
  const { requests, loading, error, success } = useSelector((state) => state.doctorRequest);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    console.log("User ID from params:", id);
    if (id) {
      dispatch(getUserByID(id));
    }
    return () => {
      dispatch(setNull());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (user && user._id) {
      dispatch(getUserRequests());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (error) toast.error(error);
    if (success) toast.success(success);
    return () => dispatch(clearState());
  }, [error, success, dispatch]);

  const formattedDateOfBirth = user?.dateOfBirth ? moment(user.dateOfBirth).format("DD-MM-YYYY") : "N/A";

  const handleSendRequest = () => {
    if (!messageInput.trim()) {
      toast.error("Tin nhắn không được để trống.");
      return;
    }
    dispatch(sendRequest({ doctor: id, message: messageInput }))
      .then(() => {
        setIsModalOpen(false);
        setMessageInput("");
      });
  };

  return (
    <div className="min-h-screen max-h-screen custom-scrollbar bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-900 p-6 flex items-center justify-center">
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
            {message || "Lỗi khi tải thông tin người dùng."}
          </motion.div>
        ) : isSuccess && user ? (
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-indigo-300/30 max-h-[calc(100vh-3rem)] overflow-y-auto"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <motion.div
                variants={avatarVariants}
                initial="hidden"
                animate="visible"
                className="relative"
              >
                <img
                  src={user.avatar || userImage}
                  alt={user.username}
                  className="w-32 h-32 rounded-full object-cover border-4 border-indigo-400 shadow-lg"
                  onError={(e) => {
                    console.error("Image load error for:", user.username);
                    e.target.src = userImage;
                  }}
                />
                <motion.div
                  className="absolute p-2 bottom-0 right-0 w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center border-2 border-white"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-white font-bold text-xs">
                    {user.role === "doctor"
                      ? "Bác sĩ"
                      : user.role === "admin"
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
                  <ColourfulText text={user.username} />
                </motion.h2>
                <motion.p
                  variants={detailVariants}
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  className="text-indigo-200 mt-1"
                >
                  {user.email}
                </motion.p>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              <motion.div
                variants={detailVariants}
                custom={3}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-3"
              >
                <span className="text-indigo-300 font-semibold">Ngày sinh:</span>
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
                <span className="text-indigo-300 font-semibold">Số điện thoại:</span>
                <span className="bg-indigo-500/20 text-indigo-100 px-3 py-1 rounded-full text-sm">
                  {user.phone || "N/A"}
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
                  {user.role === "doctor"
                    ? "Bác sĩ"
                    : user.role === "admin"
                      ? "Admin"
                      : "Người dùng"}
                </span>
              </motion.div>
              <motion.div
                variants={detailVariants}
                custom={6}
                initial="hidden"
                animate="visible"
                className="flex flex-col"
              >
                <span className="text-indigo-300 font-semibold mb-1">Mô tả:</span>
                <div className="bg-indigo-500/10 text-indigo-100 p-3 rounded-lg text-sm leading-relaxed border border-indigo-400/20">
                  {user.description || "Chưa có mô tả cá nhân."}
                </div>
              </motion.div>
            </div>

            {user.role === "user" && requests.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-white mb-4">Yêu cầu của bạn</h3>
                {requests.map((request, index) => (
                  <motion.div
                    key={request._id}
                    variants={detailVariants}
                    custom={7 + index}
                    initial="hidden"
                    animate="visible"
                    className="mb-4 p-4 bg-indigo-500/20 text-indigo-100 rounded-lg border border-indigo-400/20"
                  >
                    <p><strong>Bác sĩ:</strong> {request.doctorId.username}</p>
                    <p><strong>Trạng thái:</strong> {request.status}</p>
                    <p><strong>Tin nhắn:</strong> {request.message}</p>
                    {request.status === "rejected" && request.rejectionMessage && (
                      <p><strong>Lý do từ chối:</strong> {request.rejectionMessage}</p>
                    )}
                    <p><strong>Ngày gửi:</strong> {moment(request.createdAt).format("DD-MM-YYYY HH:mm")}</p>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row sm:gap-4">
              <motion.button
                variants={detailVariants}
                custom={7 + (requests.length || 0)}
                initial="hidden"
                animate="visible"
                onClick={() => navigate("/")}
                className="w-full sm:w-auto bg-indigo-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 cursor-pointer"
              >
                Quay lại trang chủ
              </motion.button>
              {user.role === "doctor" && (
                <motion.button
                  variants={detailVariants}
                  custom={8 + (requests.length || 0)}
                  initial="hidden"
                  animate="visible"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto bg-yellow-500 text-white font-medium px-6 py-2 rounded-lg hover:bg-yellow-600 transition duration-300 cursor-pointer mt-4 sm:mt-0"
                >
                  Liên hệ với bác sĩ
                </motion.button>
              )}
            </div>

            {/* Modal */}
            <AnimatePresence>
              {isModalOpen && (
                <motion.div
                  variants={modalVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                  onClick={() => setIsModalOpen(false)}
                >
                  <motion.div
                    className="bg-white/10 backdrop-blur-lg p-6 rounded-lg border border-indigo-300/30 w-full max-w-md"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">Gửi yêu cầu</h3>
                    <textarea
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Nhập tin nhắn cho bác sĩ..."
                      className="w-full p-3 mb-4 rounded-lg bg-white/10 text-white border border-indigo-300/30 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      rows="4"
                    />
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                      >
                        Hủy
                      </button>
                      <button
                        onClick={handleSendRequest}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                        disabled={loading}
                      >
                        {loading ? "Đang gửi..." : "Gửi"}
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-white text-xl"
          >
            Không tìm thấy thông tin người dùng.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePageById;