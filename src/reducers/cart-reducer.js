export function cartReducer(state, { type, product, payload }) {
  switch (type) {
    case "SET_CART_WISHLIST":
      return {
        ...state,
        cartItems: [...payload.cartData],
        wishlist: [...payload.wishlistData],
      };
    case "ADD_PRODUCT_TO_CART":
      return {
        ...state,
        cartItems: [...state.cartItems, { product, quantity: 1 }],
      };
    case "ADD_PRODUCT_TO_WISHLIST":
      return {
        ...state,
        wishlist: [...state.wishlist, {product}],
      };
    case "QUANTITY_DEC":
      return product.quantity > 1
        ? {
            ...state,
            cartItems: state.cartItems.map((item) =>
              product.product._id === item.product._id
                ? { ...item, quantity: item.quantity - payload }
                : item
            ),
          }
        : {
            ...state,
            cartItems: state.cartItems.filter((item) => item.product._id !== product.product._id),
          };
    case "QUANTITY_INC":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          product.product._id === item.product._id
            ? { ...item, quantity: item.quantity + payload }
            : item
        ),
      };
    case "REMOVE_ITEM_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.product._id !== product._id),
      };
    case "REMOVE_ITEM_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item.product._id !== product._id),
      };

    case "CLEAR_CART":
      return { ...state, cartItems: [] };
    case "TOGGLE_SORT":
      return { ...state, sortOption: payload };
    case "PRICE_RANGE":
      return { ...state, priceRange: payload };
    case "TOGGLE_DELIVERY_OPTION":
      return { ...state, deliveryOption: payload };
    case "TOGGLE_INSTOCK_OPTION":
      return { ...state, inStock: payload };
    default:
      return state;
  }
}
