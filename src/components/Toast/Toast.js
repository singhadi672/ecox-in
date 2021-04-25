import React, { useEffect } from "react";
import "./toast.css";

export function Toast({ toast, setToast }) {
  useEffect(() => {
    const toastId = setTimeout(() => {
      setToast((toast) => false);
    }, 2500);

    return () => {
      clearTimeout(toastId);
    };
  }, [toast]);
  return (
    <div
      className={
        toast.error
          ? toast.status
            ? "toast-failure toast-inactive"
            : "toast-failure toast-active"
          : toast.status
          ? "toast-success toast-inactive"
          : "toast-success toast-active"
      }
    >
      <img
        src={
          toast.error
            ? "https://mpng.subpng.com/20180320/rue/kisspng-error-computer-icons-orange-error-icon-5ab143d3089ac7.8478409115215666750353.jpg"
            : "https://freepngimg.com/thumb/success/6-2-success-png-image.png"
        }
        alt=""
      />
      <div
        className={toast.error ? "toast-failure-text" : "toast-success-text"}
      >
        <h6>{toast.heading}</h6>
        <p>{toast.msg}</p>
      </div>
    </div>
  );
}
