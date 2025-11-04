import { useEffect } from "react";
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import Home from "./pages/Home/Home";
import Api from "./pages/Api/Api";
import Menu from "./pages/Menu/Menu";
import Recomendado from "./pages/Recomendado/Recomendado";
import Blog from "./pages/Blog/Blog";
import Nosotros from "./pages/Nosotros/Nosotros";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import Forbidden from "./pages/Forbidden/Forbidden";
import NotFound from "./pages/NotFound/NotFound";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductsContext";
import { OrdersProvider } from "./context/OrdersContext";
import { BlogProvider } from "./context/BlogsContext";
import { UsersProvider } from "./context/UsersContext";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { CartPopup } from "./components/layout/OrderPopUp/CartPopup";
import AdminProducts from "./pages/Admin/AdminProducts";
import { ProtectedRoute } from "./routesControl/routes";

function App() {
  useEffect(() => {
    if (window.UIkit && window.UIkit.notification) {
      const originalNotification = window.UIkit.notification;
      window.UIkit.notification = function(message, options) {
        const notifications = document.querySelectorAll('.uk-notification-message');
        if (notifications.length >= 3) {
          notifications[0].remove();
        }

        const defaultOptions = {
          timeout: 3000,
          ...(typeof options === 'object' ? options : { status: options })
        };

        return originalNotification.call(this, message, defaultOptions);
      };
    }
  }, []);

  return (
    <AuthProvider>
      <UsersProvider>
        <ProductProvider>
          <OrdersProvider>
            <BlogProvider>
              <Router>
              <Navbar />
              <CartPopup />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/api" element={<Api />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/suggest" element={<Recomendado />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/about" element={<Nosotros />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/forbidden" element={<Forbidden />} />
                <Route element={<ProtectedRoute requiredRoles={["ADMIN"]} />}>
                  <Route path="/admin/products" element={<AdminProducts />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </Router>
          </BlogProvider>
        </OrdersProvider>
      </ProductProvider>
      </UsersProvider>
    </AuthProvider>
  );
}

export default App;
