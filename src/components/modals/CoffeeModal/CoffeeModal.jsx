import { useEffect } from "react";
import "./CoffeeModal.css";
import "../modals.css";

const CoffeeModal = ({ isOpen, onClose, item }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  if (!item) return null;

  console.log(item);

  const handleClose = () => onClose();

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  return (
    <div
      className={`uk-modal-container uk-modal login-modal-display ${
        isOpen ? "uk-open visible" : "hidden"
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className="uk-modal-dialog uk-modal-body uk-light coffee-modal-body"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="uk-modal-close-default coffee-modal-close"
          type="button"
          onClick={handleClose}
        ></button>

        <div className="uk-grid-collapse" data-uk-grid>
          <div className="uk-width-1-3@m uk-width-1-1@s uk-text-center">
            <div className="uk-padding uk-flex uk-flex-center">
              <div className="uk-border-circle uk-overflow-hidden coffee-modal-image-container">
                <img
                  src={item.img || (item.image ? `/src/assets/img/menu/${item.image}` : "/src/assets/img/coffe-image-1.jpg")}
                  alt={item.title || item.name}
                  className="uk-cover coffee-modal-image"
                />
              </div>
            </div>
                <div>
                  <span className="uk-label coffee-modal-label">
                    Origen: {item.origin}
                  </span>
                </div>
          </div>

          <div className="uk-width-2-3@m uk-width-1-1@s uk-padding-large">
            <h2 className="uk-modal-title coffee-modal-title">
              {item.title || item.name}
            </h2>

            <div className="uk-margin-medium-top">
              <h3 className="coffee-modal-section-title">Ingredientes:</h3>
              <ul className="uk-list coffee-modal-list">
                {item.ingredients.length > 0 ? (item.ingredients).map((ing, i) => (
                  <li key={i}>{ing}</li>
                )) : (<li key={1}>No se han registrado Ingredientes</li>)}
              </ul>
            </div>

            <div className="uk-margin-medium-top">
              <h3 className="coffee-modal-section-title">{item.preparation ? "Preparación:" : "Recomendación"}</h3>
              <p className="coffee-modal-text">
                {item.preparation || item.recommendations}
              </p>
            </div>

            <div className="uk-margin-medium-top">
              <div className="uk-grid-small" data-uk-grid>
                <div>
                  <span className="uk-label coffee-modal-label">
                    Tostado: {item.roastLevel || item.roast_level}
                  </span>
                </div>
                <div>
                  <span className="uk-label coffee-modal-label">
                    {item.flavorProfile ? "Sabor: " + item.flavorProfile : ""}
                    {item.category ? "Categoría: " + item.category.name : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeModal;
