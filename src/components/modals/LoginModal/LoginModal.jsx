import { useState, useEffect } from "react";
import "./LoginModal.css";
import { useAuth } from "../../../context/AuthContext";
import { userSchema } from "../../../schemas/user.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginModal = ({ isOpen, onClose, mode = "login" }) => {
  const [isRegistering, setIsRegistering] = useState(mode === "register");

  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema)
  });

  const { signIn, signUp, errors: authErrors } = useAuth();

  useEffect(() => {
    setIsRegistering(mode === "register");
  }, [mode]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { username, password, email, name } = user;

    if (isRegistering) {
      const success = await signUp({ username, password, email, name });
      if (success) {
        setIsRegistering(false);
      }
    } else {
      const success = await signIn({ username, password });
      if (success) {
        handleClose();
      }
    }

    setUser({
      username: "",
      password: "",
      email: "",
      name: "",
    });
  };

  const handleClose = () => {
    setUser({
      username: "",
      password: "",
      email: "",
      name: "",
    });
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

        <form className="uk-form-stacked" onSubmit={handleSubmit(handleFormSubmit)}>
          {isRegistering && (
            <>
              <div className="uk-margin">
                <label className="uk-form-label">Nombre completo</label>
                <input
                  className="uk-input login-modal-input"
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                />
              </div>

              <div className="uk-margin">
                <label className="uk-form-label">Correo electrónico</label>
                <input
                  className="uk-input login-modal-input"
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Tu correo"
                />
              </div>
            </>
          )}

          <div className="uk-margin">
            <label className="uk-form-label">Usuario</label>
            <input
              className="uk-input login-modal-input"
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="Ingresa tu usuario"
              required
            />
            {errors.username?.message && (
              <p className="uk-text-danger">{errors.username.message}</p>
            )}
          </div>

          <div className="uk-margin">
            <label className="uk-form-label">Contraseña</label>
            <input
              className="uk-input login-modal-input"
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          {authErrors?.length > 0 && (
            <div className="uk-text-danger uk-margin-small-bottom">
              {authErrors.map((err, idx) => (
                <div key={idx}>{err}</div>
              ))}
            </div>
          )}

          <div className="uk-flex uk-flex-between uk-flex-middle">
            <button className="uk-button uk-button-primary" type="submit">
              {isRegistering ? "Registrarse" : "Iniciar Sesión"}
            </button>

            <button
              className="uk-button uk-button-link"
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering
                ? "¿Ya tienes cuenta?"
                : "¿No tienes cuenta? Regístrate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
