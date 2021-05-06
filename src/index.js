import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ProductsProvider } from "./contexts/products-context";
import { HomeProvider } from "./contexts/home-context";
import { AuthProvider } from "./contexts/auth-context";

import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ProductsProvider>
        <HomeProvider>
          <Router>
            <App />
          </Router>
        </HomeProvider>
      </ProductsProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
