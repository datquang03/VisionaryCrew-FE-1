import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as User from "./reducers/user.reducers";

// Kiểm tra dữ liệu hợp lệ trong localStorage

export const saveUserInfo = (userInfo) => {
  if (!userInfo || typeof userInfo !== "object") {
    console.warn("Không lưu userInfo vì dữ liệu không hợp lệ:", userInfo);
    localStorage.removeItem("userInfo");
    return;
  }
  try {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  } catch (error) {
    console.error("Lỗi khi lưu userInfo vào localStorage:", error);
  }
};
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const rootReducer = combineReducers({
  userLogin: User.userLoginReducer,
  userRegister: User.userRegisterReducer,
});
const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
    isLoading: false,
    isError: false,
  },
};
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

export default store;
