export function cartReducer(state, { type, product, payload }) {
  switch (type) {
    case "ADD_PRODUCT_TO_CART":
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          { ...product, quantity: product.quantity + 1 },
        ],
      };
    case "ADD_PRODUCT_TO_WISHLIST":
      return {
        ...state,
        wishlist: [...state.wishlist, product],
      };
    case "QUANTITY_DEC":
      return product.quantity > 1
        ? {
            ...state,
            cartItems: state.cartItems.map((item) =>
              product.id === item.id
                ? { ...item, quantity: item.quantity - payload }
                : item
            ),
          }
        : {
            ...state,
            cartItems: state.cartItems.filter((item) => item.id !== product.id),
          };
    case "QUANTITY_INC":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          product.id === item.id
            ? { ...item, quantity: item.quantity + payload }
            : item
        ),
      };
    case "REMOVE_ITEM_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== product.id),
      };
    case "REMOVE_ITEM_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item.id !== product.id),
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
