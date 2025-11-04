import { useState, useMemo } from "react";
import coffeeItems from "../../data/coffeeItems";
import RecommendedCard from "../../components/cards/RecommendedCard/RecommendedCard";
import "./Recomendado.css";

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

  return (
    <div className="first-child-adjustment uk-section uk-background-secondary uk-light uk-padding-small">
      <div className="uk-container uk-container-xlarge uk-light uk-background-secondary recomendado-container">
        <h1
          className="uk-heading-line uk-text-center"
          data-uk-scrollspy="cls: uk-animation-fade; delay: 100"
        >
          <span className="recomendado-title">
            ☕ Descubre el Sabor del Día
          </span>
        </h1>
        <div data-uk-scrollspy="cls: uk-animation-scale-up; delay: 200">
          <RecommendedCard
            product={productoRecomendado}
            imageError={imageError}
            onImageError={() => setImageError(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default Recomendado;
