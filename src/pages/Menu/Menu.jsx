import { useState } from "react";
import CoffeeCard from "../../components/cards/CoffeeCard/CoffeeCard";
import CoffeeModal from "../../components/modals/CoffeeModal/CoffeeModal";
import MenuHeader from "../../components/features/Menu/MenuHeader/MenuHeader";
import CreateProductModal from "../../components/modals/CreationModals/CreateProductModal";
import { useProducts } from "../../context/ProductsContext";
import "./Menu.css";
import { useAuth } from "../../context/AuthContext";
import ProductSearchForm from "../../components/features/Menu/MenuHeader/ProductSearchForm";

const Menu = () => {
  const [showModal, setShowModal] = useState(false);
  const [showProductInfoModal, setShowProductInfoShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products } = useProducts();
  const { roles } = useAuth();

  const handleOpenFormModal = () => {
    setShowModal(true);
    const offcanvas = document.getElementById("burger-menu");
    if (offcanvas && window.UIkit) window.UIkit.offcanvas(offcanvas).hide();
  };

  const handleOpenInfoModal = (item) => {
    setSelectedProduct(item);
    setShowProductInfoShowModal(true);
    const offcanvas = document.getElementById("burger-menu");
    if (offcanvas && window.UIkit) window.UIkit.offcanvas(offcanvas).hide();
  };

  return (
    <div className="first-child-adjustment uk-section uk-background-secondary uk-light uk-padding-small menu-section">
      <div className="uk-container uk-container-xlarge uk-padding-small uk-light">
        <MenuHeader />
        <ProductSearchForm />
        {roles.includes("ADMIN") && (
          <div className="uk-light">
            <button
              className="uk-text-capitalize uk-text-normal uk-button uk-button-secondary uk-border-rounded uk-width-1-1"
              onClick={handleOpenFormModal}
            >
              Registrar Producto
            </button>
          </div>
        )}
        <div
          className="uk-grid-small uk-child-width-1-3@m uk-child-width-1-2@s uk-child-width-1-1@s menu-grid"
          data-uk-grid
          data-uk-height-match="target: > div > .uk-card"
        >
          {Array.isArray(products) &&
            products.map((item, index) => (
              <div key={index}>
                <CoffeeCard
                  item={item}
                  onViewDetails={() => handleOpenInfoModal(item)}
                />
              </div>
            ))}
        </div>
      </div>
      <CreateProductModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        mode="create"
      />
      {selectedProduct && (
        <CoffeeModal
          isOpen={showProductInfoModal}
          onClose={() => {
            setSelectedProduct(null);
            setShowProductInfoShowModal(false);
          }}
          item={selectedProduct}
        />
      )}
    </div>
  );
};

export default Menu;
