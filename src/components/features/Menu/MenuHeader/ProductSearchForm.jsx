import { useState } from "react";
import { useProducts } from "../../../../context/ProductsContext";
import { useAuth } from "../../../../context/AuthContext";
import "./ProductSearchForm.css";

const ProductSearchForm = () => {
  const { searchProducts, categories } = useProducts();
  const { roles } = useAuth();

  const [filters, setFilters] = useState({
    name: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    minStock: "",
    maxStock: "",
    origin: "",
    enabled: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await searchProducts(filters);
  };

  const handleClear = async () => {
    setFilters({
      name: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      minStock: "",
      maxStock: "",
      origin: "",
      enabled: true,
    });
    const res = await searchProducts();
    console.log(res);
  };

  return (
    <form onSubmit={handleSubmit} className="product-search-form">
      <h4>Buscar Productos</h4>

      <div className="search-filters-grid">
        <div className="search-filter-group">
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleChange}
            placeholder="Nombre del producto"
            className="search-filter-input"
          />
        </div>

        <div className="search-filter-group">
          <label>Categoría</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="search-filter-select"
          >
            <option value="">Todas las categorías</option>
            {categories.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="search-filter-group">
          <label>Precio mínimo</label>
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="$0"
            className="search-filter-input"
          />
        </div>

        <div className="search-filter-group">
          <label>Precio máximo</label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="$999"
            className="search-filter-input"
          />
        </div>

        <div className="search-filter-group">
          <label>Stock mínimo</label>
          <input
            type="number"
            name="minStock"
            value={filters.minStock}
            onChange={handleChange}
            placeholder="0"
            className="search-filter-input"
          />
        </div>

        <div className="search-filter-group">
          <label>Stock máximo</label>
          <input
            type="number"
            name="maxStock"
            value={filters.maxStock}
            onChange={handleChange}
            placeholder="100"
            className="search-filter-input"
          />
        </div>

        <div className="search-filter-group">
          <label>Origen</label>
          <input
            type="text"
            name="origin"
            value={filters.origin}
            onChange={handleChange}
            placeholder="País de origen"
            className="search-filter-input"
          />
        </div>

        {roles.includes("ADMIN") && (
          <div className="search-filter-group">
            <div className="search-checkbox-group">
              <input
                type="checkbox"
                name="enabled"
                checked={filters.enabled}
                onChange={handleChange}
                className="search-checkbox-input"
                id="enabled-checkbox"
              />
              <label htmlFor="enabled-checkbox">Solo productos habilitados</label>
            </div>
          </div>
        )}
      </div>

      <div className="search-buttons">
        <button type="submit" className="search-btn-submit">
          Buscar
        </button>
        <button type="button" onClick={handleClear} className="search-btn-clear">
          Limpiar filtros
        </button>
      </div>
    </form>
  );
};

export default ProductSearchForm;