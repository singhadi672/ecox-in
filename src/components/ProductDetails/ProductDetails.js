import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../contexts/useProducts";
import "./productDetails.css";
import { findItemById } from "../../util";

export function ProductDetails() {
  const { id } = useParams();
  let navigate = useNavigate();

  const { filteredData, state, dispatch } = useProducts();

  const product = filteredData.find((item) => item.id === id);

  function handleCartAdd(product, state) {
    return !!state.cartItems.find((item) => item.id === product.id)
      ? dispatch({ type: "REMOVE_ITEM_FROM_CART", product })
      : dispatch({ type: "ADD_PRODUCT_TO_CART", product });
  }

  return (
    <div className="details">
      <div className="product-detail">
        <div className="product-detail-img">
          <img src={product.image} alt="" />
        </div>
        <div className="product-detail-desc">
          <h2>{product.name}</h2>
          <h4>By {product.brand}</h4>
          <p>
            <span className="desc-heading">Description:</span>{" "}
            {product.description}
          </p>
          <p>
            <span className="desc-heading">Price:</span> ${product.price}{" "}
            <small style={{ color: "grey" }}>( Inc. of all taxes)</small>
          </p>
          <p>
            <span className="desc-heading">Category:</span>{" "}
            {product.productCategory}
          </p>
          <p>
            <span className="desc-heading">Material:</span> {product.material}
          </p>
          <p
            style={{
              color: product.inStock ? "green" : "red",
              fontWeight: "500",
            }}
          >
            {product.inStock ? "IN STOCK" : "OUT OF STOCK"}
          </p>
          <div className="detail-btn">
            <button
              onClick={() => handleCartAdd(product, state)}
              className={
                product.inStock
                  ? "detail-btn-active"
                  : "detail-btn-inactive"
              }
            >
              {product.inStock
                ? findItemById(product, state.cartItems)
                  ? "Remove from cart"
                  : "Add to cart"
                : "Out of stock"}
            </button>
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="detail-back-btn"
            >
              Back To Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
