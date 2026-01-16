import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { auth, db } from "./firebase"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore"; // Added Firestore imports

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import ProductDetail from "./components/ProductDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./pages/Cart";

import AdminDashboard from './admin/AdminDashboard'

import "./css/App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [allProducts, setAllProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // 1. FETCH ALL PRODUCTS FROM FIREBASE (Single Source of Truth)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAllProducts(productsArray);
      } catch (error) {
        console.error("Error fetching products from Firebase:", error);
      } finally {
        setProductsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 2. LISTEN FOR AUTH CHANGES
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 3. LOGOUT HANDLER
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  // 4. CART LOCALSTORAGE SYNC
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, selectedSize = null, selectedColor = null, quantity = 1) => {
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
    setCartItems(cartItems.map((item) =>
      item.cartId === cartId ? { ...item, quantity } : item
    ));
  };

  const handleRemoveItem = (cartId) => {
    setCartItems(cartItems.filter((item) => item.cartId !== cartId));
  };

  const clearCart = () => setCartItems([]);

  if (authLoading || productsLoading) {
    return  <div className="spinner-container">
      <div className="spinner">
        <div></div> <div></div> <div></div> <div></div> <div></div>
        <div></div> <div></div> <div></div> <div></div> <div></div>
      </div>
      <p>TDStore</p>
    </div>
  }

  const ProtectedAdmin = ({ user, children }) => {
  const ADMIN_EMAIL = "preciousope000@gmai.com";
  
  if (!user || user.email !== ADMIN_EMAIL) {
    return <div style={{ marginTop: '100px', textAlign: 'center' }}>
      <h2>Access Denied</h2>
      <p>You do not have permission to view this page.</p>
    </div>;
  }
  return children;
};

  return (
    <>
      {/* 5. PASS ALL PRODUCTS TO NAVBAR FOR SEARCH DROPDOWN */}
      <Navbar 
        cartItems={cartItems} 
        user={user} 
        onLogout={handleLogout} 
        products={allProducts} 
      />

      <Routes>
        {/* 6. PASS PRODUCTS TO PAGES */}
        <Route path="/" element={<Home onAddToCart={addToCart} products={allProducts} />} />
        
        <Route
          path="/products"
          element={<Products onAddToCart={addToCart} products={allProducts} />}
        />
        
        <Route
          path="/product/:productId"
          element={<ProductDetail onAddToCart={addToCart} products={allProducts} />}
        />
        
        <Route
          path="/categories"
          element={<Categories onAddToCart={addToCart} products={allProducts} />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <Profile user={user} />
            </ProtectedRoute>
          }
        />
        
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

        <Route 
  path="/admin" 
  element={
    <ProtectedAdmin user={user}>
      <AdminDashboard products={allProducts} />
    </ProtectedAdmin>
  } 
/>
      </Routes>
    </>
  );
};

export default App;