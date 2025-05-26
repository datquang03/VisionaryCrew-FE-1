/* eslint-disable no-unused-vars */
import { Canvas } from "@react-three/fiber";
import { DoctorBreath } from "../../../public/Doctor";
import TypingDescription from "./TypingAnimate";
import { GiTechnoHeart } from "react-icons/gi";
import { FaCalendarDays, FaHeart } from "react-icons/fa6";
import { BsCameraReelsFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ColourfulText } from "../../components/3D_Threejs/ColorfulText";

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
    <span className="relative z-20 overflow-hidden px-1 font-medium">
      <span className="relative z-20 group-hover:text-black transition-colors duration-300">
        {text}
      </span>
      <span className="absolute left-0 top-0 w-full h-full bg-white z-10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out rounded-3xl" />
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
    <span className="relative z-20 overflow-hidden px-1 font-medium">
      <span className="relative z-20 group-hover:text-black transition-colors duration-300">
        {text}
      </span>
      <span className="absolute right-0 top-0 w-full h-full bg-white z-10 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out rounded-3xl" />
    </span>
  </div>
);

const MobileIntroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-blue-900 text-white flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 rounded-lg min-h-[600px] sm:min-h-[700px] md:min-h-[800px] w-full overflow-visible">
      {/* Top Title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center w-full mb-4 sm:mb-6 md:mb-8">
        <ColourfulText text="CHĂM SÓC SỨC KHOẺ" filter={false} />
      </h1>

      {/* Center - 3D with Icons */}
      <div className="relative my-6 sm:my-8 w-full flex flex-col items-center">
        <div className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-50 md:h-50 rounded-lg flex items-center justify-center relative">
          <Canvas>
            <directionalLight intensity={0.5} position={[5, 5, 5]} />
            <ambientLight intensity={1} />
            <group position={[3, 1.5, -0.5]} scale={40}>
              <DoctorBreath />
            </group>
          </Canvas>
        </div>

        {/* Icons Container */}
        <div className="w-full mt-6 sm:mt-8 flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0">
          {/* Left Icons */}
          <div className="flex flex-col items-center space-y-4 md:absolute md:top-1/4 md:left-[-300px] md:transform md:-translate-y-1/2">
            <IconTextLeft
              icon={
                <GiTechnoHeart className="text-indigo-800 text-lg sm:text-xl md:text-xl" />
              }
              text="Chuẩn đoán bệnh với AI"
              bg1="bg-indigo-300"
              bg2="bg-indigo-100"
            />
            <IconTextLeft
              icon={
                <FaCalendarDays className="text-pink-700 text-lg sm:text-xl md:text-xl" />
              }
              text="Nhanh chóng đặt lịch"
              bg1="bg-pink-300"
              bg2="bg-rose-100"
            />
          </div>

          {/* Right Icons */}
          <div className="flex flex-col items-center space-y-4 md:absolute md:top-1/4 md:right-[-300px] md:transform md:-translate-y-1/2">
            <IconTextRight
              icon={
                <FaHeart className="text-red-700 text-lg sm:text-xl md:text-xl" />
              }
              text="Chất lượng và hiệu quả"
              bg1="bg-red-300"
              bg2="bg-red-100"
            />
            <IconTextRight
              icon={
                <BsCameraReelsFill className="text-green-700 text-lg sm:text-xl md:text-xl" />
              }
              text="Video call với bác sĩ"
              bg1="bg-emerald-300"
              bg2="bg-lime-100"
            />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4 sm:gap-6">
        <div className="w-full sm:w-auto max-w-[80%] sm:max-w-[50%]">
          <TypingDescription />
        </div>
        <button
          className="bg-pink-400 text-white px-4 sm:px-6 py-2 rounded-full hover:bg-pink-500 transition duration-300 ease-in-out transform hover:scale-110"
          onClick={() => navigate("/walkthrough")}
        >
          Bắt đầu
        </button>
      </div>
    </div>
  );
};

export default MobileIntroSection;
