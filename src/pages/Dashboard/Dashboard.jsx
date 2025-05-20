
import React from 'react';
import MainLayout from './layout/DashboardLayout';

const Dashboard = () => {
  return (
    <MainLayout role="Doctor">
      <div className="min-h-[400px] max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white text-center">
          Doctor Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center">
          Welcome to the Doctor Dashboard. Here you can view your schedule, manage patients, and more.
        </p>
        {/* Add more dashboard content as needed */}
      </div>
    </MainLayout>
  );
};

export default Dashboard;