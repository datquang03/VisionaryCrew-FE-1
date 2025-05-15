/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { IoMdArrowRoundBack } from "react-icons/io";
import { motion, useAnimation } from "framer-motion";
import DreamyCircles from "../../components/3D_Threejs/DreamyCircle";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginValidation } from "../../components/Validate/user.validate";
import { loginAction } from "../../../redux/actions/user.actions";
import { showToast } from "../../utils/Toast";
import ShortLoading from "../../components/Loading/ShortLoading";

const LoginPage = () => {
  const navigate = useNavigate();
  const loginControls = useAnimation();
  const [colorIndex, setColorIndex] = useState(0);
  const dispatch = useDispatch();
  const { isLoading, isError, userInfo, isSuccess, message } = useSelector(
    (state) => state.userLogin
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(LoginValidation),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = (data) => {
    dispatch(loginAction(data));
  };

  useEffect(() => {
    return () => {
      dispatch({ type: "USER_LOGIN_RESET" });
    };
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(errors).length > 0 && isSubmitting) {
      showToast("Vui lòng kiểm tra thông tin đăng nhập!", "error");
    }
  }, [errors, isSubmitting]);

  useEffect(() => {
    if (isSuccess && userInfo) {
      console.log("Login success, userInfo:", userInfo);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      showToast("Đăng nhập thành công!", "success");
      navigate("/profile");
      setTimeout(() => {
        dispatch({ type: "USER_LOGIN_RESET" });
      }, 1000);
    }
    if (isError && message) {
      showToast(message, "error");
      dispatch({ type: "USER_LOGIN_RESET" });
    }
  }, [isSuccess, isError, message, navigate, dispatch, userInfo]);

  const colors = [
    "#FF0000",
    "#FFA500",
    "#FFFF00",
    "#008000",
    "#0000FF",
    "#4B0082",
    "#EE82EE",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [colors.length]);

  useEffect(() => {
    const sequence = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await loginControls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" },
      });
    };
    sequence();
  }, [loginControls]);

  const handleSignUpClick = async () => {
    await loginControls.start({
      opacity: 0,
      x: -200,
      transition: { duration: 0.5, ease: "easeIn" },
    });
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex">
      <div className="absolute inset-0 z-5">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <DreamyCircles />
        </Canvas>
      </div>

      <motion.div
        className="w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 bg-opacity-50 relative"
        initial={{ opacity: 1, x: 0 }}
        animate={loginControls}
      >
        <motion.div
          className="absolute left-10 top-1/4 text-4xl font-bold text-blue-900 w-1/4 z-10"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Chào Mừng Bạn Đến Với{" "}
          <span
            style={{
              color: colors[colorIndex],
              transition: "color 1s ease",
              borderBottom: "2px solid",
            }}
          >
            Visionary Crew !
          </span>
        </motion.div>

        <motion.div
          className="absolute right-10 top-1/4 z-10"
          initial={{ x: 200, opacity: 0, rotate: 0 }}
          animate={{ x: 0, opacity: 1, rotate: 360 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <svg
            className="w-16 h-16 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </motion.div>

        <motion.div
          className="w-96 p-8 bg-white rounded-lg shadow-lg relative z-10"
          initial={{ y: 300, opacity: 0 }}
          animate={loginControls}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
              Đăng Nhập
            </h2>
            <div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="username"
                >
                  Tài khoản
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Điền tên tài khoản"
                  {...register("username")}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.username
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="password"
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Điền mật khẩu"
                  {...register("password")}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className={`w-full bg-blue-600 text-white py-2 rounded-lg transition duration-300 ${
                  isSubmitting || isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700 cursor-pointer"
                }`}
              >
                {isLoading ? (
                  <div className="w-full flex items-center justify-center">
                    <ShortLoading text="Đợi chút nha" />
                  </div>
                ) : (
                  "Đăng Nhập"
                )}
              </button>
              <button
                type="button"
                className="w-full mt-4 flex items-center justify-center bg-white text-gray-700 py-2 border rounded-lg hover:bg-gray-100 transition duration-300"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  />
                  <path fill="none" d="M0 0h48v48H0z" />
                </svg>
                Đăng nhập với Google
              </button>
            </div>
            <p className="mt-4 text-center text-gray-600">
              Bạn không có tài khoản ?{" "}
              <span
                onClick={handleSignUpClick}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Đăng kí
              </span>
            </p>
          </form>
        </motion.div>
      </motion.div>

      <motion.button
        className="absolute top-4 left-4 text-xl text-indigo-900 hover:translate-x-1 transition-transform duration-500 ease-in-out pt-4 hover:underline z-10 cursor-pointer"
        initial={{ opacity: 1, x: 0 }}
        animate={loginControls}
      >
        <div className="flex items-center space-x-2">
          <IoMdArrowRoundBack />
          <span className="relative inline-block" onClick={() => navigate("/")}>
            Về trang chủ
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-900 transition-all duration-500 ease-in-out hover:w-full"></span>
          </span>
        </div>
      </motion.button>
    </div>
  );
};

export default LoginPage;
