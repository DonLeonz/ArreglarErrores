import { useState } from "react";
import useApiSearch from "../../../../hook/useApiSearch";
import MangaCard from "../../../cards/MangaCard/MangaCard";
import ErrorMessage from "../../../common/ErrorMessage/ErrorMessage";
import SearchBar from "../../../common/SearchBar/SearchBar";

const fetchMangaDex = async (query) => {
  const contentRating = ["safe", "suggestive", "erotica", "pornographic"];
  const translatedLanguage = ["es", "es-la"];
  const params = new URLSearchParams();
  if (query) params.append("title", query);
  params.append("offset", 0);
  params.append("limit", 12);
  contentRating.forEach((rating) => params.append("contentRating[]", rating));
  translatedLanguage.forEach((lang) =>
    params.append("availableTranslatedLanguage[]", lang)
  );
  params.append("includes[]", "cover_art");
  params.append("order[latestUploadedChapter]", "desc");
  const url = `api/mangadex/manga?${params.toString()}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.data.map((manga) => {
    const coverArt = manga.relationships.find((r) => r.type === "cover_art");
    return {
      id: manga.id,
      title: manga.attributes.title.en,
      description:
        manga.attributes.description.es ||
        manga.attributes.description["es-la"] ||
        "Sin descripción",
      imageUrl: coverArt
        ? `https://uploads.mangadex.org/covers/${manga.id}/${coverArt.attributes?.fileName}.256.jpg`
        : null,
      url: `https://mangadex.org/title/${manga.id}`,
    };
  });
};

const MangaDexSearch = () => {
  const [query, setQuery] = useState("");
  const [enabled, setEnabled] = useState(false);
  const { result, loading, error } = useApiSearch(
    query,
    fetchMangaDex,
    enabled
  );

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setEnabled(true);
  };

  return (
    <>
      <p>Busqueda de mangas de MangaDex</p>
      <SearchBar
        onSearch={handleSearch}
        textHint={"Buscar un manga (ej: Bleach)"}
      />
      {error && <ErrorMessage>Hubo un error al consultar la API</ErrorMessage>}
      {!error && enabled && loading && (
        <p className="uk-text-center">Cargando...</p>
      )}
      {!error && enabled && !loading && result.length > 0 && (
        <MangaCard mangas={result} />
      )}
      {!error && enabled && !loading && result.length === 0 && (
        <p className="uk-text-center uk-text-muted">
          No se encontraron resultados
        </p>
      )}
    </>
  );
};

export default MangaDexSearch;
