import { useMemo } from "react";
import RecommendedCard from "../../components/cards/RecommendedCard/RecommendedCard";
import "./Recomendado.css";
import { useProducts } from "../../context/ProductsContext";

const Recomendado = () => {
  const { products } = useProducts();

  const productoRecomendado = useMemo(() => {
    if (!products || products.length === 0) return null;

    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return products[dayOfYear % products.length];
  }, [products]);

  if (!productoRecomendado) {
    return (
      <div className="first-child-adjustment uk-section uk-background-secondary uk-light uk-padding-small">
        <div className="uk-container uk-container-xlarge uk-light uk-background-secondary recomendado-container">
          <p className="uk-text-center">Cargando producto recomendado...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="first-child-adjustment uk-section uk-background-secondary uk-light uk-padding-small">
      <div className="uk-container uk-container-xlarge uk-light uk-background-secondary recomendado-container">
        <h1
          className="uk-heading-line uk-text-center"
          data-uk-scrollspy="cls: uk-animation-slide-top-medium; delay: 100"
        >
          <span className="recomendado-title">
            ☕ Descubre el Sabor del Día
          </span>
        </h1>
        <div data-uk-scrollspy="cls: uk-animation-scale-up; delay: 200; repeat: true">
          <RecommendedCard
            product={productoRecomendado}
          />
        </div>
      </div>
    </div>
  );
};

export default Recomendado;
