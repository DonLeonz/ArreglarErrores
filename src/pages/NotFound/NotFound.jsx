import { useNavigate } from "react-router";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="error-page-container first-child-adjustment">
      <div className="error-content">
        <div className="error-icon-container">
          <span className="error-icon" data-uk-icon="icon: question; ratio: 5"></span>
        </div>

        <h1 className="error-code">404</h1>
        <h2 className="error-title">Página No Encontrada</h2>
        <p className="error-message">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>

        <div className="error-actions">
          <button
            className="uk-button btn-golden-primary error-button"
            onClick={() => navigate("/", { replace: true })}
          >
            <span data-uk-icon="icon: home" className="uk-margin-small-right"></span>
            Ir al Inicio
          </button>
          <button
            className="uk-button btn-coffee-secondary error-button"
            onClick={() => navigate(-1)}
          >
            <span data-uk-icon="icon: arrow-left" className="uk-margin-small-right"></span>
            Volver Atrás
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
