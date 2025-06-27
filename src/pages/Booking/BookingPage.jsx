import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/layout/Navbar/Navbar";
import MobileNavbar from "../../components/layout/Navbar/MobileNavbar";
import { useDispatch, useSelector } from "react-redux";
import {
  createMedicalRecord,
  resetMedicalRecordStatus,
  saveMedicalRecord,
} from "../../redux/APIs/slices/medicalRecordSlice";
import { showToast } from "../../utils/Toast";

const sectionVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const initialFormData = {
  patientInfo: {
    fullName: "",
    gender: "",
    dob: "",
    age: "",
    job: "",
    address: "",
    idNumber: "",
    phone: "",
  },
  familyInfo: {
    memberName: "",
    memberPhone: "",
  },
  sickness: {
    reason: "",
    mainDiagnosis: "",
  },
  treatment: {
    doctorInCharge: "",
    treatmentDetails: "",
    outcome: "",
    notes: "",
  },
};

const BookingPage = () => {
  const [isStickyNavbar, setIsStickyNavbar] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormData);

  const { isSuccess, isError, message, currentMedicalRecordId } = useSelector(
    (state) => state.medicalRecord
  );

  const headerText = {
    patientInfo: "Thông tin bệnh nhân",
    familyInfo: "Thông tin người thân",
    sickness: "Thông tin bệnh lý",
    treatment: "Thông tin điều trị",
  };

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

  const outcomeOptions = [
    "Lý do vào viện",
    "Đã điều trị",
    "Tóm tắt quá trình điều trị",
  ];

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { dob, age } = formData.patientInfo;
    if (dob && age) {
      const birthYear = new Date(dob).getFullYear();
      const currentYear = new Date().getFullYear();
      const calculatedAge = currentYear - birthYear;
      if (parseInt(age) !== calculatedAge) {
        showToast(
          `Tuổi không khớp với ngày sinh. Tuổi tính theo ngày sinh là ${calculatedAge}`,
          "error"
        );
        return;
      }
    }
    dispatch(createMedicalRecord(formData));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsStickyNavbar(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isSuccess && message) {
      // Sau khi create thành công, gọi saveMedicalRecord với currentMedicalRecordId
      if (currentMedicalRecordId) {
        dispatch(saveMedicalRecord(currentMedicalRecordId))
          .then(() => {
            showToast("Hồ sơ đã được lưu thành công!", "success");
            setFormData(initialFormData); // Reset form sau khi lưu
            dispatch(resetMedicalRecordStatus());
          })
          .catch((error) => {
            showToast("Lỗi khi lưu hồ sơ: " + error.message, "error");
            dispatch(resetMedicalRecordStatus());
          });
      } else {
        showToast("Không thể tìm thấy ID hồ sơ để lưu.", "error");
        setFormData(initialFormData);
        dispatch(resetMedicalRecordStatus());
      }
    }
    if (isError && message) {
      showToast(message, "error");
      dispatch(resetMedicalRecordStatus());
    }
  }, [isSuccess, isError, message, currentMedicalRecordId, dispatch]);

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <motion.div
        initial="hidden"
        animate="visible"
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

      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="relative z-10 max-w-4xl mx-auto mt-10 h-[calc(100vh-80px)] overflow-y-auto px-2 pb-10"
      >
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-tr from-white via-gray-100 to-gray-300 p-8 rounded-2xl shadow-2xl border border-indigo-300/30"
        >
          <h1 className="text-3xl font-bold text-black mb-6">Tạo Hồ Sơ Y Tế</h1>

          {Object.entries(formData).map(([sectionKey, section]) => (
            <div key={sectionKey} className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 capitalize">
                {headerText[sectionKey] || sectionKey}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(section).map(([field, value]) => {
                  if (field === "gender") {
                    return (
                      <motion.select
                        whileFocus={{ scale: 1.05, borderColor: "#4f46e5" }}
                        transition={{ duration: 0.3 }}
                        key={field}
                        value={value}
                        onChange={(e) =>
                          handleChange(sectionKey, field, e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                      >
                        <option value="">Chọn giới tính</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                      </motion.select>
                    );
                  } else if (field === "outcome") {
                    return (
                      <motion.select
                        whileFocus={{ scale: 1.05, borderColor: "#4f46e5" }}
                        transition={{ duration: 0.3 }}
                        key={field}
                        value={value}
                        onChange={(e) =>
                          handleChange(sectionKey, field, e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
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
                        whileFocus={{ scale: 1.05, borderColor: "#4f46e5" }}
                        transition={{ duration: 0.3 }}
                        key={field}
                        type={field === "dob" ? "date" : "text"}
                        value={value}
                        placeholder={fieldPlaceholders[field] || field}
                        onChange={(e) =>
                          handleChange(sectionKey, field, e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    );
                  }
                })}
              </div>
            </div>
          ))}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="mt-6 w-full bg-indigo-600 text-white py-3 px-6 rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300 cursor-pointer"
          >
            Lưu hồ sơ
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default BookingPage;