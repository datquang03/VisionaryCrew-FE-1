import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { showToast } from "../../utils/Toast";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const hasVerified = useRef(false);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const email = query.get("email");

    if (token && email && !hasVerified.current) {
      hasVerified.current = true; // Prevent duplicate requests
      console.log("Sending verification request:", { token, email }); // Debug log
      setIsLoading(true);
      axios
        .get(`http://localhost:8000/api/users/verify-email/${token}`, {
          params: { email },
        })
        .then((response) => {
          console.log("Verification success:", response.data); // Debug log
          showToast(response.data.message, "success");
          navigate("/login");
        })
        .catch((error) => {
          console.error("Verification error:", error.response?.data); // Debug log
          const message = error.response?.data?.message || "Xác thực thất bại";
          showToast(message, "error");
          navigate("/login");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (!token || !email) {
      showToast("Mã xác thực hoặc email không hợp lệ", "error");
      navigate("/login");
      setIsLoading(false);
    }
  }, [token, navigate, location]); // Include email in dependencies

  return (
    <div>
      {isLoading
        ? "Đang xác thực email..."
        : "Xác thực hoàn tất, đang chuyển hướng..."}
    </div>
  );
};

export default VerifyEmail;
