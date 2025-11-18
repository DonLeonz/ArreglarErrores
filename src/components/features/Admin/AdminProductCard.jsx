const AdminProductCard = ({ product, onModifyClick, onToggleStatus }) => {
  return (
    <div className="admin-product-card">
      <img
        src={`/src/assets/img/menu/${product.image}`}
        alt={product.name}
        className="admin-product-image"
      />
      <h4 className="admin-card-title">{product.name}</h4>
      <p className="admin-card-info">
        <strong>Categoría:</strong> {product.category?.name || "Sin categoría"}
      </p>
      <p className="admin-card-info">
        <strong>Precio:</strong> $ {product.price.toLocaleString("es-CO")}
      </p>
      <p className="admin-card-info">
        <strong>Stock:</strong> {product.stock}
      </p>
      <p className="admin-card-info">
        <strong>Origen:</strong> {product.origin}
      </p>

      <button
        className="btn-golden-primary uk-margin-top"
        onClick={() => onModifyClick(product)}
      >
        Modificar
      </button>
      <div className="uk-margin-small-top uk-width-1-1">
        <div className="admin-button-column">
          <button
            className={`${
              !product.enabled
                ? "admin-order-completed-btn"
                : "admin-order-cancelled-btn"
            }`}
            onClick={() => onToggleStatus(product._id, !product.enabled)}
          >
            {!product.enabled ? "Activar Producto" : "Desactivar Producto"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductCard;
