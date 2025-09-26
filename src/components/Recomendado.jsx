import React, { useEffect, useState, useMemo } from "react";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import coffeeItems from "../data/coffeeItems";
import "../assets/styles/pages/recomendado.css";

const Recomendado = () => {
  const [imageError, setImageError] = useState(false);

  const productoRecomendado = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return coffeeItems[dayOfYear % coffeeItems.length];
  }, []);

  const handleImageError = () => setImageError(true);

  return (
    <div className="first-child-adjustment uk-section uk-background-secondary uk-light uk-padding-small">
      <div className="uk-container uk-container-xlarge uk-light uk-background-secondary recomendado-container">
        {/* TÍTULO */}
        <h1 className="uk-heading-line uk-text-center">
          <span className="recomendado-title">
            ☕ Descubre el Sabor del Día
          </span>
        </h1>

        <div
          className="uk-card uk-card-default uk-card-hover uk-grid-collapse uk-child-width-1-1@s uk-child-width-1-2@m recomendado-card"
          data-uk-grid
        >
          {/* Imagen*/}
          <div className="uk-flex uk-flex-center uk-flex-middle uk-padding">
            <img
              src={
                imageError ? "/default-coffee.jpg" : productoRecomendado?.img
              }
              alt={productoRecomendado?.title || "Recomendación del día"}
              onError={handleImageError}
              className="recomendado-image"
            />
          </div>

          {/* Contenido */}
          <div className="uk-padding uk-flex uk-flex-column uk-flex-between">
            <div>
              <h3 className="uk-card-title recomendado-product-title">
                {productoRecomendado?.title || "Cargando recomendación..."}
              </h3>

              <div className="uk-margin-small">
                <span className="uk-label recomendado-price">
                  {productoRecomendado?.price || "$ --"}
                </span>

                {productoRecomendado?.isPopular && (
                  <span className="uk-label uk-margin-small-left recomendado-popular">
                    Más Popular
                  </span>
                )}
              </div>

              <p className="recomendado-description">
                {productoRecomendado?.description ||
                  "Seleccionando nuestra mejor recomendación para ti..."}
              </p>

              <div className="uk-margin-small">
                <strong className="recomendado-info-label">Categoría:</strong>{" "}
                <span className="recomendado-info-value">
                  {productoRecomendado?.category || "Café de especialidad"}
                </span>
              </div>
              <div className="uk-margin-small">
                <strong className="recomendado-info-label">Intensidad:</strong>{" "}
                <span className="recomendado-info-value">
                  {productoRecomendado?.intensity || "Media-Alta"}
                </span>
              </div>
              <div className="uk-margin-small">
                <strong className="recomendado-info-label">
                  Tipo de grano:
                </strong>{" "}
                <span className="recomendado-info-value">
                  {productoRecomendado?.beanType || "Arábica"}
                </span>
              </div>
              <div className="uk-margin-small">
                <strong className="recomendado-info-label">Proceso:</strong>{" "}
                <span className="recomendado-info-value">
                  {productoRecomendado?.process || "Lavado"}
                </span>
              </div>

              <div className="uk-margin-small">
                <span className="uk-badge recomendado-origin-badge">
                  Origen: {productoRecomendado?.origin || "Colombia"}
                </span>
              </div>
            </div>

            {productoRecomendado?.recommendation && (
              <div className="uk-margin-top">
                <p className="recomendado-special">
                  {productoRecomendado.recommendation}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recomendado;
