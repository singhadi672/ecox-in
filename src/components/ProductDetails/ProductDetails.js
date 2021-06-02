import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../contexts/useProducts";
import "./productDetails.css";
import axios from "axios";
import { Toast } from "../Toast/Toast";
import { AddToCartButton } from "../Products/AddToCartButton";
import { useAuth } from "../../contexts/auth-context";

export function ProductDetails() {
  const { id } = useParams();
  let navigate = useNavigate();
  const [toast, setToast] = useState({
    status: false,
    heading: "",
    msg: "",
    error: false,
  });

  const { filteredData } = useProducts();
  const { state, dispatch } = useAuth();

  const product = filteredData.find((item) => item._id === id);

  async function handleCartAdd(product, state, setCartLoader) {
    const isProduct = !!state.cartItems.find(
      (item) => item.product._id === product._id
    );
    if (isProduct) {
      try {
        setCartLoader((loader) => true);
        setToast({ ...toast, status: false, error: false });
        const response = await axios.delete(
          "https://damp-mesa-30814.herokuapp.com/cart",
          { data: { productId: product._id } }
        );
        if (response.data.success) {
          setToast({
            ...toast,
            status: true,
            heading: "Item Removed!",
            msg: `${product.name} is removed from the cart`,
          });
          dispatch({ type: "REMOVE_ITEM_FROM_CART", product });
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
    } else {
      try {
        setToast({ ...toast, status: false, error: false });
        setCartLoader(true);
        const response = await axios.post(
          "https://damp-mesa-30814.herokuapp.com/cart",
          { productId: product._id }
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

  return (
    <>
      {product ? (
        <div className="details">
          <div className="product-detail">
            <div className="product-detail-img">
              <img src={product.image} alt="" />
            </div>
            <div className="product-detail-desc">
              <h2>{product.name}</h2>
              <h4>By {product.brand}</h4>
              <p className="product-description">
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
                <span className="desc-heading">Material:</span>{" "}
                {product.material}
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
                <AddToCartButton
                  state={state}
                  product={product}
                  handleCartAdd={handleCartAdd}
                />
                <button
                  onClick={() => {
                    navigate(-1);
                  }}
                  className="detail-back-btn"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {toast.status&&<Toast toast={toast} setToast={setToast} />}
    </>
  );
}
