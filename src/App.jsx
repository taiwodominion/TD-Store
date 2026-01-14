// import React, { useState, useEffect } from "react";
// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import "./css/App.css";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Register from "./pages/Register";
// import Categories from "./pages/Categories";
// import Products from "./pages/Products";
// import Contact from "./pages/Contact";
// import ProductDetail from "./components/ProductDetail";
// import Cart from "./pages/Cart";
// import { FavoritesProvider } from './contexts/FavoritesContext';

// const App = () => {
//   const [cartItems, setCartItems] = useState(() => {
//     const saved = localStorage.getItem("cart");
//     return saved ? JSON.parse(saved) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cartItems));
//   }, [cartItems]);

//   const addToCart = (
//     product,
//     selectedSize = null,
//     selectedColor = null,
//     quantity = 1
//   ) => {
//     const existingItemIndex = cartItems.findIndex(
//       (item) =>
//         item.id === product.id &&
//         item.selectedSize === selectedSize &&
//         item.selectedColor === selectedColor
//     );

//     if (existingItemIndex >= 0) {
//       const updatedCart = [...cartItems];
//       updatedCart[existingItemIndex].quantity += quantity;
//       setCartItems(updatedCart);
//     } else {
//       const newItem = {
//         ...product,
//         selectedSize,
//         selectedColor,
//         quantity,
//         cartId: Date.now() + Math.random(),
//       };
//       setCartItems([...cartItems, newItem]);
//     }
//   };

//   const handleUpdateItem = (cartId, quantity) => {
//     if (quantity <= 0) {
//       handleRemoveItem(cartId);
//       return;
//     }

//     const updatedCart = cartItems.map((item) =>
//       item.cartId === cartId ? { ...item, quantity } : item
//     );
//     setCartItems(updatedCart);
//   };

//   const handleRemoveItem = (cartId) => {
//     const updatedCart = cartItems.filter((item) => item.cartId !== cartId);
//     setCartItems(updatedCart);
//   };

//   const handleAddToCart = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     onAddToCart(product);
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   return (
//     <>
//       <Navbar cartItems={cartItems} />

//       <Routes>
//         <Route path="/" element={<Home onAddToCart={addToCart} />} />
//         {/* <Route path="/products" element={<Products onAddToCart={addToCart} />} /> */}
//         <Route
//           path="/products"
//           element={<Products onAddToCart={addToCart} cartItems={cartItems} />}
//         />

//         <Route path="/product/:productId" element={<ProductDetail onAddToCart={handleAddToCart} />} />

//         <Route
//           path="/categories"
//           element={<Categories onAddToCart={addToCart} />}
//         />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route
//           path="/cart"
//           element={
//             <Cart
//               cartItems={cartItems}
//               onUpdateItem={handleUpdateItem}
//               onRemoveItem={handleRemoveItem}
//               onClearCart={clearCart}
//             />
//           }
//         />
//       </Routes>
//     </>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { auth } from "./firebase"; // 1. IMPORT YOUR AUTH
import { onAuthStateChanged, signOut } from "firebase/auth"; // 2. IMPORT FIREBASE METHODS
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./css/App.css";
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

const App = () => {
  // --- AUTH STATE ---
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- CART STATE ---
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // 3. LISTEN FOR AUTH CHANGES
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Automatically updates whenever user logs in/out
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 4. LOGOUT HANDLER
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // No need to manually setUser(null) because onAuthStateChanged handles it
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  // --- CART LOGIC ---
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
    setCartItems(
      cartItems.map((item) =>
        item.cartId === cartId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (cartId) => {
    setCartItems(cartItems.filter((item) => item.cartId !== cartId));
  };

  const clearCart = () => setCartItems([]);

  if (loading) {
    return <div className="loading-screen">Loading td-store...</div>;
  }

  console.log("APP LEVEL - User State:", user ? user.email : "NO USER");

  return (
    <>
      {/* 5. PASS USER AND LOGOUT TO NAVBAR */}
      <Navbar cartItems={cartItems} user={user} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home onAddToCart={addToCart} />} />
        <Route
          path="/products"
          element={<Products onAddToCart={addToCart} cartItems={cartItems} />}
        />
        <Route
          path="/product/:productId"
          element={<ProductDetail onAddToCart={addToCart} />}
        />
        <Route
          path="/categories"
          element={<Categories onAddToCart={addToCart} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
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
      </Routes>
    </>
  );
};

export default App;
