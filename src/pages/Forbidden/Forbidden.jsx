import { useNavigate } from "react-router";
import "./Forbidden.css";

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="error-page-container first-child-adjustment">
      <div className="error-content">
        <div className="error-icon-container">
          <span className="error-icon" data-uk-icon="icon: ban; ratio: 5"></span>
        </div>

        <h1 className="error-code">403</h1>
        <h2 className="error-title">Acceso Prohibido</h2>
        <p className="error-message">
          No tienes los permisos necesarios para acceder a esta página.
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

export default Forbidden;
