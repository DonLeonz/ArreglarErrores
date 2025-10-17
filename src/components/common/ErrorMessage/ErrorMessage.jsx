const ErrorMessage = ({ children }) => (
  <div
    className="uk-alert-danger uk-text-center uk-margin"
    data-uk-alert="true"
  >
    {children}
  </div>
);

export default ErrorMessage;
