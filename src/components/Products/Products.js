import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useProducts } from "../../contexts/products-context";
import "./products.css";
import { ratingGenerator } from "../../util";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

export function Products() {
  const { productsData } = useProducts();
  return (
    <div className="products">
      {productsData.map((product) => (
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
              <button className="wishlist-btn">
                <FontAwesomeIcon icon={faHeart} size="lg"/>
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
                >
                  {product.inStock ? "Add to cart" : "Out of stock"}
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
