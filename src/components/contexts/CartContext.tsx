import React, { createContext, useState } from "react";
import { Product } from "../types/product";

interface CartContextProps {
  children: React.ReactNode;
}

export const CartContext = createContext<{
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (name: string, color: string) => void;
  getTotalPrice: () => number;
}>({
  cart: [],
  addToCart: (product: Product) => {},
  removeFromCart: (name: string, color: string) => {},
  getTotalPrice: () => 0,
});

export const CartContextProvider: React.FC<CartContextProps> = ({
  children,
}) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (productToAdd: Product) => {
    const existingProduct = cart.find(
      (product) =>
        product.name === productToAdd.name &&
        product.color === productToAdd.color
    );

    if (existingProduct) {
      const updatedCart = cart.map((product) =>
        product === existingProduct
          ? { ...product, quantity: product.quantity + productToAdd.quantity }
          : product
      );
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, productToAdd]);
    }
  };

  const removeFromCart = (name: string, color: string) => {
    const updatedCart = cart.filter(
      (product) => !(product.name === name && product.color === color)
    );
    setCart(updatedCart);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
