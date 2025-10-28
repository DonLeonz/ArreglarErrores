import { useState } from "react";
import { useProducts } from "../../../../context/ProductsContext";
import { useAuth } from "../../../../context/AuthContext";

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
    <form onSubmit={handleSubmit}>
      <h4>Buscar Productos</h4>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Categoría:</label>
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
        >
          <option value="">Todas</option>
          {categories.map((c) => (
            <option key={c._id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Precio mínimo:</label>
        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Precio máximo:</label>
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Stock mínimo:</label>
        <input
          type="number"
          name="minStock"
          value={filters.minStock}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Stock máximo:</label>
        <input
          type="number"
          name="maxStock"
          value={filters.maxStock}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Origen:</label>
        <input
          type="text"
          name="origin"
          value={filters.origin}
          onChange={handleChange}
        />
      </div>
      {roles.includes("ADMIN") && (
        <div>
          <label>Habilitado:</label>
          <input
            type="checkbox"
            name="enabled"
            checked={filters.enabled}
            onChange={handleChange}
          />
        </div>
      )}
      <button type="submit">Buscar</button>
      <button type="button" onClick={handleClear}>
        Limpiar
      </button>
    </form>
  );
};

export default ProductSearchForm;