import "./ImageModal.css";

/**
 * Componente reutilizable para mostrar imágenes en un modal ampliable
 */
const ImageModal = ({ imageUrl, alt, modalId }) => {
  const handleImageClick = (e) => {
    e.stopPropagation();
    const modalElement = document.getElementById(modalId);
    const modal = window.UIkit?.modal(modalElement);

    if (modal && !modalElement.classList.contains("uk-open")) {
      modal.show();
    }
  };

  return (
    <>
      <div className="image-modal-container" onClick={handleImageClick}>
        <img src={imageUrl} alt={alt} />
        <div className="image-modal-overlay">
          <span data-uk-icon="icon: eye; ratio: 2.5"></span>
        </div>
      </div>

      <div
        id={modalId}
        className="uk-modal uk-flex-top"
        data-uk-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="uk-modal-dialog uk-width-auto uk-margin-auto-vertical image-modal-dialog"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="modal-close-golden"
            type="button"
            data-uk-toggle={`target: #${modalId}`}
            aria-label="Cerrar"
          />
          <img src={imageUrl} alt={alt} className="image-modal-full" />
        </div>
      </div>
    </>
  );
};

export default ImageModal;
