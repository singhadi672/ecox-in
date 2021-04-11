import {
  faStar,
  faHeart as heartFull,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useProducts } from "../../contexts/useProducts";
import "./products.css";
import { ratingGenerator, findItemById } from "../../util";
import { SideMenu } from "../SideMenu/SideMenu";
import { faHeart as heartEmpty } from "@fortawesome/free-regular-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";

export function Products() {
  const { filteredData, dispatch, state } = useProducts();
  const query = new URLSearchParams(useLocation().search);
  const value = query.get("category");

  function filterCategory(value) {
    return value
      ? filteredData.filter((item) => item.productCategory === value)
      : filteredData;
  }

  function handleCartAdd(product, state) {
    return !!state.cartItems.find((item) => item.id === product.id)
      ? dispatch({ type: "REMOVE_ITEM_FROM_CART", product })
      : dispatch({ type: "ADD_PRODUCT_TO_CART", product });
  }

  function handleWishlistAdd(product, state) {
    return !!state.wishlist.find((item) => item.id === product.id)
      ? dispatch({ type: "REMOVE_ITEM_FROM_WISHLIST", product })
      : dispatch({ type: "ADD_PRODUCT_TO_WISHLIST", product });
  }

  let navigate = useNavigate();
  const finalData = filterCategory(value);
  return (
    <div className="products-main">
      <div className="products-side-menu">
        <SideMenu />
      </div>
      <div className="products-all">
        <div className="product-category">
          <button
            onClick={() => navigate("../products")}
            className={value === null ? "category-btn-active" : "category-btn"}
          >
            All
          </button>
          <button
            onClick={() => navigate("../products?category=tent")}
            className={
              value === "tent" ? "category-btn-active" : "category-btn"
            }
          >
            Tents
          </button>
          <button
            onClick={() => navigate("../products?category=ropes")}
            className={
              value === "ropes" ? "category-btn-active" : "category-btn"
            }
          >
            Ropes
          </button>
          <button
            onClick={() => navigate("../products?category=shoes")}
            className={
              value === "shoes" ? "category-btn-active" : "category-btn"
            }
          >
            Shoes
          </button>
          <button
            onClick={() => navigate("../products?category=bags")}
            className={
              value === "bags" ? "category-btn-active" : "category-btn"
            }
          >
            Bags
          </button>
          <button
            onClick={() => navigate("../products?category=jackets")}
            className={
              value === "jackets" ? "category-btn-active" : "category-btn"
            }
          >
            Jackets
          </button>
          <button
            onClick={() => navigate("../products?category=gloves")}
            className={
              value === "gloves" ? "category-btn-active" : "category-btn"
            }
          >
            Gloves
          </button>
        </div>
        <div className="products">
          {finalData.map((product) => (
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
                    onClick={() => handleWishlistAdd(product, state)}
                  >
                    <FontAwesomeIcon
                      icon={
                        findItemById(product, state.wishlist)
                          ? heartFull
                          : heartEmpty
                      }
                      size="lg"
                    />
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
                      {product.inStock
                        ? findItemById(product, state.cartItems)
                          ? "Remove from cart"
                          : "Add to cart"
                        : "Out of stock"}
                    </button>
                    <button
                      className="product-buy-btn btn-active"
                      onClick={() => navigate(`/products/${product.id}`)}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
