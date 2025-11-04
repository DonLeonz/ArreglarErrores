import TeamMemberCard from "../../components/cards/TeamMemberCard/TeamMemberCard";
import jhon from "../../assets/img/nosotros/jhon.png";
import kale from "../../assets/img/nosotros/kale.png";
import leon from "../../assets/img/nosotros/leon.png";
import "./Nosotros.css";

const Nosotros = () => {
  const infoCards = [
    {
      title: "Nuestra Historia",
      icon: "history",
      content:
        "Fundada en 2020, nuestra cafetería nació de la pasión por el café de especialidad y la tradición colombiana. Cada taza que servimos cuenta la historia de los caficultores que cultivan los granos con dedicación y amor por su tierra.",
    },
    {
      title: "Nuestra Misión",
      icon: "heart",
      content:
        "Ofrecer experiencias únicas a través de café de alta calidad, promoviendo prácticas sostenibles y apoyando a las comunidades cafetaleras. Queremos que cada visita sea memorable y que nuestros clientes se sientan como en casa.",
    },
    {
      title: "Nuestra Visión",
      icon: "future",
      content:
        "Ser la cafetería referente en la región por nuestro compromiso con la excelencia, la sostenibilidad y la innovación. Aspiramos a expandir nuestra presencia manteniendo siempre nuestros valores y la calidad que nos caracteriza.",
    },
  ];

  const teamMembers = [
    {
      name: "Jhon Alexander y Yamil",
      role: "Son los baristas principales, hacedores de todos los cafes, y orgullosamente jhon es el limpia suelos de la cafeteria, tiene una tecnica especial llamada la lengua trapero",
      img: jhon,
    },
    { name: "Jorge Leon", role: "El mismisimo master chef de toda la cocina, carrea toda la comida, experto en creación de galletas", img: leon },
    { name: "Kaleth Daniel", role: "El mero gerente de toda la tienda, encargado de que todos trabajen y no se la pasen echados en el suelo", img: kale },
  ];

  const locations = [
    {
      name: "Sede Centro",
      address: "Calle 53 #52-43, El Poblado",
      city: "Medellín, Antioquia",
      phone: "+57 304 123 4567",
      landline: "604 444 5555",
      schedule:
        "Lunes a Viernes: 7:00 AM - 8:00 PM | Sábados y Domingos: 8:00 AM - 6:00 PM",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d-75.57!3d6.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMDAuMCJOIDc1wrAzNCcxMi4wIlc!5e0!3m2!1sen!2sco!4v1234567890",
      whatsapp: "573041234567",
    },
    {
      name: "Sede Norte",
      address: "Carrera 43A #7-50, Local 101",
      city: "Medellín, Antioquia",
      phone: "+57 305 987 6543",
      landline: "604 555 6666",
      schedule:
        "Lunes a Sábado: 7:30 AM - 7:30 PM | Domingos: 9:00 AM - 5:00 PM",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1!2d-75.56!3d6.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTUnMDAuMCJOIDc1wrAzMyczNi4wIlc!5e0!3m2!1sen!2sco!4v1234567891",
      whatsapp: "573059876543",
    },
  ];

  return (
    <div className="first-child-adjustment uk-section uk-padding-small nosotros-background">
      <div className="uk-container uk-container-large uk-padding uk-light nosotros-container">
        <div
          className="uk-text-center uk-margin-large-bottom"
          data-uk-scrollspy="cls: uk-animation-fade; delay: 100"
        >
          <h2 className="uk-heading-small uk-text-uppercase nosotros-title">
            <span className="uk-display-inline-block uk-padding-small nosotros-title-underline">
              Sobre Nosotros
            </span>
          </h2>
          <p className="uk-text-lead text-white-muted uk-margin-top">
            Tu refugio de café de especialidad en la ciudad
          </p>
        </div>

        <div
          className="uk-grid-medium uk-child-width-1-3@m uk-child-width-1-1"
          data-uk-grid
          data-uk-scrollspy="cls: uk-animation-slide-bottom-small; target: > div; delay: 150;"
        >
          {infoCards.map((card, index) => (
            <div key={index}>
              <div className="uk-card uk-card-default uk-card-body nosotros-info-card">
                <div className="nosotros-icon-container">
                  <span
                    data-uk-icon={`icon: ${card.icon}; ratio: 2.5`}
                    className="icon-golden icon-animated"
                  ></span>
                </div>
                <h3 className="uk-card-title nosotros-card-title">
                  {card.title}
                </h3>
                <p className="nosotros-card-text">{card.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="uk-margin-xlarge-top">
          <h3
            className="uk-text-center nosotros-section-title section-title"
            data-uk-scrollspy="cls: uk-animation-fade; delay: 100"
          >
            Nuestras Sedes
          </h3>
          <div
            className="uk-grid-medium uk-child-width-1-2@m uk-margin-medium-top"
            data-uk-grid
            data-uk-scrollspy="cls: uk-animation-slide-left; target: > div; delay: 200;"
          >
            {locations.map((location, index) => (
              <div key={index}>
                <div className="uk-card uk-card-default uk-card-body uk-card-hover nosotros-location-card">
                  <h3 className="nosotros-location-title">
                    <span
                      data-uk-icon="icon: location; ratio: 1.5"
                      className="icon-golden"
                    ></span>
                    {location.name}
                  </h3>

                  <div className="uk-margin">
                    <p className="nosotros-location-info">
                      <span
                        data-uk-icon="icon: location"
                        className="icon-golden uk-margin-small-right"
                      ></span>
                      <strong>Dirección:</strong>
                      <br />
                      {location.address}
                      <br />
                      {location.city}
                    </p>
                    <p className="nosotros-location-info">
                      <span
                        data-uk-icon="icon: phone"
                        className="icon-golden uk-margin-small-right"
                      ></span>
                      <strong>Teléfonos:</strong>
                      <br />
                      Móvil: {location.phone} | Fijo: {location.landline}
                    </p>
                    <p className="nosotros-location-info">
                      <span
                        data-uk-icon="icon: clock"
                        className="icon-golden uk-margin-small-right"
                      ></span>
                      <strong>Horario:</strong>
                      <br />
                      {location.schedule}
                    </p>
                  </div>

                  <div className="nosotros-map-container uk-margin-top">
                    <iframe
                      src={location.mapUrl}
                      width="100%"
                      height="250"
                      allowFullScreen=""
                      loading="lazy"
                      className="nosotros-map"
                    ></iframe>
                  </div>

                  <a
                    href={`https://wa.me/${location.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="uk-button btn-golden-primary uk-width-1-1 uk-margin-top"
                  >
                    <span data-uk-icon="icon: whatsapp"></span> Contactar{" "}
                    {location.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="uk-margin-xlarge-top">
          <h3
            className="uk-text-center nosotros-section-title section-title"
            data-uk-scrollspy="cls: uk-animation-fade; delay: 100"
          >
            Conoce al Equipo
          </h3>
          <p className="uk-text-center text-white-muted uk-margin-top">
            Profesionales apasionados por el café
          </p>
          <div
            className="uk-grid-small uk-child-width-1-3@m uk-margin-medium-top"
            data-uk-grid
            data-uk-scrollspy="cls: uk-animation-scale-up; target: > div; delay: 100;"
          >
            {teamMembers.map((member, index) => (
              <div key={index}>
                <TeamMemberCard member={member} index={index} />
              </div>
            ))}
          </div>
        </div>

        <div className="uk-margin-xlarge-top">
          <h3
            className="uk-text-center nosotros-section-title section-title"
            data-uk-scrollspy="cls: uk-animation-fade; delay: 100"
          >
            Nuestros Valores
          </h3>
          <div
            className="uk-grid-medium uk-child-width-1-3@m uk-text-center uk-margin-medium-top"
            data-uk-grid
            data-uk-scrollspy="cls: uk-animation-slide-bottom; target: > div; delay: 150;"
          >
            <div>
              <div className="uk-card uk-card-default uk-card-body uk-card-hover nosotros-value-card">
                <span
                  data-uk-icon="icon: check; ratio: 3"
                  className="icon-golden icon-animated"
                ></span>
                <h3 className="text-golden uk-margin-small-top">Calidad</h3>
                <p className="text-white-muted">
                  Café premium seleccionado cuidadosamente de las mejores fincas
                  colombianas
                </p>
              </div>
            </div>
            <div>
              <div className="uk-card uk-card-default uk-card-body uk-card-hover nosotros-value-card">
                <span
                  data-uk-icon="icon: users; ratio: 3"
                  className="icon-golden icon-animated"
                ></span>
                <h3 className="text-golden uk-margin-small-top">Servicio</h3>
                <p className="text-white-muted">
                  Atención personalizada y experiencia única en cada visita
                </p>
              </div>
            </div>
            <div>
              <div className="uk-card uk-card-default uk-card-body uk-card-hover nosotros-value-card">
                <span
                  data-uk-icon="icon: world; ratio: 3"
                  className="icon-golden icon-animated"
                ></span>
                <h3 className="text-golden uk-margin-small-top">
                  Sostenibilidad
                </h3>
                <p className="text-white-muted">
                  Compromiso con el medio ambiente y las comunidades cafetaleras
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;
