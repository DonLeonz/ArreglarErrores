import "./CoffeeModal.css";
import "../modals.css";

const CoffeeModal = ({ item, index }) => {
  return (
    <div
      id={`modal-${index}`}
      className="uk-modal-container uk-modal"
      data-uk-modal
    >
      <div className="uk-modal-dialog uk-modal-body uk-light coffee-modal-body">
        <button
          className="uk-modal-close-default coffee-modal-close"
          type="button"
          data-uk-close
        ></button>
        <div className="uk-grid-collapse" data-uk-grid>
          <div className="uk-width-1-3@m uk-width-1-1@s">
            <div className="uk-padding uk-flex uk-flex-center">
              <div className="uk-border-circle uk-overflow-hidden coffee-modal-image-container">
                <img
                  src={item.img}
                  alt={item.title}
                  className="uk-cover coffee-modal-image"
                />
              </div>
            </div>
          </div>
          <div className="uk-width-2-3@m uk-width-1-1@s uk-padding-large">
            <h2 className="uk-modal-title coffee-modal-title">{item.title}</h2>
            <div className="uk-margin-medium-top">
              <h3 className="coffee-modal-section-title">Ingredientes:</h3>
              <ul className="uk-list uk-list-bullet coffee-modal-list">
                {(item.ingredients || []).map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>
            <div className="uk-margin-medium-top">
              <h3 className="coffee-modal-section-title">Preparación:</h3>
              <p className="coffee-modal-text">
                {item.preparation || "Información no disponible."}
              </p>
            </div>
            <div className="uk-margin-medium-top">
              <div className="uk-grid-small" data-uk-grid>
                <div>
                  <span className="uk-label coffee-modal-label">
                    Tostado: {item.roastLevel}
                  </span>
                </div>
                <div>
                  <span className="uk-label coffee-modal-label">
                    Sabor: {item.flavorProfile}
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
