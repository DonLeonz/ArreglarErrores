import React from "react";
import "uikit/dist/css/uikit.min.css";
import sofia from "../assets/img/nosotros/sofia.jpg";
import juan from "../assets/img/nosotros/juan.jpg";
import maria from "../assets/img/nosotros/maria.jpg";
import "../assets/styles/pages/nosotros.css";

const Nosotros = () => {
  return (
    <div className="first-child-adjustment uk-section uk-padding-small nosotros-background">
      <div className="uk-container uk-container-large uk-padding uk-light nosotros-container">
        {/* Sección del título */}
        <div className="uk-text-center uk-margin-large-bottom">
          <h2 className="uk-heading-small uk-text-uppercase nosotros-title">
            <span className="uk-display-inline-block uk-padding-small nosotros-title-underline">
              Sobre Nosotros
            </span>
          </h2>
        </div>

        {/* Contenido principal */}
        <div className="uk-grid-medium uk-child-width-1-2@m" data-uk-grid>
          {/* Columna izquierda (historia) */}
          <div>
            <div className="uk-card uk-card-default uk-card-body nosotros-info-card">
              <h3 className="uk-card-title nosotros-card-title">
                Nuestra Historia
              </h3>
              <p className="nosotros-card-text">
                Fundada en 2025, nuestra cafetería nació de la pasión por el
                café de especialidad y la tradición colombiana. Cada taza que
                servimos cuenta la historia de los caficultores que cultivan los
                granos con dedicación.
              </p>
            </div>
          </div>

          {/* Columna derecha (misión) */}
          <div>
            <div className="uk-card uk-card-default uk-card-body nosotros-info-card">
              <h3 className="uk-card-title nosotros-card-title">
                Nuestra Misión
              </h3>
              <p className="nosotros-card-text">
                Ofrecer experiencias únicas a través de café de alta calidad,
                promoviendo prácticas sostenibles y apoyando a las comunidades
                cafetaleras. Queremos que cada visita sea memorable.
              </p>
            </div>
          </div>
        </div>

        {/* Equipo */}
        <div className="uk-margin-large-top">
          <h3 className="uk-text-center nosotros-team-title">
            Conoce al Equipo
          </h3>
          <div className="uk-grid-small uk-child-width-1-3@m" data-uk-grid>
            {[
              { name: "Sofía", role: "Barista Principal", img: sofia },
              { name: "Juan", role: "Maestro Tostador", img: juan },
              { name: "María", role: "Gerente", img: maria },
            ].map((member, index) => (
              <div key={index}>
                <div className="uk-card uk-card-default uk-flex uk-flex-column nosotros-team-card">
                  <div className="uk-card-media-top">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="nosotros-team-image"
                    />
                  </div>
                  <div className="uk-card-body uk-flex-1 nosotros-team-body">
                    <h4 className="nosotros-team-name">{member.name}</h4>
                    <p className="nosotros-team-role">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;
