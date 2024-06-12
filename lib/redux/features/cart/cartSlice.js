"use client";
import { useSelector } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  products: [],
  totalAmount: 0,
};
let localCart;
try {
  localCart = JSON.parse(window.localStorage.getItem("cart"));
} catch (error) {
  localCart = {};
}

if (Array.isArray(localCart?.products) && !isNaN(localCart.totalAmount)) {
  initialState = {
    products: localCart.products,
    totalAmount: localCart.totalAmount,
  };
} else {
  window.localStorage.setItem("cart", JSON.stringify(initialState));
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existProduct = state.products.find((p) => p.id === product.id);

      if (existProduct) {
        state.products.forEach((p) => {
          if (p.id === existProduct.id) {
            p.count += product.count;
            p.total = p.count * p.price;
          }
          return p;
        });
      } else if (product.count > 0) {
        state.products = [
          ...state.products,
          { ...product, total: product.price * product.count },
        ];
      }

      if (existProduct?.count < 1) {
        state.products = state.products.filter((p) => p.id !== existProduct.id);
      }

      state.totalAmount = state.products.reduce(function (acc, cur) {
        return acc + Number(cur.total);
      }, 0);

      window.localStorage.setItem("cart", JSON.stringify(state));

      return state;
    },
    removeFromCart: (state, action) => {
      const id = action.payload;

      const products = state.products.filter((prc) => prc.id !== id);
      const totalAmount = products.reduce(function (acc, cur) {
        return acc + Number(cur.total);
      }, 0);

      state = {
        ...state,
        totalAmount,
        products,
      };

      window.localStorage.setItem("cart", JSON.stringify(state));
      return state;
    },
  },
});
export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;

export const useCartSelector = () => useSelector((state) => state.cart);
