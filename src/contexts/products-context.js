import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useAuth } from "./auth-context";

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [productsData, setProductsData] = useState([]);
  const [sideMenuStatus, setSideMenuStatus] = useState(false);
  const { state } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { products },
        } = await axios.get("https://ecox-in-backend.vercel.app/products");

        setProductsData(products === undefined ? [] : products);
      } catch (err) {
        console.log(err);
      }
    })();
    // eslint-disable-next-line
  }, []);

  function sortData(data, state) {
    switch (state.sortOption) {
      case "low-to-high":
        return data
          .sort((a, b) => a["price"] - b["price"])
          .filter((item) => Number(item.price) < state.priceRange);
      case "high-to-low":
        return data
          .sort((a, b) => b["price"] - a["price"])
          .filter((item) => Number(item.price) < state.priceRange);
      default:
        return data.filter((item) => Number(item.price) < state.priceRange);
    }
  }

  function filterData(data, state) {
    return data
      .filter((item) => (state.deliveryOption ? item.fastDelivery : true))
      .filter((item) => (state.inStock ? item.inStock : true));
  }

  const sortedData = sortData(productsData, state);
  const filteredData = filterData(sortedData, state);

  return (
    <ProductsContext.Provider
      value={{
        filteredData,
        sideMenuStatus,
        setSideMenuStatus,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
