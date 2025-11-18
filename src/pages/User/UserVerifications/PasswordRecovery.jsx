import { useState } from "react";
import StepEmail from "../../../components/features/UserVerifications/Steps/StepEmail";
import Breadcrumb from "../../../components/features/UserVerifications/Breadcrumb/Breadcrumb";
import "./UserVerifications.css";
import { useUsers } from "../../../context/UsersContext";
import StepCode from "../../../components/features/UserVerifications/Steps/StepCode";
import StepResetPasswod from "../../../components/features/UserVerifications/Steps/StepResetPassword";
import StepSuccess from "../../../components/features/UserVerifications/Steps/StepSuccess";

const PasswordRecovery = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { errors, setErrors, requestUserCode, verifyUserCode, resetPassword } =
    useUsers();

  const next = () => setStep((old) => old + 1);

  return (
    <div className="uk-section uk-background-secondary uk-light uk-padding-small recovery-page recovery-page-section">
      <div className="uk-container uk-container-small">
        <h2 className="uk-heading-line uk-text-center recovery-page-heading">
          <span>Recuperar Contraseña</span>
        </h2>
        <div className="recovery-card">
          {step !== 3 && <Breadcrumb current={step} />}

          {step === 0 && (
            <StepEmail
              next={next}
              setEmail={setEmail}
              action={(email) => requestUserCode(email)}
              errors={errors}
              setErrors={setErrors}
              loading={loading}
              setLoading={setLoading}
            />
          )}
          {step === 1 && (
            <StepCode
              next={next}
              email={email}
              code={code}
              setCode={setCode}
              action={(email, code) => verifyUserCode(email, code)}
              retry={() => requestUserCode(email)}
              errors={errors}
              setErrors={setErrors}
              loading={loading}
              setLoading={setLoading}
            />
          )}
          {step === 2 && (
            <StepResetPasswod
              next={next}
              email={email}
              code={code}
              action={(email, code, newPassword) =>
                resetPassword(email, code, newPassword)
              }
              errors={errors}
              setErrors={setErrors}
              loading={loading}
              setLoading={setLoading}
            />
          )}
          {step === 3 && <StepSuccess />}
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;
