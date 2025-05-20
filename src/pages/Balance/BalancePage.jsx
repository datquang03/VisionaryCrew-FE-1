/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  CardContainer,
  CardBody,
  CardItem,
} from "../../components/3D_Threejs/CardContainer";
import ThreeDButton from "../../components/3D_Threejs/3DButton";
import DreamyCircles from "../../components/3D_Threejs/DreamyCircle";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import {
  createPaymentUrl,
  resetTransactionState,
} from "../../redux/APIs/slices/transactionSlice";

const rechargePackages = [
  { price: "10.000 VNĐ", amount: 10000, xu: 10 },
  { price: "50.000 VNĐ", amount: 50000, xu: 60 },
  { price: "100.000 VNĐ", amount: 100000, xu: 130 },
  { price: "500.000 VNĐ", amount: 500000, xu: 700 },
  { price: "1.000.000 VNĐ", amount: 1000000, xu: 1500 },
  { price: "2.500.000 VNĐ", amount: 2500000, xu: 3000, bonus: true },
];

const cardVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

const BalancePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { paymentUrl, status, error } = useSelector((state) => state.tranSlice || {});


  const handleRecharge = (amount) => {
    const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    console.log("Dispatching createPaymentUrl with:", { amount, orderId });
    dispatch(
      createPaymentUrl({
        amount,
        orderId,
        orderInfo: `Nạp ${amount.toLocaleString()} VNĐ vào số dư`,
      })
    );
  };

  useEffect(() => {
    if (status === "succeeded" && paymentUrl) {
      window.location.href = paymentUrl;
    }
  }, [status, paymentUrl]);
  

  useEffect(() => {
    if (status === "failed" && error) {
      alert(`Lỗi: ${error.message || error}`);
      dispatch(resetTransactionState());
    }
  }, [status, error, dispatch]);

  return (
    <div className="min-h-screen py-12 px-4 flex flex-col items-center bg-gradient-to-r from-[#e0e7ff] to-[#c7d2fe] z-10">
      <div className="absolute inset-0 z-5">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <DreamyCircles />
        </Canvas>
      </div>
      <ThreeDButton
        className="text-sm self-start mb-6 ml-4 z-10"
        onClick={() => navigate("/")}
      >
        Trở về trang chủ
      </ThreeDButton>

      <h1 className="text-4xl font-bold text-indigo-900 mb-12 text-center">
        Chọn Gói Nạp Tiền Phù Hợp
      </h1>

      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
        {rechargePackages.map((pkg, index) => (
          <motion.div
            key={pkg.price}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <CardContainer>
              <CardBody className="flex flex-col h-full">
                <CardItem
                  translateZ={60}
                  className="text-3xl font-bold text-indigo-200 group-hover/card:text-[#000000] group-hover/card:scale-110 transition-transform duration-300"
                >
                  {pkg.price}
                </CardItem>

                <CardItem
                  translateZ={40}
                  className="text-xl text-indigo-700 mt-2 group-hover/card:text-[#000000] group-hover/card:scale-105 transition-transform duration-300"
                >
                  {pkg.xu.toLocaleString()} xu
                  {pkg.bonus && (
                    <span className="ml-2 text-sm font-medium text-green-600">
                      + Khuyến mãi
                    </span>
                  )}
                </CardItem>

                <CardItem
                  translateZ={30}
                  className="text-gray-600 mt-4 w-full group-hover/card:text-[#000000]"
                >
                  {/* Bạn có thể thêm mô tả chi tiết thêm nếu muốn */}
                </CardItem>

                <CardItem translateZ={80} className="w-full mt-auto">
                  <button
                    className={`bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg w-full hover:opacity-90 shadow-md hover:shadow-xl hover:shadow-black/20 hover:scale-110
                      group-hover/card:text-white cursor-pointer transition-all duration-500 ease-in-out`}
                    onClick={() => handleRecharge(pkg.amount)}
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Đang xử lý..." : "Nạp ngay"}
                  </button>
                </CardItem>
              </CardBody>
            </CardContainer>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BalancePage;