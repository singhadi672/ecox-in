import React, { useState } from "react";
import { useAuth } from "../../contexts/auth-context";

export function CartQuantityButton({ toggleQuantity, item }) {
  const { quantityTab, setQuantityTab } = useAuth();

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
