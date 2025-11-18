import { useState } from "react";
import "./PasswordInput.css";

/**
 * Componente de input de contraseña con toggle de visibilidad
 */
const PasswordInput = ({ className = "", placeholder = "Contraseña", register, name, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-input-container">
      <input
        className={`uk-input ${className}`}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        {...(register ? register(name) : {})}
        {...props}
      />
      <button
        type="button"
        className="password-toggle-btn"
        onClick={toggleVisibility}
        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
      >
        <span
          data-uk-icon={`icon: ${showPassword ? "eye-slash" : "eye"}; ratio: 1.2`}
        ></span>
      </button>
    </div>
  );
};

export default PasswordInput;
