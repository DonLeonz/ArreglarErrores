import mainCoffeBackground from "../../assets/img/coffe-soft-header.svg";
import "./Home.css";

const Home = () => {
  return (
    <div
      className="uk-background-cover uk-height-viewport uk-light first-child-adjustment uk-flex uk-position-relative"
      style={{ backgroundImage: `url(${mainCoffeBackground})` }}
    >
      <div className="uk-container uk-margin-large-top uk-height-1-1">
        <div className="uk-position-center-right uk-position-medium home-hero-container">
          <h1 className="uk-heading-large">Coffe Shop SPA</h1>
          <div className="uk-overlay uk-overlay-primary uk-padding-small">
            <p>
              Bienvenido a <strong>Nombre del Café</strong>, un lugar donde cada
              taza de café cuenta una historia. Aquí encontrarás la combinación
              perfecta de calidad, comodidad y calidez para hacer de tus mañanas
              algo especial.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
