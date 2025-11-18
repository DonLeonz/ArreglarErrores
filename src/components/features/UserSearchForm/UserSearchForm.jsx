import { useState } from "react";
import "../ProductSearchForm/ProductSearchForm.css";

export const USER_FILTER_DEFAULTS = {
  keyword: "",
  role: "",
  enabled: "",
};

const UserSearchForm = ({ onApply }) => {
  const [filters, setFilters] = useState(() => ({ ...USER_FILTER_DEFAULTS }));

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
    const cleared = { ...USER_FILTER_DEFAULTS };
    setFilters(cleared);
    onApply(cleared);
  };

  return (
    <form className="product-search-form user-search-form" onSubmit={handleSubmit}>
      <h4>Buscar Usuarios</h4>
      <div className="search-filters-grid">
        <div className="search-filter-group">
          <label>Palabra clave</label>
          <input
            type="text"
            name="keyword"
            value={filters.keyword}
            onChange={handleChange}
            placeholder="Usuario, nombre o email"
            className="search-filter-input"
          />
        </div>

        <div className="search-filter-group">
          <label>Rol</label>
          <select
            name="role"
            value={filters.role}
            onChange={handleChange}
            className="search-filter-select"
          >
            <option value="">Todos los roles</option>
            <option value="ADMIN">Administrador</option>
            <option value="CUSTOMER">Cliente</option>
          </select>
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
            <option value="true">Activo</option>
            <option value="false">Suspendido</option>
          </select>
        </div>
      </div>

      <div className="search-buttons">
        <button type="submit" className="search-btn-submit">
          Buscar
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="search-btn-clear"
        >
          Limpiar filtros
        </button>
      </div>
    </form>
  );
};

export default UserSearchForm;
