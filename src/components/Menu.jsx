import "uikit/dist/css/uikit.min.css";
import coffeeItems from "../data/coffeeItems";
import "../assets/styles/pages/menu.css";
import "../assets/styles/components/common.css";

const Menu = () => {
  return (
    <div className="first-child-adjustment uk-section uk-background-secondary uk-light uk-padding-small menu-section">
      <div className="uk-container uk-container-xlarge uk-padding-small uk-light">
        {/* Encabezado */}
        <div className="uk-text-center uk-margin-large-bottom">
          <h2 className="uk-heading-small uk-text-uppercase menu-header-title">
            <span className="uk-display-inline-block uk-padding-small menu-header-underline">
              Nuestro Menú
            </span>
          </h2>
          <p className="uk-text-lead menu-header-subtitle">
            Descubre la excelencia en cada taza
          </p>
        </div>

        {/* Grid de productos */}
        <div
          className="uk-grid-small uk-child-width-1-3@m uk-child-width-1-2@s uk-child-width-1-1@s menu-grid"
          data-uk-grid
          data-uk-height-match="target: > div > .uk-card"
        >
          {Array.isArray(coffeeItems) &&
            coffeeItems.map((item, index) => (
              <div key={index}>
                {/* Card del producto */}
                <div className="uk-card uk-card-default uk-card-hover uk-flex uk-flex-column uk-height-1-1 menu-product-card">
                  <div
                    className="uk-flex uk-flex-middle uk-flex-wrap uk-child-width-expand@m uk-grid-small"
                    data-uk-grid
                  >
                    {/* Imagen */}
                    <div className="uk-flex uk-flex-center uk-width-1-3@s uk-width-1-4@m">
                      <div className="uk-border-circle uk-overflow-hidden menu-product-image-container">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="uk-cover menu-product-image"
                        />
                      </div>
                    </div>

                    {/* Información básica */}
                    <div className="menu-product-info">
                      <div className="uk-flex uk-flex-between uk-flex-middle">
                        <h3 className="uk-card-title uk-margin-remove-bottom menu-product-title">
                          {item.title}
                        </h3>
                        <span className="uk-label menu-product-price">
                          {item.price}
                        </span>
                      </div>

                      <div className="uk-margin-small-top">
                        <span className="uk-badge menu-product-origin">
                          {item.origin}
                        </span>
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

                  {/* Botón para abrir modal */}
                  <div className="uk-text-center uk-padding-small">
                    <button
                      className="uk-button uk-button-default menu-details-button"
                      data-uk-toggle={`target: #modal-${index}`}
                    >
                      Ver más detalles
                    </button>
                  </div>
                </div>

                {/* Modal para este producto */}
                <div
                  id={`modal-${index}`}
                  className="uk-modal-container uk-modal"
                  data-uk-modal
                >
                  <div className="uk-modal-dialog uk-modal-body uk-light menu-modal-body">
                    <button
                      className="uk-modal-close-default menu-modal-close"
                      type="button"
                      data-uk-close
                    ></button>

                    <div className="uk-grid-collapse" data-uk-grid>
                      {/* Columna de imagen en modal */}
                      <div className="uk-width-1-3@m uk-width-1-1@s">
                        <div className="uk-padding uk-flex uk-flex-center">
                          <div className="uk-border-circle uk-overflow-hidden menu-modal-image-container">
                            <img
                              src={item.img}
                              alt={item.title}
                              className="uk-cover menu-modal-image"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Columna de contenido en modal */}
                      <div className="uk-width-2-3@m uk-width-1-1@s uk-padding-large">
                        <h2 className="uk-modal-title menu-modal-title">
                          {item.title}
                        </h2>

                        <div className="uk-margin-medium-top">
                          <h3 className="menu-modal-section-title">
                            Ingredientes:
                          </h3>
                          <ul className="uk-list uk-list-bullet menu-modal-list">
                            {(item.ingredients || []).map((ing, i) => (
                              <li key={i}>{ing}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="uk-margin-medium-top">
                          <h3 className="menu-modal-section-title">
                            Preparación:
                          </h3>
                          <p className="menu-modal-text">
                            {item.preparation || "Información no disponible."}
                          </p>
                        </div>

                        <div className="uk-margin-medium-top">
                          <div className="uk-grid-small" data-uk-grid>
                            <div>
                              <span className="uk-label menu-modal-label">
                                Tostado: {item.roastLevel}
                              </span>
                            </div>
                            <div>
                              <span className="uk-label menu-modal-label">
                                Sabor: {item.flavorProfile}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
