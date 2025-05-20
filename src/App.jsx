import { BrowserRouter, Routes, Route } from "react-router-dom";
import BalancePage from "./pages/Balance/BalancePage";
import { ScrollToTop } from "./components/ScrollView/ScrollToTop";
import LoginPage from "./pages/Login/LoginPage";
import NotFoundPage from "./pages/Not-found/NotFoundPage";
import Homepage from "./pages/Homepage/Homepage";
import WalkthroughPage from "./pages/Walkthrough/WalkthroughPage";
import EmailVerifyPage from "./pages/Verify/EmailVerifyPage";
import RegisterPage from "./pages/Register/RegisterPage";
import ToastContainer from "./components/Toast/ToastContainer";
import ProfilePage from "./pages/Profile/ProfilePage";
import UpdateProfilePage from "./pages/Profile/UpdateProfile/UpdateProfilePage";
import {
  ProtectedRouter,
  AdminProtectedRouter,
  DoctorProtectedRouter,
} from "./middlewares/auth";
import DashboardAdminPage from "./pages/Dashboard/DashboardPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import BlogPage from "./pages/Blog/BlogPage";
import BlogDetailPage from "./pages/Blog/BlogDetailPage";
import EmailUpdateVerify from "./pages/Profile/UpdateProfile/EmailUpdateVerify";
import CartPage from "./pages/Cart/CartPage";
import SettingPage from "./pages/Setting/SettingPage";
import DoctorSettingPage from "./pages/Setting/DoctorSettingPage";
import AdminSettingPage from "./pages/Setting/AdminSettingPage";

const App = () => {
  return (
      <BrowserRouter>
        <ToastContainer />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/balance" element={<BalancePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/walkthrough" element={<WalkthroughPage />} />
          <Route path="/verify-email/:token" element={<EmailVerifyPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route element={<ProtectedRouter />}>
            <Route path="/settings" element={<SettingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/update-profile" element={<UpdateProfilePage />} />
            <Route path="/update-email/code" element={<EmailUpdateVerify />} />
            <Route element={<DoctorProtectedRouter />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings/doctor" element={<DoctorSettingPage />} />
            </Route>
            <Route element={<AdminProtectedRouter />}>
              <Route path="/dashboard/admin" element={<DashboardAdminPage />} />
              <Route path="/settings/admin" element={<AdminSettingPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;