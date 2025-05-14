import axiosClient from "./axios";
// register user with API
export const registerService = async (user) => {
  const { data } = await axiosClient.post("/users/register", user);
  if (data) {
    localStorage.setItem("userInfo", data.token);
  }
  return data;
};

// logout user
export const logoutService = () => {
  localStorage.removeItem("userInfo");
  return null;
};

// login user API call
export const loginService = async (user) => {
  const { data } = await axiosClient.post("/users/login", user);
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};
