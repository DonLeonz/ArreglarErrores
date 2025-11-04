const UserCard = ({ usuarios }) => {
  return (
    <div
      className="uk-grid uk-child-width-1-2@s uk-child-width-1-3@m uk-grid-match"
      data-uk-grid=""
    >
      {usuarios.map((usuario) => (
        <div key={usuario.id}>
          <div className="uk-card uk-card-body uk-text-center api-result-card">
            <img
              src={usuario.avatar_url}
              alt={`Avatar de ${usuario.login}`}
              width={80}
              className="uk-border-circle"
            />
            <h3 className="uk-card-title uk-text-truncate api-card-title">{usuario.login}</h3>
            <a
              href={usuario.html_url}
              target="_blank"
              rel="noreferrer"
              className="uk-button uk-button-primary api-button"
            >
              Ver perfil
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCard;
