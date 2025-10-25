import { createContext, useContext, useState, useEffect } from "react";
import {
    createProductRequest,
    modifyProductRequest,
    searchProductsRequest
} from "../api/requests/products.request";

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within an ProductsProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState([]);

  // Create
  const createProduct = async (productData) => {
    try {
      const res = await createProductRequest(productData);
      if (res.status === 201) {
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
      console.log(error.response.data.message);
      setErrors([error.response.data.message]);
      return false;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        errors,
        createProduct,
        modifyProduct,
        searchProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
