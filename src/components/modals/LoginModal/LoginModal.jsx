import { useState, useEffect } from "react";
import "./LoginModal.css";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) return;
    onLogin(username);
    setUsername("");
    setPassword("");
    setIsRegistering(false);
  };

  const handleClose = () => {
    setUsername("");
    setPassword("");
    setIsRegistering(false);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  return (
    <div
      className="uk-modal uk-open login-modal-display"
      onClick={handleBackdropClick}
    >
      <div
        className="uk-modal-dialog uk-modal-body login-modal-container login-modal-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="login-modal-close"
          type="button"
          onClick={handleClose}
          aria-label="Cerrar"
        ></button>

        <h2 className="uk-modal-title">
          {isRegistering ? "Registrarse" : "Iniciar Sesión"}
        </h2>
        <div className="uk-form-stacked">
          <div className="uk-margin">
            <label className="uk-form-label">Usuario</label>
            <input
              className="uk-input login-modal-input"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSubmit(e);
              }}
              placeholder="Ingresa tu usuario"
            />
          </div>
          <div className="uk-margin">
            <label className="uk-form-label">Contraseña</label>
            <input
              className="uk-input login-modal-input"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSubmit(e);
              }}
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <div className="uk-flex uk-flex-between uk-flex-middle">
            <button
              className="uk-button uk-button-primary"
              type="button"
              onClick={handleSubmit}
            >
              {isRegistering ? "Registrarse" : "Iniciar Sesión"}
            </button>
            <button
              className="uk-button uk-button-link"
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
