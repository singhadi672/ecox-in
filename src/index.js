import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import createMockServer from "./api/mock.server";
import { ProductsProvider } from "./contexts/products-context";
import { HomeProvider } from "./contexts/home-context";

import { BrowserRouter as Router } from "react-router-dom";

// createMockServer();
ReactDOM.render(
  <React.StrictMode>
    <ProductsProvider>
      <HomeProvider>
        <Router>
          <App />
        </Router>
      </HomeProvider>
    </ProductsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
