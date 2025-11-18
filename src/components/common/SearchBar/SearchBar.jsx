import { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch, textHint }) => {
  const [input, setInput] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input.trim());
  };
  return (
    <form onSubmit={handleSubmit} className="search-bar-form">
      <input
        type="text"
        placeholder={`${textHint}...`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="search-bar-input"
      />
      <button
        type="submit"
        className="search-bar-icon-button"
        aria-label="Buscar"
      >
        <span data-uk-icon="icon: search; ratio: 1.2"></span>
      </button>
    </form>
  );
};

export default SearchBar;
