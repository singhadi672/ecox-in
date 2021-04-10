import React from "react";
import "./nav.css";
import img from "../../images/logo-img.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHeart,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useProducts } from "../../contexts/useProducts";

export function Nav() {
  const { state } = useProducts();
  return (
    <nav className="nav-main">
      <div className="nav-logo">
        <img src={img} alt="logo-img" />
        <h1>Ecox.in</h1>
      </div>
      <div className="nav-search">
        <input
          type="text"
          name="search"
          id=""
          className="input-search"
          placeholder="search products"
        />
        <button className="search-logo">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className="other-options">
        <NavLink to="/wishlist">
          <button className="options-btn">
            <FontAwesomeIcon icon={faHeart} size="lg" />
            {state.wishlist.length > 0 && (
              <sup className="item-notification">{state.wishlist.length}</sup>
            )}
          </button>
        </NavLink>
        <NavLink to="/cart">
          <button className="options-btn">
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            {state.cartItems.length > 0 && (
              <sup className="item-notification">{state.cartItems.length}</sup>
            )}
          </button>
        </NavLink>
        <button className="sign-in-btn">Sign In</button>
      </div>
    </nav>
  );
}
