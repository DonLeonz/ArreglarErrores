import React, { useState, useEffect } from "react";
import "../assets/styles/pages/blog.css";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Manejar el estado del body cuando el modal está abierto
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
    // Limpiar campos
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

  return (
    <div className="uk-modal uk-open blog-login-display">
      <div
        className="uk-modal-dialog uk-modal-body blog-login-container blog-modal-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="uk-modal-close-default color-text-black blog-modal-close"
          type="button"
          uk-close="true"
          onClick={handleClose}
          aria-label="Close"
        ></button>

        <h2 className="uk-modal-title color-text-black">
          {isRegistering ? "Registrarse" : "Iniciar Sesión"}
        </h2>

        <div className="uk-form-stacked">
          <div className="uk-margin">
            <label className="uk-form-label color-text-black">Usuario</label>
            <input
              className="uk-input blog-login-input"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(e);
                }
              }}
            />
          </div>
          <div className="uk-margin">
            <label className="uk-form-label color-text-black">Contraseña</label>
            <input
              className="uk-input blog-login-input"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(e);
                }
              }}
            />
          </div>

          <div className="uk-flex uk-flex-between">
            <button
              className="uk-button uk-button-primary blog-container-round"
              type="button"
              onClick={handleSubmit}
            >
              {isRegistering ? "Registrarse" : "Iniciar Sesión"}
            </button>
            <button
              className="uk-button uk-button-link color-text-black"
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}
            </button>
          </div>
        </div>
      </div>
      {/* Overlay oscuro detrás del modal */}
      <div
        className="uk-modal-overlay uk-modal-overlay-default"
        onClick={handleClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1000,
        }}
      />
    </div>
  );
};

export default LoginModal;
