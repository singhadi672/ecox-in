import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useProducts } from "../../contexts/useProducts";
import "./products.css";
import { ratingGenerator } from "../../util";
import { SideMenu } from "../SideMenu/SideMenu";

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AddToCartButton } from "./AddToCartButton";
import { AddToWishlistButton } from "./AddToWishlistButton";
import { Toast } from "../Toast/Toast";
import { useAuth } from "../../contexts/auth-context";

export function Products() {
  const { filteredData } = useProducts();
  const { dispatch, state, login } = useAuth();
  const query = new URLSearchParams(useLocation().search);
  const value = query.get("category");
  const [toast, setToast] = useState({
    status: false,
    heading: "",
    msg: "",
    error: false,
  });

  function filterCategory(value) {
    return value
      ? filteredData.filter((item) => item.productCategory === value)
      : filteredData;
  }

  async function handleCartAdd(product, state, setCartLoader) {
    if (login) {
      const isProduct = !!state.cartItems.find(
        (item) => item.product._id === product._id
      );
      if (isProduct) {
        try {
          setCartLoader((loader) => true);
          setToast({ ...toast, status: false, error: false });
          const response = await axios.delete("http://localhost:4000/cart", {
            data: { productId: product._id },
          });
          if (response.data.success) {
            setToast({
              ...toast,
              status: true,
              heading: "Item Removed!",
              msg: `${product.name} is removed from the cart`,
            });
            dispatch({ type: "REMOVE_ITEM_FROM_CART", product });
            setCartLoader((loader) => false);
          }
        } catch (err) {
          console.log(err);
          setToast({
            ...toast,
            status: true,
            heading: "Error occured",
            msg: `not able to reach the server please try again later`,
            error: true,
          });
          setCartLoader((loader) => false);
        }
      } else {
        try {
          setToast({ ...toast, status: false, error: false });
          setCartLoader(true);
          const response = await axios.post("http://localhost:4000/cart", {
            productId: product._id,
          });
          if (response.data.success) {
            setToast({
              ...toast,
              status: true,
              heading: "Item Added!",
              msg: `${product.name} is added to the cart`,
            });
            dispatch({ type: "ADD_PRODUCT_TO_CART", product });
            setCartLoader(false);
          }
        } catch (err) {
          console.log(err);
          setToast({
            ...toast,
            status: true,
            heading: "Error occured",
            msg: `not able to reach the server please try again later`,
            error: true,
          });
          setCartLoader(false);
        }
      }
    } else {
      navigate("../login");
    }
  }

  async function handleWishlistAdd(product, state, setWishlistLoader) {
    if (login) {
      const isProduct = !!state.wishlist.find(
        (item) => item.product._id === product._id
      );
      if (isProduct) {
        try {
          setToast({ ...toast, status: false, error: false });
          setWishlistLoader(true);
          const response = await axios.delete(
            "http://localhost:4000/wishlist",
            {
              data: { productId: product._id },
            }
          );
          if (response.data.success) {
            setToast({
              ...toast,
              status: true,
              heading: "Item removed from Wishlist!",
              msg: `${product.name} is removed from wishlist`,
            });
            dispatch({ type: "REMOVE_ITEM_FROM_WISHLIST", product });
            setWishlistLoader(false);
          }
        } catch (err) {
          console.log(err);
          setToast({
            ...toast,
            status: true,
            heading: "Error occured",
            msg: `not able to reach the server please try again later`,
            error: true,
          });
          setWishlistLoader(false);
        }
      } else {
        try {
          setToast({ ...toast, status: false, error: false });
          setWishlistLoader(true);
          const response = await axios.post("http://localhost:4000/wishlist", {
            productId: product._id,
          });
          if (response.data.success) {
            setToast({
              ...toast,
              status: true,
              heading: "Item Wishlisted!",
              msg: `${product.name} is added to wishlist`,
            });
            dispatch({ type: "ADD_PRODUCT_TO_WISHLIST", product });
            setWishlistLoader(false);
          }
        } catch (err) {
          console.log(err);
          setToast({
            ...toast,
            status: true,
            heading: "Error occured",
            msg: `not able to reach the server please try again later`,
            error: true,
          });
          setWishlistLoader(false);
        }
      }
    } else {
      navigate("../login");
    }
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
            <div className="product-card" key={product._id}>
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
                  <AddToWishlistButton
                    state={state}
                    product={product}
                    handleWishlistAdd={handleWishlistAdd}
                  />
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
                    <AddToCartButton
                      state={state}
                      product={product}
                      handleCartAdd={handleCartAdd}
                    />
                    <button
                      className="product-buy-btn btn-active"
                      onClick={() => {
                        if (login) {
                          navigate(`/products/${product._id}`);
                        } else {
                          navigate("../login");
                        }
                      }}
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
      <Toast toast={toast} setToast={setToast} />
    </div>
  );
}
