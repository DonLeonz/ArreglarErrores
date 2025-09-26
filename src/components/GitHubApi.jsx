import { useState } from "react";
import useApiSearch from "../hook/useApiSearch";
import Buscador from "./Buscador";
import Error from "./Error";
import ResultadoApi from "./ResultadoApi";

const fetchGitHubUsers = async (query) => {
  const response = await fetch(
    `https://api.github.com/search/users?q=${query}`
  );
  const data = await response.json();

  return data.items.map((user) => ({
    id: user.id,
    login: user.login,
    avatar_url: user.avatar_url,
    html_url: user.html_url,
  }));
};

const GitHubApi = () => {
  const [query, setQuery] = useState("");
  const [enabled, setEnabled] = useState(false);
  const { result, loading, error } = useApiSearch(
    query,
    fetchGitHubUsers,
    enabled
  );

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setEnabled(true);
  };

  return (
    <>
      <p>Busqueda de usuarios de GitHub</p>
      <Buscador
        onSearch={handleSearch}
        textHint={"Buscar un usuario (ej: midudev)"}
      />
      {error && <Error>Hubo un error al consultar la API</Error>}
      {!error && enabled && loading && (
        <p className="uk-text-center">Cargando...</p>
      )}
      {!error && enabled && !loading && result.length > 0 && (
        <ResultadoApi usuarios={result} />
      )}
      {!error && enabled && !loading && result.length === 0 && (
        <p className="uk-text-center uk-text-muted">
          No se encontraron resultados
        </p>
      )}
    </>
  );
};

export default GitHubApi;
