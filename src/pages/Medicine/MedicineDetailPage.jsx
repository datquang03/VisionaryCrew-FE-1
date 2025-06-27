/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { gsap } from "gsap";
import { fetchMedicineById, clearSelectedMedicine } from "../../redux/APIs/slices/medicineSlice";
import Navbar from "../../components/layout/Navbar/Navbar";
import MobileNavbar from "../../components/layout/Navbar/MobileNavbar";


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

const MedicineDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedMedicine, loading, error } = useSelector((state) => state.medicine);
  const [isStickyNavbar, setIsStickyNavbar] = useState(false);

  // Fetch medicine by ID
  useEffect(() => {
    dispatch(fetchMedicineById(id));
    return () => {
      dispatch(clearSelectedMedicine());
    };
  }, [dispatch, id]);

  // Handle sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsStickyNavbar(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP animation
  useEffect(() => {
    if (!loading && !error && selectedMedicine) {
      gsap.fromTo(
        ".detail-card",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [loading, error, selectedMedicine]);

  if (loading) return <div className="text-white text-center mt-20">Đang tải...</div>;
  if (error) return <div className="text-red-300 text-center mt-20">{error}</div>;
  if (!selectedMedicine) return <div className="text-white text-center mt-20">Không tìm thấy thuốc.</div>;

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
        {/* Detail Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <div className="detail-card bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-indigo-300/30">
            <img
              src={selectedMedicine.image || "/default-medicine.png"}
              alt={selectedMedicine.name}
              className="w-full h-64 object-cover rounded-lg mb-6"
              onError={(e) => (e.target.src = "/default-medicine.png")}
            />
            <h1 className="text-3xl font-bold text-white mb-4">{selectedMedicine.name}</h1>
            <p className="text-indigo-200 mb-4">
              <strong>Mô tả:</strong> {selectedMedicine.description || "Chưa có mô tả."}
            </p>
            <p className="text-indigo-200 mb-4">
              <strong>Liều lượng:</strong> {selectedMedicine.dosage || "Chưa cập nhật."}
            </p>
            <p className="text-indigo-200 mb-4">
              <strong>Tác dụng phụ:</strong> {selectedMedicine.sideEffects || "Không có thông tin."}
            </p>
            <p className="text-indigo-200 mb-4">
              <strong>Nhà sản xuất:</strong> {selectedMedicine.manufacturer || "Chưa rõ."}
            </p>
            <p className="text-indigo-200 mb-4">
              <strong>Giá:</strong> {selectedMedicine.price || 0} VNĐ
            </p>
            <button
              onClick={() => navigate(-1)}
              className="bg-indigo-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 mt-6 cursor-pointer"
            >
              Quay lại
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MedicineDetailPage;