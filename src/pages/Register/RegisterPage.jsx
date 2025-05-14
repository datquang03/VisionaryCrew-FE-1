/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import DreamyCircles from "../../components/3D_Threejs/DreamyCircle";
import DateOfBirthSelect from "../../components/DateFormat/DateOfBirthSelect";
import { RegisterValidation } from "../../components/Validate/user.validate";
import { registerAction } from "../../../redux/actions/user.actions";
import { showToast } from "../../utils/Toast.jsx";

const RegisterPage = () => {
  const navigate = useNavigate();
  const formControls = useAnimation();
  const backButtonControls = useAnimation();
  const dispatch = useDispatch();
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.userRegister
  );
  const [showPassword, setShowPassword] = React.useState(false);
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(RegisterValidation),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = (data) => {
    const { birthDay, birthMonth, birthYear, ...rest } = data;
    const birthDate = `${String(birthDay).padStart(2, "0")}-${String(
      birthMonth
    ).padStart(2, "0")}-${birthYear}`;
    const payload = { ...rest, dateOfBirth: birthDate };
    setHasSubmitted(true);
    dispatch(registerAction(payload));
  };

  useEffect(() => {
    if (hasSubmitted && Object.keys(errors).length > 0) {
      showToast("Vui lòng kiểm tra các trường nhập liệu!", "error");
    }
  }, [errors, hasSubmitted]);

  const handleLoginClick = async () => {
    await Promise.all([
      formControls.start({
        opacity: 0,
        x: -200,
        transition: { duration: 0.5, ease: "easeIn" },
      }),
      backButtonControls.start({
        opacity: 0,
        x: -200,
        transition: { duration: 0.5, ease: "easeIn" },
      }),
    ]);
    navigate("/login");
  };

  useEffect(() => {
    formControls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    });
  }, [formControls]);

  useEffect(() => {
    if (isSuccess) {
      console.log("Registration Successful:", message);
      localStorage.removeItem("userInfo");
      dispatch({ type: "USER_REGISTER_RESET" });
      navigate("/login");
    }
    if (isError) {
      // Remove showToast here; ErrorsAction handles it
      dispatch({ type: "USER_REGISTER_RESET" });
    }
  }, [isSuccess, isError, message, navigate, dispatch]);

  return (
    <div className="h-screen fixed inset-0 overflow-hidden flex flex-col">
      <div className="absolute inset-0 z-5">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <DreamyCircles />
        </Canvas>
      </div>
      <motion.div
        className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 relative overflow-y-auto"
        initial={{ y: 300, opacity: 0 }}
        animate={formControls}
      >
        <form
          className="w-96 p-8 bg-white rounded-lg shadow-lg relative z-10 max-h-[calc(100vh-4rem)] overflow-y-auto my-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
            Đăng Kí
          </h2>
          <div>
            <div className="mb-4 relative">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="username"
              >
                Tài khoản
              </label>
              <input
                type="text"
                id="username"
                {...register("username")}
                placeholder="Điền tên tài khoản"
                onBlur={() => trigger("username")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="mb-4 relative">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                placeholder="Nhập email"
                onBlur={() => trigger("email")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-4 relative">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="phone"
              >
                Số điện thoại
              </label>
              <input
                type="tel"
                id="phone"
                {...register("phone")}
                placeholder="Nhập số điện thoại"
                onBlur={() => trigger("phone")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="mb-4 relative">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="birthDate"
              >
                Ngày sinh
              </label>
              <DateOfBirthSelect
                setValue={setValue}
                errors={errors}
                trigger={trigger}
              />
            </div>
            <div className="mb-4 relative">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="password"
              >
                Mật khẩu
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password")}
                placeholder="Điền mật khẩu"
                onBlur={() => trigger("password")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="absolute right-3 top-10 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading || isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer disabled:opacity-50"
            >
              {isLoading || isSubmitting ? "Đợi chút nha" : "Đăng kí"}
            </button>
          </div>
          <p className="mt-4 text-center text-gray-600">
            Bạn đã có tài khoản?{" "}
            <span
              onClick={handleLoginClick}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Đăng nhập
            </span>
          </p>
        </form>
      </motion.div>
      <motion.button
        className="absolute top-4 left-4 text-xl text-indigo-900 cursor-pointer hover:translate-x-1 transition-transform duration-500 ease-in-out pt-4 hover:underline z-5"
        animate={backButtonControls}
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

export default RegisterPage;
