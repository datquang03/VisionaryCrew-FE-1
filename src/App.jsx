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
import { AdminProtectedRouter, ProtectedRouter } from "./middlewares/auth";
import DashboardAdminPage from "./pages/Dashboard/DashboardPage";

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

        <Route path="*" element={<NotFoundPage />} />
        <Route element={<ProtectedRouter />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/update-profile" element={<UpdateProfilePage />} />
        </Route>
        <Route element={<AdminProtectedRouter />}>
          <Route path="/dashboard" element={<DashboardAdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
