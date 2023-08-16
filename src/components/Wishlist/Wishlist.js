import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "../Products/products.css";
import { ratingGenerator } from "../../util";
import "./wishlist.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AddToCartFromWishlistButton } from "./AddToCartFromWishlistButton";
import { Toast } from "../Toast/Toast";
import { useAuth } from "../../contexts/auth-context";

export function Wishlist() {
  const { dispatch, state, toast, setToast } = useAuth();

  async function handleCartAdd(product, state, setCartLoader) {
    const isProduct = !!state.cartItems.find(
      (item) => item.product._id === product._id
    );
    if (isProduct === false) {
      setToast({ ...toast, status: false, error: false });
      setCartLoader(true);
      try {
        const response = await axios.post(
          "https://ecox-in-backend.vercel.app/cart",
          {
            productId: product._id,
          }
        );
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
  }

  async function handleWishlistAdd(product, state) {
    try {
      setToast({ ...toast, status: false, error: false });
      const response = await axios.delete(
        "https://ecox-in-backend.vercel.app/wishlist",
        {
          data: { productId: product.product._id },
        }
      );
      if (response.data.success) {
        setToast({
          ...toast,
          status: true,
          heading: "Item Removed from wishlist!",
          msg: `${product.product.name} is removed from wishlist`,
        });
        dispatch({ type: "REMOVE_ITEM_FROM_WISHLIST", ...product });
      }
    } catch (err) {
      setToast({
        ...toast,
        status: true,
        heading: "Error occured",
        msg: `not able to reach the server please try again later`,
        error: true,
      });
      console.log(err);
    }
  }

  let navigate = useNavigate();
  return (
    <>
      <h1 className="wishlist-heading">My Wishlist</h1>
      {state.wishlist.length > 0 ? (
        <>
          <div className="wishlist">
            {state.wishlist.map((item) => (
              <div className="product-card" key={item.product._id}>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="product-image"
                />
                <div className="product-details">
                  <div className="product-details-top">
                    <div>
                      <p className="product-offer">{item.product.offer}</p>
                    </div>
                    <button
                      className="wishlist-btn"
                      onClick={() => handleWishlistAdd(item, state)}
                    >
                      <FontAwesomeIcon icon={faTimes} size="lg" />
                    </button>
                  </div>
                  <div className="product-details-bottom">
                    <h2>{item.product.name}</h2>
                    <h4>{item.product.brand}</h4>
                    <div className="product-price-rating">
                      <div className="product-rating">
                        {ratingGenerator(item.product["ratings"]).map(
                          (rating) => (
                            <FontAwesomeIcon
                              icon={faStar}
                              style={{ color: "rgb(247, 168, 22)" }}
                            />
                          )
                        )}
                      </div>
                      <div className="product-price">
                        <p>$ {item.product.price}</p>
                      </div>
                    </div>
                    {item.product.inStock ? (
                      <p style={{ color: "#1DB954" }}>IN STOCK</p>
                    ) : (
                      <p style={{ color: "tomato" }}>OUT OF STOCK</p>
                    )}
                    {item.product.fastDelivery ? (
                      <small>(Xpress delivery)</small>
                    ) : (
                      <small>(standard delivery)</small>
                    )}
                    <div className="product-buy">
                      <AddToCartFromWishlistButton
                        state={state}
                        item={item}
                        handleCartAdd={handleCartAdd}
                      />
                      <button
                        className="product-buy-btn btn-active"
                        onClick={() =>
                          navigate(`/products/${item.product._id}`)
                        }
                      >
                        Product details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="cart-empty">
          <img
            src="https://danapointjewelers.com/assets/images/empty-wishlist.png"
            alt=""
          />
          <h2>"Wishlist is Empty"</h2>
        </div>
      )}
      {toast.status && <Toast toast={toast} setToast={setToast} />}
    </>
  );
}
