import { useState } from "react";
import "../ProductSearchForm/ProductSearchForm.css";

export const BLOG_FILTER_DEFAULTS = {
  keyword: "",
  author: "",
  enabled: "",
  fromDate: "",
  toDate: "",
};

const BlogSearchForm = ({ onApply }) => {
  const [filters, setFilters] = useState(() => ({ ...BLOG_FILTER_DEFAULTS }));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onApply({ ...filters });
  };

  const handleClear = () => {
    const cleared = { ...BLOG_FILTER_DEFAULTS };
    setFilters(cleared);
    onApply(cleared);
  };

  return (
    <form className="product-search-form blog-search-form" onSubmit={handleSubmit}>
      <h4>Buscar Blogs</h4>
      <div className="search-filters-grid">
        <div className="search-filter-group">
          <label>Título o contenido</label>
          <input
            type="text"
            name="keyword"
            value={filters.keyword}
            onChange={handleChange}
            placeholder="Palabra clave"
            className="search-filter-input"
          />
        </div>

        <div className="search-filter-group">
          <label>Autor</label>
          <input
            type="text"
            name="author"
            value={filters.author}
            onChange={handleChange}
            placeholder="Usuario o nombre"
            className="search-filter-input"
          />
        </div>

        <div className="search-filter-group">
          <label>Estado</label>
          <select
            name="enabled"
            value={filters.enabled}
            onChange={handleChange}
            className="search-filter-select"
          >
            <option value="">Todos</option>
            <option value="true">Habilitados</option>
            <option value="false">Deshabilitados</option>
          </select>
        </div>

        <div className="search-filter-group">
          <label>Desde</label>
          <input
            type="date"
            name="fromDate"
            value={filters.fromDate}
            onChange={handleChange}
            className="search-filter-input"
          />
        </div>

        <div className="search-filter-group">
          <label>Hasta</label>
          <input
            type="date"
            name="toDate"
            value={filters.toDate}
            onChange={handleChange}
            className="search-filter-input"
          />
        </div>
      </div>

      <div className="search-buttons">
        <button type="submit" className="search-btn-submit">
          Buscar
        </button>
        <button type="button" className="search-btn-clear" onClick={handleClear}>
          Limpiar filtros
        </button>
      </div>
    </form>
  );
};

export default BlogSearchForm;
