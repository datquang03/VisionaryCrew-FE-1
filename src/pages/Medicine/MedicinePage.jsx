/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { askChatAI } from "../../redux/APIs/slices/chatAISlice";
import { fetchMedicines } from "../../redux/APIs/slices/medicineSlice";
import Navbar from "../../components/layout/Navbar/Navbar"; // Đảm bảo đường dẫn đúng
import MobileNavbar from "../../components/layout/Navbar/MobileNavbar"; // Đảm bảo đường dẫn đúng
import ShortLoading from "../../components/Loading/ShortLoading";

// Animation variants (sao chép từ Homepage)
const sectionVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const MedicinePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { medicines, loading, error } = useSelector((state) => state.medicine);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [chatQuestion, setChatQuestion] = useState("");
  const {
    answer,
    isLoading: chatLoading,
    isError: chatError,
    message: chatMessage,
  } = useSelector((state) => state.chatAI);
  const [isStickyNavbar, setIsStickyNavbar] = useState(false);
  const [visibleRows, setVisibleRows] = useState(2); // Số hàng hiển thị ban đầu

  // Fetch medicines from API
  useEffect(() => {
    dispatch(fetchMedicines());
  }, [dispatch]);

  // Sync filteredMedicines with medicines from state
  useEffect(() => {
    setFilteredMedicines(
      medicines.length > 0
        ? medicines.filter((medicine) =>
            medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : []
    );
  }, [searchTerm, medicines]);

  // Handle sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsStickyNavbar(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatQuestion.trim()) {
      dispatch(askChatAI(chatQuestion));
    }
  };

  // Function to load more rows
  const handleLoadMore = () => {
    setVisibleRows((prevRows) => prevRows + 1); // Tăng thêm 1 hàng
  };

  // Calculate items to display based on visible rows and grid columns
  const itemsPerRow = { "1": 1, sm: 2, lg: 3 }; // Số cột theo breakpoint
  const totalVisibleItems = visibleRows * Math.max(...Object.values(itemsPerRow));

  return (
    <div className="relative p-4 min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-900">
      {/* Navbar Section */}
      <motion.div
        initial="hidden"
        animate="visible" // Luôn hiển thị navbar khi tải trang
        variants={sectionVariants}
        className="relative z-50"
      >
        <div
          className={`transition-all duration-300 ease-in-out ${
            isStickyNavbar
              ? "fixed top-0 left-0 w-full z-50 bg-white shadow-md"
              : "relative z-50"
          }`}
        >
          <div className="hidden md:block">
            <Navbar />
          </div>
          <div className="md:hidden">
            <MobileNavbar />
          </div>
        </div>
      </motion.div>

      <div className="mt-10"> {/* Thêm khoảng cách để tránh bị navbar che */}
        {/* Ô chat với ChatGPT - Đặt lên trên */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="relative z-10 mb-8 p-4 bg-white/10 rounded-lg border border-indigo-300/30"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Hỏi thông tin thuốc</h2>
          <form onSubmit={handleChatSubmit} className="flex flex-col gap-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập câu hỏi (VD: Tác dụng của Paracetamol?)"
                value={chatQuestion}
                onChange={(e) => setChatQuestion(e.target.value)}
                className="flex-1 p-2 rounded-lg bg-white/10 border border-indigo-300/30 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                Gửi
              </button>
            </div>
            {chatLoading && (
              <div className="mt-2 text-yellow-200">
                <div className="w-full flex items-center justify-center">
                  <ShortLoading text="Đang tìm câu trả lời" />
                </div>
              </div>
            )}
            {answer && !chatLoading && (
              <div className="mt-2 text-indigo-200 p-2 bg-indigo-500/20 rounded-lg">
                {answer}
              </div>
            )}
            {chatError && !chatLoading && (
              <div className="mt-2 text-red-300 p-2 bg-red-500/20 rounded-lg">
                {chatMessage}
              </div>
            )}
          </form>
        </motion.div>

        {/* Thanh tìm kiếm */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="relative z-10 mb-8 flex justify-center"
        >
          <input
            type="text"
            placeholder="Tìm kiếm thuốc..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md p-3 rounded-lg bg-white/10 border border-indigo-300/30 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </motion.div>

        {/* Danh sách thuốc */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="relative z-10"
        >
          {loading ? (
            <div className="text-white text-center mt-10">
              <ShortLoading text="Đang tải danh sách thuốc..." />
            </div>
          ) : error ? (
            <div className="text-red-300 text-center mt-10">{error}</div>
          ) : filteredMedicines.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                {filteredMedicines.slice(0, totalVisibleItems).map((medicine) => (
                  <div
                    key={medicine._id}
                    className="medicine-card bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-indigo-300/30 hover:shadow-indigo-500/50 transition-shadow duration-300"
                  >
                    <img
                      src={medicine.image || "/default-medicine.png"}
                      alt={medicine.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                      onError={(e) => (e.target.src = "/default-medicine.png")}
                    />
                    <h2 className="text-2xl font-semibold text-white mb-2">
                      {medicine.name}
                    </h2>
                    <p className="text-indigo-200 text-sm mb-4 line-clamp-3">
                      {medicine.description || "Chưa có mô tả."}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="bg-indigo-500/20 text-indigo-100 px-3 py-1 rounded-full text-sm">
                        {medicine.price || 0} VNĐ
                      </span>
                      <button
                        onClick={() => navigate(`/medicine/${medicine._id}`)}
                        className="bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 cursor-pointer"
                      >
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {totalVisibleItems < filteredMedicines.length && (
                <div className="mt-6 text-center">
                  <button
                    onClick={handleLoadMore}
                    className="bg-indigo-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 cupo"
                  >
                    Xem thêm
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-white text-xl text-center">
              Không tìm thấy thuốc nào.
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MedicinePage;