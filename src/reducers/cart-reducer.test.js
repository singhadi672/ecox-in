import { cartReducer } from "./cart-reducer";

describe("testing cart reducers", () => {
  it("should add items to the cart", () => {
    const initialState = {
      cartItems: [],
      wishlist: [],
    };
    const action = {
      type: "ADD_PRODUCT_TO_CART",
      product: { name: "item1", price: 500, id: "1234" },
    };

    let state = cartReducer(initialState, action);
    expect(state).toStrictEqual({
      cartItems: [
        { product: { name: "item1", price: 500, id: "1234" }, quantity: 1 },
      ],
      wishlist: [],
    });
  });

  it("should remove item from cart", () => {
    const action = {
      type: "REMOVE_ITEM_FROM_CART",
      product: { name: "item2", price: 1000, _id: "1235" },
    };

    const initialState = {
      cartItems: [
        { product: { name: "item1", price: 500, _id: "1234" }, quantity: 4 },
        { product: { name: "item2", price: 1000, _id: "1235" }, quantity: 1 },
        { product: { name: "item3", price: 1200, _id: "1238" }, quantity: 10 },
      ],
      wishlist: [],
    };

    const state = cartReducer(initialState, action);

    expect(state).toStrictEqual({
      cartItems: [
        { product: { name: "item1", price: 500, _id: "1234" }, quantity: 4 },
        { product: { name: "item3", price: 1200, _id: "1238" }, quantity: 10 },
      ],
      wishlist: [],
    });
  });

  it("should remove item if quantity is less than 1", () => {
    let action = {
      type: "QUANTITY_DEC",
      product: {
        product: { name: "item2", price: 1000, _id: "1235" },
        quantity: 1,
      },
      payload: 1,
    };

    let initialState = {
      cartItems: [
        { product: { name: "item1", price: 500, _id: "1234" }, quantity: 4 },
        { product: { name: "item2", price: 1000, _id: "1235" }, quantity: 1 },
        { product: { name: "item3", price: 1200, _id: "1238" }, quantity: 10 },
      ],
      wishlist: [],
    };

    let state = cartReducer(initialState, action);
    expect(state).toStrictEqual({
      cartItems: [
        { product: { name: "item1", price: 500, _id: "1234" }, quantity: 4 },
        { product: { name: "item3", price: 1200, _id: "1238" }, quantity: 10 },
      ],
      wishlist: [],
    });
  });

  it("should reduce the cart quantity when user clicks reduce quantity button", () => {
    const action = {
      type: "QUANTITY_DEC",
      product: {
        product: { name: "item3", price: 1200, _id: "1238" },
        quantity: 10,
      },
      payload: 1,
    };

    const initialState = {
      cartItems: [
        { product: { name: "item1", price: 500, _id: "1234" }, quantity: 4 },
        { product: { name: "item2", price: 1000, _id: "1235" }, quantity: 1 },
        {
          product: { name: "item3", price: 1200, _id: "1238" },
          quantity: 10,
        },
      ],
      wishlist: [],
    };

    const state = cartReducer(initialState, action);

    expect(state).toStrictEqual({
      cartItems: [
        { product: { name: "item1", price: 500, _id: "1234" }, quantity: 4 },
        { product: { name: "item2", price: 1000, _id: "1235" }, quantity: 1 },
        {
          product: { name: "item3", price: 1200, _id: "1238" },
          quantity: 9,
        },
      ],
      wishlist: [],
    });
  });

  it("should increase the quantity when user click on inc quantity button", () => {
    const action = {
      type: "QUANTITY_INC",
      product: {
        product: { name: "item1", price: 500, _id: "1234" },
        quantity: 4,
      },
      payload: 1,
    };

    const initialState = {
      cartItems: [
        { product: { name: "item1", price: 500, _id: "1234" }, quantity: 4 },
        { product: { name: "item2", price: 1000, _id: "1235" }, quantity: 1 },
        {
          product: { name: "item3", price: 1200, _id: "1238" },
          quantity: 10,
        },
      ],
      wishlist: [],
    };

    const state = cartReducer(initialState, action);

    expect(state).toStrictEqual({
      cartItems: [
        { product: { name: "item1", price: 500, _id: "1234" }, quantity: 5 },
        { product: { name: "item2", price: 1000, _id: "1235" }, quantity: 1 },
        {
          product: { name: "item3", price: 1200, _id: "1238" },
          quantity: 10,
        },
      ],
      wishlist: [],
    });
  });

  it("should clear cart when user clickes on clear cart button", () => {
    const action = {
      type: "CLEAR_CART",
    };

    const initialState = {
      cartItems: [
        { product: { name: "item1", price: 500, _id: "1234" }, quantity: 4 },
        { product: { name: "item2", price: 1000, _id: "1235" }, quantity: 1 },
        {
          product: { name: "item3", price: 1200, _id: "1238" },
          quantity: 10,
        },
      ],
      wishlist: [],
    };

    const state = cartReducer(initialState, action);
    expect(state).toStrictEqual({ cartItems: [], wishlist: [] });
  });

  it("should add an item to the wishlist", () => {
    const action = {
      type: "ADD_PRODUCT_TO_WISHLIST",
      product: { name: "item1", price: 500, _id: "1234" },
    };

    const initialState = {
      cartItems: [
        { product: { name: "item1", price: 500, _id: "1234" }, quantity: 4 },
        { product: { name: "item2", price: 1000, _id: "1235" }, quantity: 1 },
        {
          product: { name: "item3", price: 1200, _id: "1238" },
          quantity: 10,
        },
      ],
      wishlist: [],
    };

    const state = cartReducer(initialState, action);

    expect(state).toStrictEqual({
      cartItems: [
        { product: { name: "item1", price: 500, _id: "1234" }, quantity: 4 },
        { product: { name: "item2", price: 1000, _id: "1235" }, quantity: 1 },
        {
          product: { name: "item3", price: 1200, _id: "1238" },
          quantity: 10,
        },
      ],
      wishlist: [{ product: { name: "item1", price: 500, _id: "1234" } }],
    });
  });

  it("should remove an item to the wishlist", () => {
    const action = {
      type: "REMOVE_ITEM_FROM_WISHLIST",
      product: { name: "item2", price: 1000, _id: "1235" },
    };

    const initialState = {
      cartItems: [
        { product: { name: "item1", price: 500, _id: "1234" }, quantity: 4 },
        { product: { name: "item2", price: 1000, _id: "1235" }, quantity: 1 },
        {
          product: { name: "item3", price: 1200, _id: "1238" },
          quantity: 10,
        },
      ],
      wishlist: [
        { product: { name: "item1", price: 500, _id: "1234" } },
        { product: { name: "item2", price: 1000, _id: "1235" } },
      ],
    };

    const state = cartReducer(initialState, action);

    expect(state).toStrictEqual({
      cartItems: [
        { product: { name: "item1", price: 500, _id: "1234" }, quantity: 4 },
        { product: { name: "item2", price: 1000, _id: "1235" }, quantity: 1 },
        {
          product: { name: "item3", price: 1200, _id: "1238" },
          quantity: 10,
        },
      ],
      wishlist: [{ product: { name: "item1", price: 500, _id: "1234" } }],
    });
  });
});
