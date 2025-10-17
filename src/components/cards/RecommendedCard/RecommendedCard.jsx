import "../cards.css";

const RecommendedCard = ({ product, imageError, onImageError }) => {
  return (
    <div
      className="uk-card uk-card-default uk-card-hover uk-grid-collapse uk-child-width-1-1@s uk-child-width-1-2@m recomendado-card"
      data-uk-grid
    >
      <div className="uk-flex uk-flex-center uk-flex-middle uk-padding">
        <img
          src={imageError ? "/default-coffee.jpg" : product?.img}
          alt={product?.title || "Recomendación del día"}
          onError={onImageError}
          className="recomendado-image"
        />
      </div>
      <div className="uk-padding uk-flex uk-flex-column uk-flex-between">
        <div>
          <h3 className="uk-card-title recomendado-product-title">
            {product?.title || "Cargando recomendación..."}
          </h3>
          <div className="uk-margin-small">
            <span className="uk-label recomendado-price">
              {product?.price || "$ --"}
            </span>
            {product?.isPopular && (
              <span className="uk-label uk-margin-small-left recomendado-popular">
                Más Popular
              </span>
            )}
          </div>
          <p className="recomendado-description">
            {product?.description ||
              "Seleccionando nuestra mejor recomendación para ti..."}
          </p>
          <div className="uk-margin-small">
            <strong className="recomendado-info-label">Categoría:</strong>{" "}
            <span className="recomendado-info-value">
              {product?.category || "Café de especialidad"}
            </span>
          </div>
          <div className="uk-margin-small">
            <strong className="recomendado-info-label">Intensidad:</strong>{" "}
            <span className="recomendado-info-value">
              {product?.intensity || "Media-Alta"}
            </span>
          </div>
          <div className="uk-margin-small">
            <strong className="recomendado-info-label">Tipo de grano:</strong>{" "}
            <span className="recomendado-info-value">
              {product?.beanType || "Arábica"}
            </span>
          </div>
          <div className="uk-margin-small">
            <strong className="recomendado-info-label">Proceso:</strong>{" "}
            <span className="recomendado-info-value">
              {product?.process || "Lavado"}
            </span>
          </div>
          <div className="uk-margin-small">
            <span className="uk-badge recomendado-origin-badge">
              Origen: {product?.origin || "Colombia"}
            </span>
          </div>
        </div>
        {product?.recommendation && (
          <div className="uk-margin-top">
            <p className="recomendado-special">{product.recommendation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendedCard;
