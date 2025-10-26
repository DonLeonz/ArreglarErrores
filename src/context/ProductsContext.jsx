import { createContext, useContext, useEffect, useState } from "react";
import {
    createProductRequest,
    modifyProductRequest,
    searchAllProductCategoriesRequest,
    searchProductsRequest
} from "../api/requests/products.request";

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within an ProductsProvider");
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modifiedProducts, setModifiedProducts] = useState(false);
  const [errors, setErrors] = useState([]);

  // Refresh Products
  useEffect(() => {
    searchProducts();
    searchAllCategories();
  }, [modifiedProducts]);

  // Create
  const createProduct = async (productData) => {
    try {
      const res = await createProductRequest(productData);
      if (res.status === 201) {
        setModifiedProducts(true);
        return true;
      }
    } catch (error) {
      console.log(error);
      setErrors([error.response.data.message]);
      return false;
    }
  };

  const modifyProduct = async (productId, productData) => {
    try {
      const res = await modifyProductRequest(productId, productData);
      if (res.status === 204 && res.data) {
        setModifiedProducts(true);
        return true;
      }
    } catch (error) {
      console.log(error.response.data.message);
      setErrors([error.response.data.message]);
      return false;
    }
  };

  const searchProducts = async (params) => {
    try {
      const res = await searchProductsRequest(params);
      if (res.status === 200 && res.data) {
        setProducts(res.data);
      }
    } catch (error) {
      console.log(error);
      setErrors([error.response.data.message]);
      return false;
    }
  };

  const searchAllCategories = async () => {
    try {
      const res = await searchAllProductCategoriesRequest();
      if (res.status === 200 && res.data) {
        setCategories(res.data);
      }
    } catch (error) {
      console.log(error.response.data.message);
      setErrors([error.response.data.message]);
      return false;
    }
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        errors,
        createProduct,
        modifyProduct,
        searchProducts,
        searchAllCategories
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
