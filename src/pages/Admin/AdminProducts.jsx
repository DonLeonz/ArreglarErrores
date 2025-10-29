import { useState } from "react";
import { useProducts } from "../../context/ProductsContext";
import CreateProductModal from "../../components/modals/CreationModals/CreateProductModal";

const AdminProducts = () => {
  const { products } = useProducts();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleModifyClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  return (
    <div className="uk-section first-child-adjustment uk-background-secondary uk-light uk-padding-small">
      <div className="uk-container uk-container-xlarge uk-padding-small">
        <h2 className="uk-heading-line uk-text-center">
          <span>Administrar Productos</span>
        </h2>

        <div
          className="uk-grid-small uk-child-width-1-3@m uk-child-width-1-2@s"
          data-uk-grid
          data-uk-height-match="target: > div > .uk-card"
        >
          {Array.isArray(products) &&
            products.map((item, index) => (
              <div key={index}>
                <div className="uk-card uk-card-default uk-card-hover uk-card-body uk-flex uk-flex-column uk-height-1-1">
                  <div className="uk-flex uk-flex-middle uk-flex-between uk-margin-small-bottom">
                    <h4 className="uk-card-title uk-margin-remove">{item.name}</h4>
                    <img
                      src={`/src/assets/img/menu/${item.image}`}
                      alt={item.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <p className="uk-text-small uk-margin-remove">
                    <strong>Categoría:</strong> {item.category?.name || "Sin categoría"}
                  </p>
                  <p className="uk-text-small uk-margin-remove">
                    <strong>Precio:</strong> ${item.price}
                  </p>
                  <p className="uk-text-small uk-margin-remove">
                    <strong>Stock:</strong> {item.stock}
                  </p>
                  <p className="uk-text-small uk-margin-remove">
                    <strong>Origen:</strong> {item.origin}
                  </p>

                  <button
                    className="uk-button uk-button-primary uk-margin-top"
                    onClick={() => handleModifyClick(item)}
                  >
                    Modificar
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {showModal && selectedProduct && (
        <CreateProductModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedProduct(null);
          }}
          mode="modify"
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default AdminProducts;