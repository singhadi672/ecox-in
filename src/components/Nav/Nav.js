import React from "react";
import "./nav.css";
import img from "../../images/logo-img.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHeart,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

export function Nav() {
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
        <button className="options-btn">
          <FontAwesomeIcon icon={faHeart} size="lg" />
          <sup className="item-notification">0</sup>
        </button>
        <button className="options-btn">
          <FontAwesomeIcon icon={faShoppingCart} size="lg" />
          <sup className="item-notification">0</sup>
        </button>
        <button className="sign-in-btn">Sign In</button>
      </div>
    </nav>
  );
}
