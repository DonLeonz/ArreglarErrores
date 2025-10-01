import "./MangaCard.css";

const MangaCard = ({ mangas }) => {
  return (
    <div
      className="uk-grid uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l uk-grid-match"
      data-uk-grid=""
    >
      {mangas.map((manga) => (
        <div key={manga.id}>
          <div className="uk-card uk-card-default uk-card-hover uk-box-shadow-hover-large uk-border-rounded mangadex-card">
            <div className="uk-card-media-top mangadex-card-image-container">
              <img
                src={manga.imageUrl}
                alt={manga.title}
                className="mangadex-card-image"
              />
            </div>
            <div className="uk-card-body uk-padding-small mangadex-card-body">
              <h3 className="uk-card-title uk-text-truncate uk-margin-remove-bottom">
                {manga.title}
              </h3>
            </div>
            <div className="uk-card-footer uk-text-center uk-padding-small">
              <a
                href={manga.url}
                target="_blank"
                rel="noreferrer"
                className="uk-button uk-button-primary uk-border-rounded uk-width-1-1"
              >
                Ver manga
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MangaCard;
