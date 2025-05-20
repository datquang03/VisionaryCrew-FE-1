
import React from 'react';
import { Tabs } from '../../../components/3D_Threejs/Tab';
import { BackgroundLines } from '../../../components/3D_Threejs/BackgroundLines';
import { useNavigate } from 'react-router-dom';
import  ThreeDButton  from '../../../components/3D_Threejs/3DButton';

const SettingsLayout = ({ userType, tabs }) => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 relative">
          <div className="absolute top-4 left-4 z-20">
          <ThreeDButton onClick={() => navigate("/")} className="text-sm">
            Trở về trang chủ
          </ThreeDButton>
        </div>
      <BackgroundLines />
      <div className="relative z-10 container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
           Cài Đặt của {userType} 
        </h1>
        <Tabs
          tabs={tabs}
          containerClassName="mb-8 flex justify-center"
          activeTabClassName="bg-blue-500"
          tabClassName="text-lg font-medium px-6 py-3 cursor-pointer"
          contentClassName="mt-8"
        />
      </div>
    </div>
  );
};

export default SettingsLayout;