import React from "react";
import "./side-menu.css";
import { useProducts } from "../../contexts/useProducts";
import { useAuth } from "../../contexts/auth-context";
export function SideMenu() {
  const { sideMenuStatus } = useProducts();
  const { state, dispatch } = useAuth();
  return (
    <>
      <div
        className="side-menu"
        style={{
          transform: sideMenuStatus ? "translateX(0px)" : "translateX(-500px)",
        }}
      >
        <div className="sidemenu-heading">
          <h1>Filters</h1>
          <p>clear All</p>
        </div>
        <div className="sort-option">
          <h3>Price</h3>
          <div>
            <input
              type="radio"
              name="sort"
              id=""
              checked={state.sortOption === "low-to-high"}
              onChange={() =>
                dispatch({ type: "TOGGLE_SORT", payload: "low-to-high" })
              }
            />
            <label htmlFor="sort">Low to High</label>
          </div>
          <div>
            <input
              type="radio"
              name="sort"
              id=""
              checked={state.sortOption === "high-to-low"}
              onChange={() =>
                dispatch({ type: "TOGGLE_SORT", payload: "high-to-low" })
              }
            />
            <label htmlFor="sort">High to Low</label>
          </div>
        </div>
        <div className="price-range">
          <h3>Price Range</h3>
          <div>
            <input
              type="range"
              name="price-range"
              list="tickmarks"
              min="0"
              max="1000"
              step="100"
              value={state.priceRange}
              onChange={(e) =>
                dispatch({ type: "PRICE_RANGE", payload: e.target.value })
              }
            />
            <div className="range-value">
              <p>0</p>
              <p>{state.priceRange}</p>
            </div>
            <datalist id="tickmarks">
              <option value="0"></option>
              <option value="100"></option>
              <option value="200"></option>
              <option value="300"></option>
              <option value="400"></option>
              <option value="500"></option>
              <option value="600"></option>
              <option value="700"></option>
              <option value="800"></option>
              <option value="900"></option>
              <option value="1000"></option>
            </datalist>
          </div>
        </div>
        <div className="other-filter">
          <h3>Other Filters</h3>
          <div>
            <input
              type="checkbox"
              name="fast"
              id=""
              checked={state.deliveryOption}
              onChange={() =>
                dispatch({
                  type: "TOGGLE_DELIVERY_OPTION",
                  payload: !state.deliveryOption,
                })
              }
            />
            <label htmlFor="fast">Include Xpress delivery</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="outofstock"
              id=""
              checked={state.inStock}
              onChange={() =>
                dispatch({
                  type: "TOGGLE_INSTOCK_OPTION",
                  payload: !state.inStock,
                })
              }
            />
            <label htmlFor="outofstock">Include In-stock Only</label>
          </div>
        </div>
      </div>
    </>
  );
}
