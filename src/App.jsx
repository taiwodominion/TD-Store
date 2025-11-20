import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./css/App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import ProductDetail from "./components/ProductDetail";
import Cart from "./pages/Cart";
import { FavoritesProvider } from './contexts/FavoritesContext';

const App = () => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (
    product,
    selectedSize = null,
    selectedColor = null,
    quantity = 1
  ) => {
    const existingItemIndex = cartItems.findIndex(
      (item) =>
        item.id === product.id &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
    );

    if (existingItemIndex >= 0) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += quantity;
      setCartItems(updatedCart);
    } else {
      const newItem = {
        ...product,
        selectedSize,
        selectedColor,
        quantity,
        cartId: Date.now() + Math.random(),
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const handleUpdateItem = (cartId, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(cartId);
      return;
    }

    const updatedCart = cartItems.map((item) =>
      item.cartId === cartId ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
  };

  const handleRemoveItem = (cartId) => {
    const updatedCart = cartItems.filter((item) => item.cartId !== cartId);
    setCartItems(updatedCart);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <>
      <Navbar cartItems={cartItems} />

      <Routes>
        <Route path="/" element={<Home onAddToCart={addToCart} />} />
        {/* <Route path="/products" element={<Products onAddToCart={addToCart} />} /> */}
        <Route
          path="/products"
          element={<Products onAddToCart={addToCart} cartItems={cartItems} />}
        />

        <Route path="/product/:productId" element={<ProductDetail onAddToCart={handleAddToCart} />} />

        <Route
          path="/categories"
          element={<Categories onAddToCart={addToCart} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              onUpdateItem={handleUpdateItem}
              onRemoveItem={handleRemoveItem}
              onClearCart={clearCart}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
