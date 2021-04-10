import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useProducts } from "../../contexts/useProducts";
import "./cart.css";

export function Cart() {
  const { state, dispatch } = useProducts();
  const { cartItems } = state;
  function calculateTotal(acc, value) {
    return (acc += parseFloat(value.price * value.quantity));
  }
  return (
    <div className="cart">
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item">
            <img src={item.image} alt="" />
            <div className="cart-item-desc">
              <h2>
                {item.name}({item.color})
              </h2>
              <h5>{item.brand}</h5>
              <h3>$ {item.price}</h3>
              <div className="cart-item-quantity">
                <button
                  class="item-quantity-btn"
                  onClick={() =>
                    dispatch({
                      type: "QUANTITY_DEC",
                      product: item,
                      payload: 1,
                    })
                  }
                >
                  –
                </button>
                {item.quantity}
                <button
                  class="item-quantity-btn"
                  onClick={() =>
                    dispatch({
                      type: "QUANTITY_INC",
                      product: item,
                      payload: 1,
                    })
                  }
                >
                  +
                </button>
              </div>
            </div>
            <FontAwesomeIcon
              icon={faTrash}
              className="cart-item-delete"
              onClick={() =>
                dispatch({ type: "REMOVE_ITEM_FROM_CART", product: item })
              }
            />
          </div>
        ))}
        <div>
          <button
            className="cart-clear-btn"
            onClick={() => dispatch({ type: "CLEAR_CART" })}
          >
            Clear All
          </button>
        </div>
      </div>
      <div className="price-details">
        <h1>PRICE DETAILS</h1>
        <div className="cart-total">
          <p>Total MRP</p>
          <p className="value">
            {" "}
            ${state.cartItems.reduce(calculateTotal, 0).toFixed(2)}
          </p>
        </div>
        <div className="cart-total">
          <p>Delivery Charges</p>
          <p className="value free">FREE</p>
        </div>
        <hr />
        <div className="cart-total">
          <p>Total Amount</p>
          <p className="value">
            {" "}
            ${state.cartItems.reduce(calculateTotal, 0).toFixed(2)}
          </p>
        </div>
        <div className="cart-total buy-btn">
          <button>Checkout</button>
        </div>
      </div>
    </div>
  );
}
