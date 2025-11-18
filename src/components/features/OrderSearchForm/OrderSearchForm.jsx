import { useState } from "react";
import "../ProductSearchForm/ProductSearchForm.css";

export const ORDER_FILTER_DEFAULTS = {
  keyword: "",
  client: "",
  status: "",
  minTotal: "",
  maxTotal: "",
  startDate: "",
  endDate: "",
};

const OrderSearchForm = ({ onApply, isAdmin = true }) => {
  const [filters, setFilters] = useState(() => ({ ...ORDER_FILTER_DEFAULTS }));

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
    const cleared = { ...ORDER_FILTER_DEFAULTS };
    setFilters(cleared);
    onApply(cleared);
  };

  return (
    <form className="product-search-form order-search-form" onSubmit={handleSubmit}>
      <h4>Buscar Pedidos</h4>
      <div className="search-filters-grid">
        <div className="search-filter-group">
          <label>Palabra clave</label>
          <input
            type="text"
            name="keyword"
            value={filters.keyword}
            onChange={handleChange}
            placeholder="ID, estado o referencia"
            className="search-filter-input"
          />
        </div>

        {isAdmin && (
          <div className="search-filter-group">
            <label>Cliente</label>
            <input
              type="text"
              name="client"
              value={filters.client}
              onChange={handleChange}
              placeholder="Nombre de usuario"
              className="search-filter-input"
            />
          </div>
        )}

        <div className="search-filter-group">
          <label>Estado</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="search-filter-select"
          >
            <option value="">Todos</option>
            <option value="PENDIENTE">Pendiente</option>
            <option value="PREPARANDO">Preparando</option>
            <option value="COMPLETADO">Completado</option>
            <option value="CANCELADA">Cancelada</option>
          </select>
        </div>

        <div className="search-filter-group">
          <label>Monto mínimo</label>
          <input
            type="number"
            name="minTotal"
            value={filters.minTotal}
            onChange={handleChange}
            placeholder="$0"
            min="0"
            step="0.01"
            className="search-filter-input"
          />
        </div>

        <div className="search-filter-group">
          <label>Monto máximo</label>
          <input
            type="number"
            name="maxTotal"
            value={filters.maxTotal}
            onChange={handleChange}
            placeholder="$1.000.000"
            min="0"
            step="0.01"
            className="search-filter-input"
          />
        </div>

        <div className="search-filter-group">
          <label>Desde</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleChange}
            className="search-filter-input"
          />
        </div>

        <div className="search-filter-group">
          <label>Hasta</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
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

export default OrderSearchForm;
