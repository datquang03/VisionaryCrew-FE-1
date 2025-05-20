"use client";

import React from 'react';
import ResetPassword from './layout/ResetPassword';
import SettingsLayout from './layout/SettingLayout';


const DoctorSettingPage = () => {
  const tabs = [
    {
      title: 'General',
      value: 'general',
      content: (
        <div className="flex items-center justify-center min-h-[400px] max-w-lg mx-auto">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center">Doctor General Settings</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center">Configure doctor settings here.</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Reset Password',
      value: 'reset-password',
      content: <ResetPassword />,
    },
    {
      title: 'Profile',
      value: 'profile',
      content: (
        <div className="flex items-center justify-center min-h-[400px] max-w-lg mx-auto">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center">Doctor Profile Settings</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center">Update doctor profile here.</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Schedule',
      value: 'schedule',
      content: (
        <div className="flex items-center justify-center min-h-[400px] max-w-lg mx-auto overflow-y-auto">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center">Schedule Settings</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center">Manage doctor schedule here.</p>
            {/* Example of long content to trigger scroll */}
            <div className="space-y-4">
              {Array.from({ length: 20 }).map((_, idx) => (
                <p key={idx} className="text-gray-600 dark:text-gray-300">Schedule item {idx + 1}</p>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return <SettingsLayout userType="Bác sĩ" tabs={tabs} />;
};

export default DoctorSettingPage;