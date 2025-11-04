import "../cards.css";

const TeamMemberCard = ({ member, index }) => {
  const handleImageClick = () => {
    const modal = window.UIkit?.modal(
      document.getElementById(`modal-team-member-${index}`)
    );
    if (modal) modal.show();
  };

  return (
    <>
      <div className="uk-card uk-card-default uk-flex uk-flex-column nosotros-team-card">
        <div className="uk-card-media-top nosotros-team-image-wrapper">
          <div
            className="nosotros-team-image-container"
            onClick={handleImageClick}
          >
            <img
              src={member.img}
              alt={member.name}
              className="nosotros-team-image"
            />
            <div className="nosotros-team-image-overlay">
              <span data-uk-icon="icon: eye; ratio: 2.5"></span>
            </div>
          </div>
        </div>
        <div className="uk-card-body uk-flex-1 nosotros-team-body">
          <h4 className="nosotros-team-name">{member.name}</h4>
          <p className="nosotros-team-role">{member.role}</p>
        </div>
      </div>

      <div
        id={`modal-team-member-${index}`}
        className="uk-modal uk-flex-top"
        data-uk-modal="true"
      >
        <div className="uk-modal-dialog uk-width-auto uk-margin-auto-vertical nosotros-modal-dialog-relative">
          <button
            className="nosotros-image-modal-close"
            type="button"
            data-uk-toggle={`target: #modal-team-member-${index}`}
            aria-label="Cerrar"
          />
          <img
            src={member.img}
            alt={member.name}
            className="nosotros-modal-image"
          />
        </div>
      </div>
    </>
  );
};

export default TeamMemberCard;
