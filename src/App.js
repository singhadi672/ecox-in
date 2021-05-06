import "./App.css";
import React from "react";
import { Nav } from "./components/Nav/Nav";

import { Products } from "./components/Products/Products";
import { Cart } from "./components/Cart/Cart";
import { Wishlist } from "./components/Wishlist/Wishlist";
import { Home } from "./components/Home/Home";
import { ProductDetails } from "./components/ProductDetails/ProductDetails";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { Login } from "./components/Login/Login";

function App() {
  return (
    <div className="App">
      <Nav />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/products/:id" element={<ProductDetails />}></Route>
          <Route path="cart" element={<Cart />}></Route>
          <Route path="wishlist" element={<Wishlist />}></Route>
          <Route path="login" element={<Login />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
