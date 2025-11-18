import "./ImageModal.css";

const ImageModal = ({
  imageUrl,
  alt,
  modalId,
  containerClassName = "",
  imageClassName = "",
  containerStyle = {}
}) => {
  const handleImageClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setTimeout(() => {
      const modalElement = document.getElementById(modalId);
      const modal = window.UIkit?.modal(modalElement);

      if (modal && !modalElement.classList.contains("uk-open")) {
        modal.show();
      }
    }, 10);
  };

  const handleClose = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const modalElement = document.getElementById(modalId);
    if (modalElement && window.UIkit) {
      try {
        window.UIkit.modal(modalElement).hide();
      } catch (error) {
        console.error('Error closing modal:', error);
      }
    }
  };

  return (
    <>
      <div
        className={`image-modal-container ${containerClassName}`}
        onClick={handleImageClick}
        style={containerStyle}
      >
        <img src={imageUrl} alt={alt} className={imageClassName} />
        <div className="image-modal-overlay">
          <span data-uk-icon="icon: eye; ratio: 2.5"></span>
        </div>
      </div>

      <div
        id={modalId}
        className="uk-modal uk-flex-top"
        data-uk-modal="true"
      >
        <div
          className="uk-modal-dialog uk-width-auto uk-margin-auto-vertical image-modal-dialog"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="modal-close-golden"
            type="button"
            onClick={handleClose}
            aria-label="Cerrar"
          >
            <span data-uk-icon="icon: close; ratio: 1.5"></span>
          </button>
          <img src={imageUrl} alt={alt} className="image-modal-full" />
        </div>
      </div>
    </>
  );
};

export default ImageModal;
