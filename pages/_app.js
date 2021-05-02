import { useReducer } from "react";
import CartContext from "../lib/Cart";

import "../styles/globals.css";

function cartReducer(state, action) {
  switch (action.type) {
    case "add":
      const product = state.find(({ id }) => id === action.product.id);
      console.log("add product =>", { product });
      if (product) {
        const products = state.map((item) => {
          if (item.id === action.product.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        return products;
      }
      action.product.quantity = 1;
      return [...state, action.product];
    case "remove":
      return [...state.filter((item) => item.id !== action.product.id)];

    case "increase":
      const products = state.map((item) => {
        if (item.id === action.product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return products;
    case "decrease":
      if (action.product.quantity) {
        const products = state.map((item) => {
          if (item.id === action.product.id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
        return products;
      }
      return state;
    default:
      return state;
  }
}

const totalReducer = (state, action) => {
  const total = action.reduce(
    (acc, current) => acc + current.quantity * current.price,
    0
  );
  return total;
};

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useReducer(cartReducer, []);
  const [total, setTotal] = useReducer(totalReducer, 0);

  return (
    <CartContext.Provider value={{ cart, setCart, total, setTotal }}>
      <Component {...pageProps} />
    </CartContext.Provider>
  );
}

export default MyApp;
