import "../cards.css";

const CoffeeCard = ({ item, index }) => {
  return (
    <div className="uk-card uk-card-default uk-card-hover uk-flex uk-flex-column uk-height-1-1 menu-product-card">
      <div
        className="uk-flex uk-flex-middle uk-flex-wrap uk-child-width-expand@m uk-grid-small"
        data-uk-grid
      >
        <div className="uk-flex uk-flex-center uk-width-1-3@s uk-width-1-4@m">
          <div className="uk-border-circle uk-overflow-hidden menu-product-image-container">
            <img
              src={item.img}
              alt={item.title}
              className="uk-cover menu-product-image"
            />
          </div>
        </div>
        <div className="menu-product-info">
          <div className="uk-flex uk-flex-between uk-flex-middle">
            <h3 className="uk-card-title uk-margin-remove-bottom menu-product-title">
              {item.title}
            </h3>
            <span className="uk-label menu-product-price">{item.price}</span>
          </div>
          <div className="uk-margin-small-top">
            <span className="uk-badge menu-product-origin">{item.origin}</span>
            {item.isPopular && (
              <span className="uk-badge menu-product-bestseller">
                ★ Bestseller
              </span>
            )}
          </div>
          <p className="uk-margin-small-top menu-product-description">
            {item.description}
          </p>
        </div>
      </div>
      <div className="uk-text-center uk-padding-small">
        <button
          className="uk-button uk-button-default menu-details-button"
          data-uk-toggle={`target: #modal-${index}`}
        >
          Ver más detalles
        </button>
      </div>
    </div>
  );
};

export default CoffeeCard;
