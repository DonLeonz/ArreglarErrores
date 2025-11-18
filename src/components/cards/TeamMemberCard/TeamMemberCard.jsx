import ImageModal from "../../common/ImageModal/ImageModal";
import "../cards.css";

const TeamMemberCard = ({ member, index }) => {
  return (
    <div className="uk-card uk-card-default uk-flex uk-flex-column nosotros-team-card">
      <div className="uk-card-media-top nosotros-team-image-wrapper">
        <ImageModal
          imageUrl={member.img}
          alt={member.name}
          modalId={`modal-team-member-${index}`}
        />
      </div>
      <div className="uk-card-body uk-flex-1 nosotros-team-body">
        <h4 className="nosotros-team-name">{member.name}</h4>
        <p className="nosotros-team-role">{member.role}</p>
      </div>
    </div>
  );
};

export default TeamMemberCard;
