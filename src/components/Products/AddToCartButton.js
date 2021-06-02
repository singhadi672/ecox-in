import { useState } from "react";
import { findItemById } from "../../util";

export function AddToCartButton({ product, state, handleCartAdd }) {
  const [cartLoader, setCartLoader] = useState(false);

  return (
    <button
      className={
        product.inStock
          ? "product-buy-btn btn-active"
          : "product-buy-btn btn-inactive"
      }
      id={cartLoader ? "loader-active" : "loader-inactive"}
      onClick={() => handleCartAdd(product, state, setCartLoader)}
    >
      {product.inStock
        ? findItemById(product, state.cartItems)
          ? cartLoader
            ? "Removing..."
            : "Remove from cart"
          : cartLoader
          ? "Adding..."
          : "Add to cart"
        : "Out of stock"}
    </button>
  );
}
