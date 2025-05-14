import * as userConstants from "../constants/user.constants";
import * as userAPIs from "../APIs/user.services";
import { saveUserInfo } from "../store";
import { showToast } from "../../src/utils/Toast";
import { ErrorsAction } from "../protection";
export const loginAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOGIN_REQUEST" });
    const response = await userAPIs.loginService(data);
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: response });
    saveUserInfo(response);
    localStorage.setItem("userInfo", JSON.stringify(response));
    showToast("Đăng nhập thành công!", "success");
  } catch (error) {
    ErrorsAction(error, dispatch, "USER_LOGIN_FAIL");
    const message = error.response?.data?.message || "Đăng nhập thất bại!";
    showToast(message, "error");
  }
};

export const registerAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    const response = await userAPIs.registerService(data);
    const message =
      response.message || "Đăng ký thành công! Vui lòng kiểm tra email.";
    dispatch({
      type: userConstants.USER_REGISTER_SUCCESS,
      payload: message,
    });
    showToast(message, "success");
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_REGISTER_FAIL);
    showToast(error.response?.data?.message || "Đăng ký thất bại!", "error");
  }
};

export const logoutAction = () => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_LOGOUT });
    localStorage.removeItem("userInfo");
    showToast("Đăng xuất thành công!", "success");
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_LOGOUT);
    showToast("Đăng xuất thất bại!", "error");
  }
};
