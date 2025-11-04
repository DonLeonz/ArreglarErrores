import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="uk-background-cover uk-light first-child-adjustment hero-section uk-flex uk-flex-middle">
        <div className="hero-overlay"></div>
        <div className="uk-width-1-1 hero-content-wrapper">
          <div className="hero-content">
            <div className="home-hero-container">
              <h1
                className="uk-heading-large hero-title"
                data-uk-scrollspy="cls: uk-animation-slide-right; delay: 200"
              >
                Expresso 24
              </h1>
              <div
                className="uk-overlay uk-overlay-primary uk-padding-small hero-description"
                data-uk-scrollspy="cls: uk-animation-slide-left; delay: 300"
              >
                <p>
                  Bienvenido a <strong>Expresso 24</strong>, un lugar donde
                  cada taza de café cuenta una historia. Aquí encontrarás la
                  combinación perfecta de calidad, comodidad y calidez para
                  hacer de tus mañanas algo especial.
                </p>
              </div>
              <div
                className="uk-margin-top hero-buttons"
                data-uk-scrollspy="cls: uk-animation-slide-bottom-medium; delay: 400"
              >
                <a
                  href="/menu"
                  className="uk-button btn-golden-primary uk-margin-small-bottom"
                >
                  <span data-uk-icon="icon: search"></span> Ver Menú
                </a>
                <a
                  href="/suggest"
                  className="uk-button btn-coffee-secondary uk-margin-small-bottom"
                >
                  <span data-uk-icon="icon: star"></span> Recomendación del Día
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="uk-section uk-section-default features-section">
        <div className="uk-container">
          <h2
            className="section-title"
            data-uk-scrollspy="cls: uk-animation-slide-top-medium; delay: 100"
          >
            ¿Por qué elegirnos?
          </h2>
          <div
            className="uk-child-width-1-3@m uk-child-width-1-1 uk-grid-match uk-margin-medium-top"
            data-uk-grid
            data-uk-scrollspy="cls: uk-animation-slide-bottom-medium; target: > div; delay: 150;"
          >
            <div>
              <div className="uk-card uk-card-default uk-card-body uk-text-center feature-card">
                <div className="feature-icon-container">
                  <span
                    data-uk-icon="icon: heart; ratio: 3"
                    className="icon-golden icon-animated"
                  ></span>
                </div>
                <h3 className="uk-card-title text-golden">
                  Café de Especialidad
                </h3>
                <p className="text-white-muted">
                  Granos seleccionados de las mejores fincas colombianas,
                  tostados artesanalmente para preservar sus notas únicas de
                  sabor.
                </p>
              </div>
            </div>
            <div>
              <div className="uk-card uk-card-default uk-card-body uk-text-center feature-card">
                <div className="feature-icon-container">
                  <span
                    data-uk-icon="icon: users; ratio: 3"
                    className="icon-golden icon-animated"
                  ></span>
                </div>
                <h3 className="uk-card-title text-golden">Ambiente Acogedor</h3>
                <p className="text-white-muted">
                  Espacio diseñado para que disfrutes cada momento, ya sea
                  trabajando, leyendo o compartiendo con amigos.
                </p>
              </div>
            </div>
            <div>
              <div className="uk-card uk-card-default uk-card-body uk-text-center feature-card">
                <div className="feature-icon-container">
                  <span
                    data-uk-icon="icon: happy; ratio: 3"
                    className="icon-golden icon-animated"
                  ></span>
                </div>
                <h3 className="uk-card-title text-golden">Baristas Expertos</h3>
                <p className="text-white-muted">
                  Nuestro equipo está capacitado en las mejores técnicas de
                  preparación para garantizar la taza perfecta en cada servicio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="uk-section stats-section">
        <div className="uk-container">
          <h2
            className="section-title"
            data-uk-scrollspy="cls: uk-animation-slide-top-medium; delay: 100"
          >
            Nuestra Cafetería en Cifras
          </h2>
          <div
            className="uk-grid-medium uk-child-width-1-4@m uk-child-width-1-2@s uk-text-center uk-margin-medium-top"
            data-uk-grid
            data-uk-scrollspy="cls: uk-animation-slide-bottom-medium; target: > div; delay: 100;"
          >
            <div>
              <div className="uk-card uk-card-default uk-card-body uk-card-hover stat-card">
                <h2 className="stat-number text-golden">5+</h2>
                <p className="text-white uk-text-bold uk-margin-remove-top">
                  Años de experiencia
                </p>
              </div>
            </div>
            <div>
              <div className="uk-card uk-card-default uk-card-body uk-card-hover stat-card">
                <h2 className="stat-number text-golden">10K+</h2>
                <p className="text-white uk-text-bold uk-margin-remove-top">
                  Clientes satisfechos
                </p>
              </div>
            </div>
            <div>
              <div className="uk-card uk-card-default uk-card-body uk-card-hover stat-card">
                <h2 className="stat-number text-golden">20+</h2>
                <p className="text-white uk-text-bold uk-margin-remove-top">
                  Variedades de café
                </p>
              </div>
            </div>
            <div>
              <div className="uk-card uk-card-default uk-card-body uk-card-hover stat-card">
                <h2 className="stat-number text-golden">100%</h2>
                <p className="text-white uk-text-bold uk-margin-remove-top">
                  Café colombiano
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="uk-section cta-section">
        <div className="uk-container">
          <div
            className="uk-card uk-card-default uk-card-body uk-text-center cta-card"
            data-uk-scrollspy="cls: uk-animation-scale-up; delay: 200"
          >
            <h3 className="text-golden uk-heading-small">
              <span
                data-uk-icon="icon: heart; ratio: 2"
                className="icon-golden"
              ></span>
              ¿Listo para tu próxima taza?
            </h3>
            <p className="text-white-muted uk-text-lead uk-margin-medium-top">
              Descubre nuestra selección especial y encuentra tu café perfecto
            </p>
            <div
              className="uk-grid-small uk-child-width-auto@s uk-flex-center uk-margin-medium-top"
              data-uk-grid
            >
              <div>
                <a
                  href="/menu"
                  className="uk-button btn-golden-primary uk-button-large"
                >
                  <span data-uk-icon="icon: menu"></span> Ver Menú Completo
                </a>
              </div>
              <div>
                <a
                  href="/about"
                  className="uk-button btn-golden-border uk-button-large"
                >
                  <span data-uk-icon="icon: info"></span> Conocer Más
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
