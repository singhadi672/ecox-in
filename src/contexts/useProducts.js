import { ProductsContext } from "./products-context";
import { useContext } from "react";

export function useProducts() {
  return useContext(ProductsContext);
}
