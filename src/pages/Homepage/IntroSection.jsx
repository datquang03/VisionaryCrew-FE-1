import { Canvas } from "@react-three/fiber";
import { DoctorBreath } from "../../../public/Doctor";
import TypingDescription from "./TypingAnimate";
import { GiTechnoHeart } from "react-icons/gi";
import { FaCalendarDays, FaHeart } from "react-icons/fa6";
import { BsCameraReelsFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const IconTextLeft = ({ icon, text, bg1, bg2 }) => (
  <div className="group flex items-center space-x-2 transition-transform duration-300 hover:scale-105 cursor-pointer">
    <div
      className={`w-8 h-8 ${bg1} rounded-full flex items-center justify-center`}
    >
      <div
        className={`w-8 h-8 ${bg2} rounded-full flex items-center justify-center`}
      >
        {icon}
      </div>
    </div>
    <span className="relative z-10 overflow-hidden px-1 font-medium">
      <span className="relative z-10 group-hover:text-black transition-colors duration-300">
        {text}
      </span>
      <span className="absolute left-0 top-0 w-full h-full bg-white z-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out rounded-3xl" />
    </span>
  </div>
);

const IconTextRight = ({ icon, text, bg1, bg2 }) => (
  <div className="group flex flex-row-reverse items-center space-x-reverse space-x-2 transition-transform duration-300 hover:scale-105 cursor-pointer">
    <div
      className={`w-8 h-8 ${bg1} rounded-full flex items-center justify-center`}
    >
      <div
        className={`w-8 h-8 ${bg2} rounded-full flex items-center justify-center`}
      >
        {icon}
      </div>
    </div>
    <span className="relative z-10 overflow-hidden px-1 font-medium">
      <span className="relative z-10 group-hover:text-black transition-colors duration-300">
        {text}
      </span>
      <span className="absolute right-0 top-0 w-full h-full bg-white z-0 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out rounded-3xl" />
    </span>
  </div>
);

const IntroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="relative bg-blue-900 text-white flex flex-col items-center justify-between p-8 rounded-lg min-h-[380px]">
      {/* Top Title */}
      <h1 className="text-6xl font-bold text-center w-full">
        CHĂM SÓC SỨC KHỎE
      </h1>

      {/* Center - 3D with Icons */}
      <div className="relative my-8">
        <div className="w-50 h-50 rounded-lg flex items-center justify-center relative">
          <Canvas>
            <directionalLight intensity={0.5} position={[5, 5, 5]} />
            <ambientLight intensity={1} />
            <group position={[3, 1.5, -0.5]}>
              <DoctorBreath scale={60} />
            </group>
          </Canvas>

          {/* Left Icons */}
          <div className="absolute top-1/4 left-[-300px] transform -translate-y-1/2">
            <IconTextLeft
              icon={<GiTechnoHeart className="text-indigo-800 text-xl" />}
              text="Chuẩn đoán bệnh với AI"
              bg1="bg-indigo-300"
              bg2="bg-indigo-100"
            />
          </div>
          <div className="absolute top-1/2 left-[-300px] transform -translate-y-1/2">
            <IconTextLeft
              icon={<FaCalendarDays className="text-pink-700 text-xl" />}
              text="Nhanh chóng đặt lịch"
              bg1="bg-pink-300"
              bg2="bg-rose-100"
            />
          </div>

          {/* Right Icons */}
          <div className="absolute top-1/4 right-[-300px] transform -translate-y-1/2">
            <IconTextRight
              icon={<FaHeart className="text-red-700 text-xl" />}
              text="Chất lượng và hiệu quả"
              bg1="bg-red-300"
              bg2="bg-red-100"
            />
          </div>
          <div className="absolute top-1/2 right-[-300px] transform -translate-y-1/2">
            <IconTextRight
              icon={<BsCameraReelsFill className="text-green-700 text-xl" />}
              text="Video call với bác sĩ"
              bg1="bg-emerald-300"
              bg2="bg-lime-100"
            />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full flex justify-between items-end">
        <TypingDescription />
        <button
          className="bg-pink-400 text-white px-6 py-2 rounded-full hover:bg-pink-500 transition duration-300 ease-in-out cursor-pointer scale-3d hover:scale-110"
          onClick={() => navigate("/walkthrough")}
        >
          Bắt đầu
        </button>
      </div>
    </div>
  );
};

export default IntroSection;
