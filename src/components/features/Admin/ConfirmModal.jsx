const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="uk-modal uk-open uk-flex uk-flex-center uk-flex-middle" style={{ display: "flex" }}>
      <div className="uk-modal-dialog uk-modal-body admin-confirm-modal-width">
        <h3 className="uk-modal-title admin-modal-title-centered">
          Confirmar Acción
        </h3>
        <p className="admin-confirm-message">{message}</p>
        <div className="uk-flex uk-flex-between">
          <button
            className="uk-button uk-button-default admin-confirm-btn-left"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className="uk-button uk-button-primary admin-confirm-btn-right"
            onClick={onConfirm}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
