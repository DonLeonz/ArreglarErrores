import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import Home from "./pages/Home/Home";
import Api from "./pages/Api/Api";
import Menu from "./pages/Menu/Menu";
import Recomendado from "./pages/Recomendado/Recomendado";
import Blog from "./pages/Blog/Blog";
import Nosotros from "./pages/Nosotros/Nosotros";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductsContext";
import { OrdersProvider } from "./context/OrdersContext";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { CartPopup } from "./components/layout/OrderPopUp/CartPopup";
import AdminProducts from "./pages/Admin/AdminProducts";
import { ProtectedRoute } from "./routesControl/routes";

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <OrdersProvider>
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
              <Route element={<ProtectedRoute />}>
                <Route path="/admin/products" element={<AdminProducts />} />
              </Route>
            </Routes>
            <Footer />
          </Router>
        </OrdersProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
