import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
} from "react";
import { cartReducer } from "../reducers/cart-reducer";
import { Navigate, Route, useNavigate } from "react-router";
import { Login } from "../components/Login/Login";

export const AuthContext = createContext();

export function setupAuthHeaderForServiceCalls(token) {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  }
  delete axios.defaults.headers.common["Authorization"];
}

export function AuthProvider({ children }) {
  const loginStatus = JSON.parse(localStorage?.getItem("login")) || {};
  const [login, setLogin] = useState(loginStatus.token ? true : false);
  const [token, setToken] = useState(
    loginStatus.token ? loginStatus.token : null
  );
  const [quantityTab, setQuantityTab] = useState(false);
  const [toast, setToast] = useState({
    status: false,
    heading: "",
    msg: "",
    error: false,
  });

  const [state, dispatch] = useReducer(cartReducer, {
    username: null,
    cartItems: [],
    wishlist: [],
    sortOption: null,
    priceRange: 1000,
    deliveryOption: false,
    inStock: false,
  });

  let navigate = useNavigate();

  function setupAuthExceptionHandler(navigate) {
    const UNAUTHORIZED = 401;
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === UNAUTHORIZED) {
          localStorage?.removeItem("login");
          setLogin(false);
          navigate("../login");
        }
        return Promise.reject(error);
      }
    );
  }

  useEffect(() => {
    (async () => {
      if (token) {
        setupAuthHeaderForServiceCalls(token);
        const response = await axios.get(
          "https://ecox-in-backend.vercel.app/user"
        );
        setupAuthExceptionHandler(navigate);
        const cartData = response.data.user.cart.cartItems;
        const wishlistData = response.data.user.wishlist.wishlistItems;
        const username = response.data.user.username;

        dispatch({
          type: "SET_CART_WISHLIST",
          payload: { cartData, wishlistData, username },
        });
      }
    })();
    // eslint-disable-next-line
  }, []);

  function PrivateRoute({ element, path, ...props }) {
    return login ? (
      <Route {...props} path={path} element={element} />
    ) : (
      <Navigate
        to="/login"
        state={{ from: path }}
        element={<Login />}
        replace
      />
    );
  }

  async function loginUserWithCredentials(email, password) {
    try {
      const response = await axios.post(
        "https://ecox-in-backend.vercel.app/login",
        {
          email: email,
          password: password,
        }
      );
      if (response.status === 200) {
        localStorage?.setItem(
          "login",
          JSON.stringify({ token: response.data.token })
        );
        const cartData = response.data.user.cart.cartItems;
        const wishlistData = response.data.user.wishlist.wishlistItems;
        const username = response.data.user.username;

        dispatch({
          type: "SET_CART_WISHLIST",
          payload: { cartData, wishlistData, username },
        });
        setToken(response.data.token);
        setupAuthHeaderForServiceCalls(response.data.token);
        setLogin(true);
      }
      return response;
    } catch (err) {
      return null;
    }
  }

  async function signupUser(username, email, password) {
    try {
      const response = await axios.post(
        "https://ecox-in-backend.vercel.app/signup",
        {
          email,
          password,
          username,
        }
      );
      if (response.status === 201) {
        localStorage?.setItem(
          "login",
          JSON.stringify({ token: response.data.token })
        );
        const cartData = response.data.user.cart.cartItems;
        const wishlistData = response.data.user.wishlist.wishlistItems;
        const username = response.data.user.username;

        dispatch({
          type: "SET_CART_WISHLIST",
          payload: { cartData, wishlistData, username },
        });
        setToken(response.data.token);
        setupAuthHeaderForServiceCalls(response.data.token);
        setLogin(true);
      }
      return response;
    } catch (err) {
      return null;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        loginUserWithCredentials,
        PrivateRoute,
        login,
        setLogin,
        signupUser,
        token,
        state,
        dispatch,
        toast,
        quantityTab,
        setQuantityTab,
        setToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
