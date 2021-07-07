import React, { useState } from "react";
import {
  faHeart as heartFull,
  faHeartbeat,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartEmpty } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { findItemById } from "../../util";

export function AddToWishlistButton({ state, product, handleWishlistAdd }) {
  const [wishlistLoader, setWishlistLoader] = useState(false);

  return (
    <button
      className="wishlist-btn"
      onClick={() => handleWishlistAdd(product, state, setWishlistLoader)}
      id={wishlistLoader ? "loader-active" : "loader-inactive"}
    >
      <FontAwesomeIcon
        icon={
          wishlistLoader
            ? faHeartbeat
            : findItemById(product, state.wishlist)
            ? heartFull
            : heartEmpty
        }
        size="lg"
      />
    </button>
  );
}
