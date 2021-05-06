import React from "react";
import "./nav.css";
import img from "../../images/logo-img.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHeart,
  faShoppingCart,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useProducts } from "../../contexts/useProducts";
import { useAuth } from "../../contexts/auth-context";

export function Nav() {
  const { state, sideMenustatus, setSideMenuStatus } = useProducts();
  let navigate = useNavigate();
  const states = useLocation();
  return (
    <nav className="nav-main">
      <div className="nav-section-top">
        <div className="nav-logo">
          <div className="nav-side-menu-mobile">
            <FontAwesomeIcon
              icon={faBars}
              onClick={() =>
                setSideMenuStatus((sideMenuStatus) => !sideMenuStatus)
              }
            />
          </div>
          <img src={img} alt="logo-img" />
          <h1 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            Ecox.in
          </h1>
        </div>
        <div className="other-options-mobile">
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
                <sup className="item-notification">
                  {state.cartItems.length}
                </sup>
              )}
            </button>
          </NavLink>
          <button className="sign-in-btn">Sign In</button>
        </div>
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
