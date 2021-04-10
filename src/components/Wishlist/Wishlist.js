import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useProducts } from "../../contexts/useProducts";
import "../Products/products.css";
import { ratingGenerator } from "../../util";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

export function Wishlist() {
  const { dispatch, state } = useProducts();

  function handleCartAdd(product, state) {
    return !!state.cartItems.find((item) => item.id === product.id)
      ? null
      : dispatch({ type: "ADD_PRODUCT_TO_CART", product });
  }

  return (
    <div className="products">
      {state.wishlist.map((product) => (
        <div className="product-card">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
          <div className="product-details">
            <div className="product-details-top">
              <div>
                <p className="product-offer">{product.offer}</p>
              </div>
              <button
                className="wishlist-btn"
                onClick={() =>
                  dispatch({ type: "REMOVE_ITEM_FROM_WISHLIST", product })
                }
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>
            </div>
            <div className="product-details-bottom">
              <h2>{product.name}</h2>
              <h4>{product.brand}</h4>
              <div className="product-price-rating">
                <div className="product-rating">
                  {ratingGenerator(product["ratings"]).map((rating) => (
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "rgb(247, 168, 22)" }}
                    />
                  ))}
                </div>
                <div className="product-price">
                  <p>$ {product.price}</p>
                </div>
              </div>
              {product.inStock ? (
                <p style={{ color: "#1DB954" }}>IN STOCK</p>
              ) : (
                <p style={{ color: "tomato" }}>OUT OF STOCK</p>
              )}
              {product.fastDelivery ? (
                <small>(Xpress delivery)</small>
              ) : (
                <small>(standard delivery)</small>
              )}
              <div className="product-buy">
                <button
                  className={
                    product.inStock
                      ? "product-buy-btn btn-active"
                      : "product-buy-btn btn-inactive"
                  }
                  onClick={() => handleCartAdd(product, state)}
                >
                  {product.inStock ? "Move to cart" : "Out of stock"}
                </button>
                <button className="product-buy-btn btn-active">
                  Product details
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
