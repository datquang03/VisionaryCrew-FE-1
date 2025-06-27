/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import userImage from "../../assets/defaultAvatar.png";
import { ColourfulText } from "../../components/3D_Threejs/ColorfulText";
import {
  getSavedMedicalRecords,
  updateMedicalRecord,
  deleteMedicalRecord,
  resetStatus,
} from "../../redux/APIs/slices/medicalRecordSlice";
import { AiOutlineEye, AiOutlineDelete, AiOutlineSave, AiOutlineClose } from "react-icons/ai";
import ShortLoading from "../../components/Loading/ShortLoading";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, savedRecords, message } = useSelector(
    (state) => state.medicalRecord
  );
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

  const [activeTab, setActiveTab] = useState("medicalRecords");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (userInfo?._id) {
      dispatch(getSavedMedicalRecords(userInfo._id));
    }
    return () => {
      dispatch(resetStatus());
    };
  }, [dispatch, userInfo?._id]);

  const handleView = (record) => {
    setSelectedRecord(record);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (selectedRecord) {
      const updatedData = {
        patientInfo: selectedRecord.patientInfo,
        familyInfo: selectedRecord.familyInfo,
        sickness: selectedRecord.sickness,
        treatment: selectedRecord.treatment,
      };
      dispatch(updateMedicalRecord({ id: selectedRecord._id, data: updatedData }))
        .then(() => {
          setSelectedRecord(null);
          dispatch(getSavedMedicalRecords(userInfo._id));
        });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa hồ sơ này?")) {
      dispatch(deleteMedicalRecord(id))
        .then(() => dispatch(getSavedMedicalRecords(userInfo._id)));
    }
  };

  const handleChange = (section, field, value) => {
    setSelectedRecord((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const outcomeOptions = [
    "Lý do vào viện",
    "Đã điều trị",
    "Tóm tắt quá trình điều trị",
  ];

  const fieldPlaceholders = {
    fullName: "Họ và tên",
    gender: "Giới tính",
    dob: "Ngày sinh",
    age: "Tuổi",
    job: "Nghề nghiệp",
    address: "Địa chỉ",
    idNumber: "Số CCCD/CMND",
    phone: "Số điện thoại",
    memberName: "Tên người thân",
    memberPhone: "SĐT người thân",
    reason: "Lý do khám",
    mainDiagnosis: "Chẩn đoán chính",
    doctorInCharge: "Bác sĩ phụ trách hoặc chưa có",
    treatmentDetails: "Chi tiết điều trị hoặc chưa có",
    outcome: "Kết quả",
    notes: "Ghi chú",
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
            <ShortLoading  text={"Tải thông tin người dùng..."}/>
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
        ) : userInfo ? (
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-indigo-300/30 max-h-[calc(100vh-3rem)] overflow-y-auto"
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
                  className="absolute p-2 bottom-0 right-0 w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center border-2 border-white"
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
                  <ColourfulText text={userInfo.username} />
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
                  {userInfo.role === "doctor"
                    ? "Bác sĩ"
                    : userInfo.role === "admin"
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
                <span className="text-indigo-300 font-semibold mb-1">
                  Mô tả:
                </span>
                <div className="bg-indigo-500/10 text-indigo-100 p-3 rounded-lg text-sm leading-relaxed border border-indigo-400/20">
                  {userInfo.description || "Chưa có mô tả cá nhân."}
                </div>
              </motion.div>

              {/* Tabs */}
              <div className="mt-6">
                <div className="flex space-x-4 border-b border-indigo-400/30">
                  <button
                    onClick={() => handleTabChange("savedBlogs")}
                    className={`pb-2 px-4 text-sm font-medium ${
                      activeTab === "savedBlogs"
                        ? "text-indigo-300 border-b-2 border-indigo-300"
                        : "text-indigo-500 hover:text-indigo-300"
                    }`}
                  >
                    Đã lưu Blog
                  </button>
                  <button
                    onClick={() => handleTabChange("medicalRecords")}
                    className={`pb-2 px-4 text-sm font-medium ${
                      activeTab === "medicalRecords"
                        ? "text-indigo-300 border-b-2 border-indigo-300"
                        : "text-indigo-500 hover:text-indigo-300"
                    }`}
                  >
                    Hồ sơ y tế
                  </button>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  {activeTab === "savedBlogs" && (
                    <div className="bg-indigo-500/10 p-4 rounded-lg text-indigo-100">
                      {userInfo.savedBlogs && userInfo.savedBlogs.length > 0 ? (
                        <ul>
                          {userInfo.savedBlogs.map((blog, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="py-2 border-b border-indigo-400/20"
                            >
                              {blog.title || `Blog #${index + 1}`}
                            </motion.li>
                          ))}
                        </ul>
                      ) : (
                        <p>Chưa có blog nào được lưu.</p>
                      )}
                    </div>
                  )}
                  {activeTab === "medicalRecords" && (
                    <div className="bg-indigo-500/10 p-4 rounded-lg text-indigo-100">
                      {isLoading ? (
                        <p>Đang tải hồ sơ y tế...</p>
                      ) : savedRecords && savedRecords.length > 0 ? (
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-indigo-500/20">
                              <th className="p-2 border-b border-indigo-400/20 text-indigo-200">
                                Tên bệnh nhân
                              </th>
                              <th className="p-2 border-b border-indigo-400/20 text-indigo-200">
                                Ngày tạo
                              </th>
                              <th className="p-2 border-b border-indigo-400/20 text-indigo-200">
                                Lý do khám
                              </th>
                              <th className="p-2 border-b border-indigo-400/20 text-indigo-200">
                                Chẩn đoán chính
                              </th>
                              <th className="p-2 border-b border-indigo-400/20 text-indigo-200">
                                Hành động
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {savedRecords.map((record, index) => (
                              <motion.tr
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="hover:bg-indigo-500/10"
                              >
                                <td className="p-2 border-b border-indigo-400/20">
                                  {record.patientInfo.fullName}
                                </td>
                                <td className="p-2 border-b border-indigo-400/20">
                                  {moment(record.createdAt).format("DD-MM-YYYY")}
                                </td>
                                <td className="p-2 border-b border-indigo-400/20">
                                  {record.sickness.reason}
                                </td>
                                <td className="p-2 border-b border-indigo-400/20">
                                  {record.sickness.mainDiagnosis}
                                </td>
                                <td className="p-2 border-b border-indigo-400/20 flex space-x-2">
                                  <motion.button
                                    whileHover={{ scale: 1.2, rotate: 360, color: "#60a5fa" }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleView(record)}
                                    className="bg-blue-600 text-white p-2 rounded-full"
                                  >
                                    <AiOutlineEye size={18} />
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.2, rotate: -360, color: "#ef4444" }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleDelete(record._id)}
                                    className="bg-red-600 text-white p-2 rounded-full"
                                  >
                                    <AiOutlineDelete size={18} />
                                  </motion.button>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p>Chưa có hồ sơ y tế nào được lưu.</p>
                      )}
                    </div>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Modal for viewing/editing record */}
            {selectedRecord && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              >
                <motion.div
                  initial={{ y: 50, scale: 0.95 }}
                  animate={{ y: 0, scale: 1 }}
                  exit={{ y: 50, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 120, damping: 15 }}
                  className="bg-gradient-to-tr from-white via-gray-100 to-gray-300 p-6 rounded-2xl shadow-2xl border border-indigo-300/30 w-full max-w-4xl mx-4 md:mx-auto max-h-[90vh] overflow-y-auto"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-bold text-gray-800">Chỉnh sửa Hồ Sơ Y Tế</h2>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedRecord(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <AiOutlineClose size={24} />
                    </motion.button>
                  </div>
                  <div className="h-[calc(100%-4rem)] overflow-y-auto custom-scrollbar-hidden">
                    <form onSubmit={handleUpdate} className="space-y-6">
                      {Object.entries(selectedRecord).map(([sectionKey, section]) => (
                        <div key={sectionKey} className="bg-white p-4 rounded-lg shadow-md">
                          <h3 className="text-xl font-semibold text-gray-700 mb-3 capitalize">
                            {sectionKey === "patientInfo"
                              ? "Thông tin bệnh nhân"
                              : sectionKey === "familyInfo"
                              ? "Thông tin người thân"
                              : sectionKey === "sickness"
                              ? "Thông tin bệnh lý"
                              : "Thông tin điều trị"}
                          </h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            {Object.entries(section).map(([field, value]) => {
                              if (field === "gender") {
                                return (
                                  <motion.select
                                    key={field}
                                    value={value || ""}
                                    onChange={(e) => handleChange(sectionKey, field, e.target.value)}
                                    whileFocus={{ scale: 1.05, borderColor: "#4f46e5" }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                  >
                                    <option value="">Chọn giới tính</option>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                  </motion.select>
                                );
                              } else if (field === "outcome") {
                                return (
                                  <motion.select
                                    key={field}
                                    value={value || ""}
                                    onChange={(e) => handleChange(sectionKey, field, e.target.value)}
                                    whileFocus={{ scale: 1.05, borderColor: "#4f46e5" }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                  >
                                    <option value="">Chọn kết quả</option>
                                    {outcomeOptions.map((option) => (
                                      <option key={option} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </motion.select>
                                );
                              } else {
                                return (
                                  <motion.input
                                    key={field}
                                    type={field === "dob" ? "date" : "text"}
                                    value={value || ""}
                                    onChange={(e) => handleChange(sectionKey, field, e.target.value)}
                                    whileFocus={{ scale: 1.05, borderColor: "#4f46e5" }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder={fieldPlaceholders[field] || field}
                                  />
                                );
                              }
                            })}
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-end gap-4">
                        <motion.button
                          whileHover={{ scale: 1.1, backgroundColor: "#4338ca" }}
                          whileTap={{ scale: 0.95 }}
                          type="submit"
                          className="bg-indigo-600 text-white p-3 rounded-full shadow-md flex items-center justify-center"
                        >
                          <AiOutlineSave size={24} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1, backgroundColor: "#6b7280" }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => setSelectedRecord(null)}
                          className="bg-gray-500 text-white p-3 rounded-full shadow-md flex items-center justify-center"
                        >
                          <AiOutlineClose size={24} />
                        </motion.button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:gap-4">
              <motion.button
                variants={detailVariants}
                custom={7}
                initial="hidden"
                animate="visible"
                onClick={() => navigate("/")}
                className="w-full sm:w-auto bg-indigo-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 cursor-pointer"
              >
                Quay lại trang chủ
              </motion.button>

              <motion.button
                variants={detailVariants}
                custom={8}
                initial="hidden"
                animate="visible"
                onClick={() => navigate("/update-profile")}
                className="w-full sm:w-auto bg-yellow-500 text-white font-medium px-6 py-2 rounded-lg hover:bg-yellow-600 transition duration-300 cursor-pointer"
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