import React, { useState } from "react";

export function CartQuantityButton({ toggleQuantity, item }) {
  const [quantityTab, setQuantityTab] = useState(false);

  return (
    <>
      <button
        className={
          quantityTab
            ? "item-quantity-btn quantity-inactive"
            : "item-quantity-btn"
        }
        onClick={() => toggleQuantity(item, "dec", setQuantityTab)}
      >
        –
      </button>
      <span>{item.quantity}</span>
      <button
        className={
          quantityTab
            ? "item-quantity-btn quantity-inactive"
            : "item-quantity-btn"
        }
        onClick={() => toggleQuantity(item, "inc", setQuantityTab)}
      >
        +
      </button>
    </>
  );
}
