import coffeLogo from "../assets/img/coffe-user-logo.svg";
import "../assets/styles/layout/footer.css";

const Footer = () => {
  return (
    <footer className="uk-section uk-section-small footer-container">
      <div className="uk-container">
        <div
          className="uk-flex uk-flex-between uk-flex-middle uk-grid-small"
          uk-grid=""
        >
          <div>
            <img src={coffeLogo} alt="Logo" />
          </div>
          <div className="uk-text-top">
            <span className="uk-text-small uk-text-muted">Síguenos</span>
            <div className="uk-margin-small-top">
              <a
                href="https://www.x.com"
                className="uk-icon-button"
                uk-icon="icon: x"
                target="_blank"
              ></a>
              <a
                href="https://www.instagram.com"
                className="uk-icon-button uk-margin-small-left"
                uk-icon="icon: instagram"
                target="_blank"
              ></a>
              <a
                href="https://www.youtube.com"
                className="uk-icon-button uk-margin-small-left"
                uk-icon="icon: youtube"
                target="_blank"
              ></a>
              <a
                href="https://www.linkedin.com"
                className="uk-icon-button uk-margin-small-left"
                uk-icon="icon: linkedin"
                target="_blank"
              ></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
