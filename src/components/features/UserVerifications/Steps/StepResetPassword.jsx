import { useState } from "react";
import PasswordInput from "../../../common/PasswordInput/PasswordInput";

/**
 * Componente para el paso de reseteo de contraseña
 * Aplica validación de regex: 7-30 caracteres, mayúsculas, minúsculas, número y símbolo
 */
const StepResetPasswod = ({
  next,
  email,
  code,
  action,
  errors,
  setErrors,
  loading,
  setLoading,
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /**
   * Regex de validación de contraseña del sistema de login
   * Debe tener: 7-30 caracteres, al menos una mayúscula, una minúscula, un número y un símbolo
   */
  const passwordRegex = /^(?=.*\d+)(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[^a-zA-Z\d]+)[\w\d\W]{7,30}$/;

  const handleSubmit = async (e) => {
    setErrors([]);
    setLoading(true);
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
      setErrors(["Las contraseñas no coinciden"]);
      setLoading(false);
      return;
    }

    // Validar el formato de la contraseña
    if (!passwordRegex.test(newPassword)) {
      setErrors([
        "La contraseña debe tener entre 7 y 30 caracteres, incluir mayúsculas, minúsculas, un número y un símbolo."
      ]);
      setLoading(false);
      return;
    }

    // Si todas las validaciones pasan, proceder con el cambio
    const res = await action(email, code, newPassword);
    if (res) {
      if (window.UIkit) {
        window.UIkit.notification({
          message: `Contraseña actualizada con éxito`,
          status: "success",
          pos: "top-center",
        });
      }
      next();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="step-form">
      <h2>Crear Nueva Contraseña</h2>
      <p>
        Ingresa el código enviado a <strong>{email}</strong>.
      </p>

      <PasswordInput
        className="uk-width-1-1"
        placeholder="Nueva contraseña"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />

      <PasswordInput
        className="uk-width-1-1"
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
        {errors.map((error) => (
          <p className="uk-text-danger uk-margin-remove-top">{error}</p>
        ))}
      {!loading ? (
        <button className="uk-width-1-1 btn-golden-primary" type="submit">
          Actualizar Contraseña
        </button>
      ) : (
        <p>Cargando...</p>
      )}
    </form>
  );
};

export default StepResetPasswod;
