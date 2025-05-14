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
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
