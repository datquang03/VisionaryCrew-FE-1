import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouter = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const localUserInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  return userInfo?.token || localUserInfo?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

const AdminProtectedRouter = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const localUserInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  const isAuthenticated = userInfo?.token || localUserInfo?.token;
  const isAdmin = userInfo?.isAdmin || localUserInfo?.isAdmin;

  return isAuthenticated ? (
    isAdmin ? (
      <Outlet />
    ) : (
      <Navigate to="/*" />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export { ProtectedRouter, AdminProtectedRouter };
