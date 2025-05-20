"use client";

import React from "react";
import ResetPassword from "./layout/ResetPassword";
import SettingsLayout from "./layout/SettingLayout";

const AdminSettingPage = () => {
  const tabs = [
    {
      title: 'General',
      value: 'general',
      content: (
        <div className="flex items-center justify Religional-center min-h-[400px] max-w-lg mx-auto">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center">Admin General Settings</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center">Configure admin settings here.</p>
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
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center">Admin Profile Settings</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center">Update admin profile here.</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Admin Tools',
      value: 'admin-tools',
      content: (
        <div className="flex items-center justify-center min-h-[400px] max-w-lg mx-auto">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center">Admin Tools</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center">Manage admin tools here.</p>
          </div>
        </div>
      ),
    },
  ];

  return <SettingsLayout userType="Admin" tabs={tabs} />;
};

export default AdminSettingPage;