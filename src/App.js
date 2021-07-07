import "./App.css";
import React from "react";
import { Nav } from "./components/Nav/Nav";
import { Products } from "./components/Products/Products";
import { Cart } from "./components/Cart/Cart";
import { Wishlist } from "./components/Wishlist/Wishlist";
import { Home } from "./components/Home/Home";
import { ProductDetails } from "./components/ProductDetails/ProductDetails";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Signup } from "./components/Signup/Signup";
import { useAuth } from "./contexts/auth-context";
import Loader from "./components/Loader/Loader";
import { useHome } from "./contexts/home-context";

function App() {
  const { PrivateRoute } = useAuth();
  const { loader } = useHome();
  return (
    <>
      {loader && <Loader />}
      <div className="App">
        <Nav />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/products/:id" element={<ProductDetails />}></Route>
            <PrivateRoute path="cart" element={<Cart />}></PrivateRoute>
            <PrivateRoute path="wishlist" element={<Wishlist />}></PrivateRoute>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
