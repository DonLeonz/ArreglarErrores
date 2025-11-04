import { useState } from "react";
import CoffeeCard from "../../components/cards/CoffeeCard/CoffeeCard";
import CoffeeModal from "../../components/modals/CoffeeModal/CoffeeModal";
import MenuHeader from "../../components/features/Menu/MenuHeader/MenuHeader";
import { useProducts } from "../../context/ProductsContext";
import "./Menu.css";
import ProductSearchForm from "../../components/features/Menu/MenuHeader/ProductSearchForm";

const Menu = () => {
  const [showProductInfoModal, setShowProductInfoShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products } = useProducts();

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
        <div
          className="uk-grid-small uk-child-width-1-3@m uk-child-width-1-2@s uk-child-width-1-1@s menu-grid"
          data-uk-grid
          data-uk-height-match="target: > div > .uk-card"
          data-uk-scrollspy="cls: uk-animation-slide-left-medium; target: > div; delay: 150; repeat: true"
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
