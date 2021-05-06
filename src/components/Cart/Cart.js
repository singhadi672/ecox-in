import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useProducts } from "../../contexts/useProducts";
import "./cart.css";
import { Toast } from "../Toast/Toast";
import { CartQuantityButton } from "./CartQuantityButton";

export function Cart() {
  const { state, dispatch } = useProducts();
  const { cartItems } = state;
  const [toast, setToast] = useState({
    status: false,
    heading: "",
    msg: "",
    error: false,
  });
  function calculateTotal(acc, value) {
    return (acc += parseInt(value.product.price * value.quantity));
  }

  async function toggleQuantity(item, type, setQuantityTab) {
    if (item.quantity < 2 && type === "dec") {
      try {
        setToast({ ...toast, status: false, error: false });
        setQuantityTab(true);
        const response = await axios.delete(
          "https://damp-mesa-30814.herokuapp.com/cart",
          { data: { productId: item.product._id } }
        );
        const { product } = item;
        if (response.data.success) {
          setToast({
            ...toast,
            status: true,
            heading: "Item Removed!",
            msg: `${item.product.name} is removed from cart`,
          });
          dispatch({ type: "REMOVE_ITEM_FROM_CART", product });
          setQuantityTab(false);
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
        setQuantityTab(false);
      }
    } else {
      try {
        const body = { type };
        setQuantityTab(true);
        setToast({ ...toast, status: false, error: false });
        const response = await axios.post(
          `https://damp-mesa-30814.herokuapp.com/cart/${item.product._id}`,
          body
        );

        if (response.data.success) {
          setQuantityTab(false);
          if (type === "dec") {
            setToast({
              ...toast,
              status: true,
              heading: "Quantity Decreased!",
              msg: `you have changed ${item.product.name}'s quantity to ${
                item.quantity - 1
              }`,
            });
            dispatch({
              type: "QUANTITY_DEC",
              product: item,
              payload: 1,
            });
          } else if (type === "inc") {
            setToast({
              ...toast,
              status: true,
              heading: "Quantity Increased!",
              msg: `you have changed ${item.product.name}'s quantity to ${
                item.quantity + 1
              }`,
            });
            dispatch({
              type: "QUANTITY_INC",
              product: item,
              payload: 1,
            });
          }
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
        setQuantityTab(false);
      }
    }
  }

  async function deleteItemFromCart(product) {
    try {
      setToast({ ...toast, status: false, error: false });
      const response = await axios.delete(
        "https://damp-mesa-30814.herokuapp.com/cart",
        { data: { productId: product._id } }
      );
      console.log(response);
      if (response.data.success) {
        setToast({
          ...toast,
          status: true,
          heading: "Item Removed!",
          msg: `${product.name} is removed from cart`,
        });
        dispatch({ type: "REMOVE_ITEM_FROM_CART", product });
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

  return (
    <>
      <h1 className="cart-heading">My Cart</h1>
      {cartItems.length > 0 ? (
        <div className="cart">
          <div className="cart-items">
            <div>
              <button
                className="cart-clear-btn"
                onClick={() => dispatch({ type: "CLEAR_CART" })}
              >
                Clear All
              </button>
            </div>
            {cartItems.map((item) => (
              <div className="cart-item">
                <img src={item.product.image} alt="" />
                <div className="cart-item-desc">
                  <h2>
                    {item.product.name}({item.product.color})
                  </h2>
                  <h5>{item.product.brand}</h5>
                  <h3>$ {item.product.price}</h3>
                  <div className="cart-item-quantity">
                    <CartQuantityButton
                      item={item}
                      toggleQuantity={toggleQuantity}
                    />
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faTrash}
                  className="cart-item-delete"
                  onClick={() => deleteItemFromCart(item.product)}
                />
              </div>
            ))}
          </div>
          <div className="price-details">
            <h1>PRICE DETAILS</h1>
            <div className="cart-total section">
              <p>Total MRP</p>
              <p className="value">
                {" "}
                ${state.cartItems.reduce(calculateTotal, 0)}
              </p>
            </div>
            <div className="cart-total section">
              <p>Delivery Charges</p>
              <p className="value free">FREE</p>
            </div>
            <hr className="section" />
            <div className="cart-total">
              <p>Total Amount</p>
              <p className="value">
                {" "}
                ${state.cartItems.reduce(calculateTotal, 0)}
              </p>
            </div>
            <div className="cart-total buy-btn">
              <button>Checkout</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart-empty">
          <img
            src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
            alt=""
          />
          <h2>"Cart is Empty"</h2>
        </div>
      )}
      <Toast toast={toast} setToast={setToast} />
    </>
  );
}
