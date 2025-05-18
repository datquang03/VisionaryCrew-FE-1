/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import StarryBackground from '../../../components/3D_Threejs/StarryBackground'; 
import { motion } from 'framer-motion';

const EmailUpdateVerify = () => {
  const [code, setCode] = useState('');

  const handleSubmit = () => {
    console.log('Xác nhận mã:', code);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <StarryBackground />

      <div className="absolute inset-0 flex items-center justify-center px-4">
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 max-w-md w-full text-white"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl font-bold mb-4 text-center">
            Hãy kiểm tra email của bạn và điền code
          </h1>

          <input
            type="text"
            placeholder="Nhập mã xác minh"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white mb-4"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Xác nhận
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default EmailUpdateVerify;
