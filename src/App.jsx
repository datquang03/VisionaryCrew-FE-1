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
  AdminProtectedRouter,
  DoctorProtectedRouter,
  ProtectedRouter,
} from "./middlewares/auth";
import DashboardAdminPage from "./pages/Dashboard/DashboardPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import BlogPage from "./pages/Blog/BlogPage";
import BlogDetailPage from "./pages/Blog/BlogDetailPage";

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

        <Route path="*" element={<NotFoundPage />} />
        <Route element={<ProtectedRouter />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/update-profile" element={<UpdateProfilePage />} />
        </Route>
        <Route element={<DoctorProtectedRouter />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<AdminProtectedRouter />}>
          <Route path="/dashboard/admin" element={<DashboardAdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
