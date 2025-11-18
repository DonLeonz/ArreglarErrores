import { useState, useEffect } from "react";
import "../FormModal.css";
import { useAuth } from "../../../../context/AuthContext";
import { userSchema, loginSchema } from "../../../../schemas/user.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import PasswordInput from "../../../common/PasswordInput/PasswordInput";

const LoginModal = ({ isOpen, onClose, mode = "login" }) => {
  const [isRegistering, setIsRegistering] = useState(mode === "register");
  const { signIn, signUp, errors: authErrors, setErrors } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(isRegistering ? userSchema : loginSchema),
  });

  useEffect(() => {
    setIsRegistering(mode === "register");
  }, [mode]);

  useEffect(() => {
    setErrors([]);
  }, [isRegistering, setErrors]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFormSubmit = async (data) => {
    const { username, password, email, name } = data;

    try {
      let success = false;
      if (isRegistering) {
        success = await signUp({ username, password, email, name });
        if (success) {
          setIsRegistering(false);
          handleClose();
          navigate("confirm-email", {
            state: { email },
          });
        }
      } else {
        success = await signIn({ username, password });
        if (success) handleClose();
      }
      if (success) reset();
    } catch (err) {
      console.error("Auth Error:", err);
    }
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
          className="modal-close-golden"
          type="button"
          onClick={handleClose}
          aria-label="Cerrar"
        ></button>

        <h2 className="uk-modal-title">
          {isRegistering
            ? "Registrarse"
            : mode === "login"
            ? "Iniciar Sesión"
            : "Vuelve a Iniciar Sesión"}
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
            <PasswordInput
              className="login-modal-input"
              register={register}
              name="password"
              placeholder="Ingresa tu contraseña"
            />
            <button
              className="uk-button uk-button-link uk-margin-small-top"
              type="button"
              onClick={() => {
                handleClose();
                navigate("/password-recovery")
              }}
            >
              {"¿Olvidaste tu contraseña?"}{" "}
            </button>
            {errors.password?.message && (
              <p className="uk-text-danger">{errors.password.message}</p>
            )}
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
              {mode !== "refresh"
                ? isRegistering
                  ? "¿Ya tienes cuenta?"
                  : "¿No tienes cuenta? Regístrate"
                : ""}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
