import { useState } from "react";
import useApiSearch from "../../../../hook/useApiSearch";
import SearchBar from "../../../common/SearchBar/SearchBar";
import ErrorMessage from "../../../common/ErrorMessage/ErrorMessage";
import UserCard from "../../../cards/UserCard/UserCard";

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

const GitHubSearch = () => {
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
      <SearchBar
        onSearch={handleSearch}
        textHint={"Buscar un usuario (ej: midudev)"}
      />
      {error && <ErrorMessage>Hubo un error al consultar la API</ErrorMessage>}
      {!error && enabled && loading && (
        <p className="uk-text-center">Cargando...</p>
      )}
      {!error && enabled && !loading && result.length > 0 && (
        <UserCard usuarios={result} />
      )}
      {!error && enabled && !loading && result.length === 0 && (
        <p className="uk-text-center uk-text-muted">
          No se encontraron resultados
        </p>
      )}
    </>
  );
};

export default GitHubSearch;
