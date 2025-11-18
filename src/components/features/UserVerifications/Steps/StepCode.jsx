import { useUsers } from "../../../../context/UsersContext";
import { showNotification } from "../../../../utils/notifications";

const StepCode = ({
  next,
  email,
  code,
  setCode,
  action,
  retry,
  errors,
  mode,
  setErrors,
  loading,
  setLoading,
}) => {
  const { confirmEmailRegister } = useUsers();

  const handleSubmit = async (e) => {
    setErrors([]);
    setLoading(true);
    e.preventDefault();
    const res = await action(email, code);
    if (res) {
      showNotification({
        message: `Código verificado con éxito`,
        status: "success",
      });
      if (mode === "confirm-email") {
        console.log(mode);
        confirmEmailRegister(email, code);
      }
      next();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="step-form">
      <h2>Verificación</h2>
      <p>
        Ingresa el código enviado a <strong>{email}</strong>.
      </p>

      <input
        type="text"
        className="uk-width-1-1"
        placeholder="Código"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      {errors &&
        errors.map((error) => (
          <p className="uk-text-danger uk-margin-remove-top">{error}</p>
        ))}

      {!loading ? (
        <div className="step-actions">
          <button className="btn-golden-primary" type="submit">
            Verificar Código
          </button>
          <button
            type="button"
            className="btn-golden-primary"
            onClick={() => {
              retry();
              showNotification({
                message: `Código enviado al correo ${email}.`,
                status: "success",
              });
              setErrors([]);
            }}
          >
            Enviar Código
          </button>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </form>
  );
};

export default StepCode;
