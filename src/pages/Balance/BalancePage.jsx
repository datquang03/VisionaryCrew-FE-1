import React from "react";
import { useNavigate } from "react-router-dom";

const BalancePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        className="text-3xl text-indigo-900 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Home
      </button>
      BalancePage
    </div>
  );
};

export default BalancePage;
