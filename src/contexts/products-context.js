import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { cartReducer } from "../reducers/cart-reducer";
export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [productsData, setProductsData] = useState([]);
  const [sideMenuStatus, setSideMenuStatus] = useState(false);
  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: [],
    wishlist: [],
    sortOption: null,
    priceRange: 1000,
    deliveryOption: false,
    inStock: false,
  });
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { products },
        } = await axios.get("https://damp-mesa-30814.herokuapp.com/products");
        const {
          data: { user },
        } = await axios.get("https://damp-mesa-30814.herokuapp.com/user");
        const cartData = user["0"].cart.cartItems;
        const wishlistData = user["0"].wishlist.wishlistItems;
        setProductsData(products === undefined ? [] : products);
        dispatch({
          type: "SET_CART_WISHLIST",
          payload: { cartData, wishlistData },
        });
      } catch (err) {
        console.log(err);
      }
    })();
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
        state,
        dispatch,
        sideMenuStatus,
        setSideMenuStatus,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
