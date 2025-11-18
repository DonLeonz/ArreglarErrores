import { useEffect } from "react";
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import Home from "./pages/Home/Home";
import Api from "./pages/Api/Api";
import Menu from "./pages/Menu/Menu";
import Recomendado from "./pages/Recomendado/Recomendado";
import Blog from "./pages/Blog/Blog";
import Nosotros from "./pages/Nosotros/Nosotros";
import PasswordRecovery from "./pages/User/UserVerifications/PasswordRecovery";
import { useLogin } from "./context/LoginContext";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { CartPopup } from "./components/features/OrderPopUp/CartPopup";
import AdminControl from "./pages/Admin/AdminControl";
import LoginModal from "./components/modals/CreationModals/LoginModal/LoginModal";
import { ProtectedRoute } from "./routesControl/routes";
import { useAuth } from "./context/AuthContext";
import { setupAxiosResponseInterceptors } from "./api/axios.instance";
import NotFound from "./pages/Errors/NotFound/NotFound";
import UserOrders from "./pages/User/UserInfo/UserOrders";
import ConfirmEmailRegister from "./pages/User/UserVerifications/ConfirmEmailRegister";
import ScrollToTop from "./components/common/ScrollToTop";
import "./assets/styles/notifications.css";

function App() {
  const { logout } = useAuth();
  const { showLoginOrRegisterModal, mode, closeModal, openRefresh } = useLogin();

  useEffect(() => {
    setupAxiosResponseInterceptors(openRefresh, logout);
  }, [openRefresh, logout]);

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <CartPopup />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api" element={<Api />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/suggest" element={<Recomendado />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<Nosotros />} />
        <Route element={<ProtectedRoute requiredRoles={["ADMIN"]} />}>
          <Route path="/admin" element={<AdminControl />} />
        </Route>
        <Route element={<ProtectedRoute requiredRoles={["CUSTOMER"]} />}>
          <Route path="/user/orders" element={<UserOrders />} />
        </Route>
        <Route path="/password-recovery" element={<PasswordRecovery />}></Route>
        <Route path="/confirm-email" element={<ConfirmEmailRegister />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
      <LoginModal
        isOpen={showLoginOrRegisterModal}
        mode={mode}
        onClose={closeModal}
      />
    </Router>
  );
}

export default App;
