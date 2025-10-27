import { useOrders } from "../../../context/OrdersContext";
import "../cards.css";

const CoffeeCard = ({ item, onViewDetails }) => {
  const { addToCart } = useOrders();

  const handleAddToCart = () => {
    // Validación básica de seguridad
    if (!item.stock || item.stock <= 0) {
      window.UIkit.notification({
        message: "Producto sin stock disponible 😢",
        status: "warning",
        pos: "top-center",
      });
      return;
    }

    addToCart(item, 1); // 👈 agregamos 1 por defecto
    window.UIkit.notification({
      message: `<span uk-icon="icon: check"></span> ${item.name} añadido al carrito`,
      status: "success",
      pos: "top-center",
    });
  };

  return (
    <div className="uk-card uk-card-default uk-card-hover uk-flex uk-flex-column uk-height-1-1 menu-product-card">
      <div
        className="uk-flex uk-flex-middle uk-flex-wrap uk-child-width-expand@m uk-grid-small"
        data-uk-grid
      >
        {/* Imagen */}
        <div className="uk-flex uk-flex-center uk-width-1-3@s uk-width-1-4@m">
          <div className="uk-border-circle uk-overflow-hidden menu-product-image-container">
            <img
              src={item.img || `/src/assets/img/menu/${item.image}`}
              alt={item.title || item.name}
              className="uk-cover menu-product-image"
            />
          </div>
        </div>

        {/* Info */}
        <div className="menu-product-info">
          <div className="uk-flex uk-flex-between uk-flex-middle">
            <h3 className="uk-card-title uk-margin-remove-bottom menu-product-title">
              {item.title || item.name}
            </h3>
            <span className="uk-label menu-product-price">
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
              }).format(item.price)}
            </span>
          </div>
          <div className="uk-margin-small-top">
            <span className="uk-badge menu-product-origin">{item.origin}</span>
            {item.isPopular && (
              <span className="uk-badge menu-product-bestseller">
                ★ Bestseller
              </span>
            )}
            {item.category && (
              <span className="uk-badge menu-product-bestseller">
                ★ {item.category.name}
              </span>
            )}
          </div>
          <p className="uk-margin-small-top menu-product-description">
            {item.description}
          </p>
        </div>
      </div>

      {/* Botón Ver Más */}
      <div className="uk-text-center uk-padding-small">
        <button
          className="uk-button uk-button-default menu-details-button"
          onClick={onViewDetails}
        >
          Ver más detalles
        </button>
      <button
        className="uk-button uk-button-default menu-details-button"
        onClick={handleAddToCart}
      >
        Añadir al carrito
      </button>
      </div>
    </div>
  );
};

export default CoffeeCard;
