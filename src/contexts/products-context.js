import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [productsData, setProductsData] = useState([]);
  useEffect(
    () =>
      (async () => {
        const {
          data: { products },
        } = await axios.get("/api/products");
        setProductsData((data) => products);
      })(),
    []
  );
  return (
    <ProductsContext.Provider value={{ productsData }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
