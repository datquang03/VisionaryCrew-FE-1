/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import {
  CardContainer,
  CardBody,
  CardItem,
} from "../../components/3D_Threejs/CardContainer";
import ThreeDButton from "../../components/3D_Threejs/3DButton";
import { useNavigate } from "react-router-dom";
import { AuroraBackground } from "../../components/3D_Threejs/AuroraBackground";

const membershipPackages = [
  {
    title: "Cơ Bản",
    price: "0 VNĐ/tháng",
    features: [
      "Truy cập bị giới hạn",
      "Hỗ trợ bị gián đoạn",
      "Quảng cáo",
      "Không tư vấn cá nhân hóa",
    ],
    color: "bg-blue-500",
    default: true,
  },
  {
    title: "Tiêu Chuẩn",
    price: "199,000 VNĐ/tháng",
    features: [
      "Truy cập không giới hạn bài viết",
      "Tư vấn cá nhân hóa",
      "Nhận 10 xu miễn phí mỗi ngày",
      "Hỗ trợ qua email và chat",
      "Không quảng cáo",
      "Ưu tiên nội dung độc quyền",
    ],
    color: "bg-purple-500",
  },
  {
    title: "Đặc biệt",
    price: "299,000 VNĐ/tháng",
    features: [
      "Tất cả tính năng của chúng tôi",
      "Nhận 30 xu miễn phí mỗi ngày",
      "Hỗ trợ 24/7 qua điện thoại",
      "Ưu tiên quyền sử dụng dịch vụ",
      "Ưu tiên đặt phòng khám",
      "Nhận nhiều quyền lợi, voucher, ưu đãi",
    ],
    color: "bg-orange-500",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const CartPage = () => {
  const navigate = useNavigate();
  return (
    <AuroraBackground>
      <div className="max-h-screen py-12 px-4 flex flex-col items-center overflow-hidden">
        <div className="absolute top-4 left-4">
          <ThreeDButton onClick={() => navigate("/")} className="text-sm">
            Trở về trang chủ
          </ThreeDButton>
        </div>
        <h1 className="text-4xl font-bold text-center text-white mb-12">
          Chọn Gói Thành Viên Phù Hợp
        </h1>
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {membershipPackages.map((pkg, index) => (
            <motion.div
              key={pkg.title}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <CardContainer>
                <CardBody>
                  <CardItem
                    translateZ={60}
                    className="text-3xl font-bold text-white group-hover/card:text-black group-hover/card:scale-110"
                  >
                    {pkg.title}
                  </CardItem>

                  <CardItem
                    translateZ={40}
                    className="text-xl text-white mt-2 group-hover/card:text-black group-hover/card:scale-105"
                  >
                    {pkg.price}
                  </CardItem>

                  <CardItem
                    translateZ={30}
                    className="text-gray-300 mt-4 w-full group-hover/card:text-black"
                  >
                    <ul className="list-disc list-inside space-y-2">
                      {pkg.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </CardItem>

                  <CardItem translateZ={80} className="w-full mt-auto">
                    {pkg.default ? (
                      <button
                        className={`bg-white text-black font-semibold py-2 px-4 rounded-lg w-full cursor-default shadow-inner border border-gray-300`}
                        disabled
                      >
                        Gói Mặc Định
                      </button>
                    ) : (
                      <button
                        className={`${pkg.color} text-white font-semibold py-2 px-4 rounded-lg w-full hover:opacity-90 shadow-md hover:shadow-xl hover:shadow-black/20 hover:scale-110 group-hover/card:text-white cursor-pointer transition-all duration-500 ease-in-out`}
                      >
                        Chọn Gói
                      </button>
                    )}
                  </CardItem>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>
      </div>
    </AuroraBackground>
  );
};

export default CartPage;
