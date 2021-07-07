import React, { useState } from "react";

export function AddToCartFromWishlistButton({ item, state, handleCartAdd }) {
  const [cartLoader, setCartLoader] = useState(false);

  return (
    <button
      className={
        item.product.inStock
          ? "product-buy-btn btn-active"
          : "product-buy-btn btn-inactive"
      }
      id={cartLoader ? "loader-active" : "loader-inactive"}
      onClick={() => handleCartAdd(item.product, state, setCartLoader)}
    >
      {item.product.inStock
        ? cartLoader
          ? "Adding..."
          : "Move to cart"
        : "Out of stock"}
    </button>
  );
}
