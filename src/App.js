import "./App.css";
import React from "react";
import { useProducts } from "./contexts/products-context";
import { Nav } from "./components/Nav/Nav";
import { Products } from "./components/Products/Products";

function App() {
  const { productsData } = useProducts();
  return (
    <div className="App">
      <Nav />
      <div className="content">
        <Products />
      </div>
    </div>
  );
}

export default App;
