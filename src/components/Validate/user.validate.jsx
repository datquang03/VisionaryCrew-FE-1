import * as yup from "yup";

// Helper function to get the number of days in a month, considering leap years
const getDaysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

// Custom validation function for day based on month and yearconst validateDay = (day, month, year) => {
const validateDay = (day, month, year) => {
  day = Number(day);
  month = Number(month);
  year = Number(year);
  if (!day || !month || !year || isNaN(day) || isNaN(month) || isNaN(year)) {
    return "Vui lòng chọn đầy đủ ngày, tháng, năm";
  }
  const daysInMonth = getDaysInMonth(month, year);
  if (day > daysInMonth) {
    return `Ngày ${day} không hợp lệ trong tháng ${month}`;
  }
  return true;
};

// Login validation
const LoginValidation = yup.object().shape({
  username: yup
    .string()
    .required("Tài khoản không được để trống")
    .max(20, "Tài khoản không được vượt quá 20 ký tự")
    .matches(/^[A-Za-z\s]+$/, "Tài khoản chỉ chứa chữ cái và khoảng trắng"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .required("Password is required")
    .matches(/[0-9]/, "Password must contain a number"),
});

// Register validation
const RegisterValidation = yup.object().shape({
  username: yup
    .string()
    .required("Tài khoản không được để trống")
    .max(20, "Tài khoản không được vượt quá 20 ký tự")
    .matches(/^[A-Za-z\s]+$/, "Tài khoản chỉ chứa chữ cái và khoảng trắng"),
  email: yup
    .string()
    .email("Địa chỉ email không hợp lệ")
    .required("Email không được để trống"),
  phone: yup
    .string()
    .required("Số điện thoại không được để trống")
    .matches(
      /^[0-9]{10}$/,
      "Số điện thoại phải có 10 chữ số và chỉ chứa các chữ số"
    ),
  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(20, "Mật khẩu không quá 20 ký tự")
    .required("Mật khẩu không được để trống")
    .matches(/[0-9]/, "Mật khẩu phải chứa ít nhất một chữ số"),
  birthDay: yup
    .number()
    .required("Vui lòng chọn ngày")
    .test(
      "valid-date",
      "Ngày sinh không hợp lệ (định dạng DD-MM-YYYY)",
      function () {
        const { birthDay, birthMonth, birthYear } = this.parent;
        const isValid = validateDay(birthDay, birthMonth, birthYear); // sử dụng hàm bạn có sẵn
        return isValid === true;
      }
    ),
});

const ProfileValidation = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .max(20, "Full name is shorter than 20 characters")
    .matches(/^[A-Za-z\s]+$/, "Full name must contain only characters"),
});

const PasswordValidation = yup.object().shape({
  oldPassword: yup
    .string()
    .required("Old password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .matches(/[0-9]/, "Password must contain a number"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .matches(/[0-9]/, "Password must contain a number"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .matches(/[0-9]/, "Password must contain a number")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

export {
  LoginValidation,
  RegisterValidation,
  ProfileValidation,
  PasswordValidation,
};
