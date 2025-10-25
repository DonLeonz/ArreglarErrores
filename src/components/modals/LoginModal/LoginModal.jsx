import { useState, useEffect } from "react";
import "./LoginModal.css";
import { useAuth } from "../../../context/AuthContext";
import { userSchema } from "../../../schemas/user.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginModal = ({ isOpen, onClose, mode = "login" }) => {
  const [isRegistering, setIsRegistering] = useState(mode === "register");
  const { signIn, signUp, errors: authErrors } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    setIsRegistering(mode === "register");
  }, [mode]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFormSubmit = async (data) => {

    const { username, password, email, name } = data;

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

    reset();
  };

  const handleClose = () => {
    reset();
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

        <form
          className="uk-form-stacked"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          {isRegistering && (
            <>
              <div className="uk-margin">
                <label className="uk-form-label">Nombre completo</label>
                <input
                  className="uk-input login-modal-input"
                  type="text"
                  {...register("name")}
                  placeholder="Tu nombre"
                />
                {errors.name && (
                  <p className="uk-text-danger">{errors.name.message}</p>
                )}
              </div>

              <div className="uk-margin">
                <label className="uk-form-label">Correo electrónico</label>
                <input
                  className="uk-input login-modal-input"
                  type="email"
                  {...register("email")}
                  placeholder="Tu correo"
                />
                {errors.email?.message && (
                  <p className="uk-text-danger">{errors.email.message}</p>
                )}
              </div>
            </>
          )}

          <div className="uk-margin">
            <label className="uk-form-label">Usuario</label>
            <input
              className="uk-input login-modal-input"
              type="text"
              {...register("username")}
              placeholder="Ingresa tu usuario"
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
              {...register("password")}
              placeholder="Ingresa tu contraseña"
            />
            {errors.password?.message && (
              <p className="uk-text-danger">{errors.password.message}</p>
            )}
          </div>

          {/* Errores del backend */}
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
