// import React, { useState, useEffect } from 'react'
// import { Routes, Route } from 'react-router-dom'
// import Navbar from './components/Navbar'
// import Home from './pages/Home'
// import './css/App.css'
// import Login from './pages/Login'
// import Register from './pages/Register'
// import Categories from './pages/Categories'
// import Products from './pages/Products'
// import Contact from './pages/Contact'
// import Cart from './pages/Cart'
// import ProductCard from './components/ProductCard'

// const App = () => {
//   const [cartItems, setCartItems] = useState([])

//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cartItems));
//   }, [cartItems]);

//   const addToCart = (product, selectedSize = null, selectedColor = null, quantity = 1) => {
//     const existingItemIndex = cartItems.findIndex(
//       item =>
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
//         cartId: Date.now() + Math.random()
//       };
//       setCartItems([...cartItems, newItem]);
//     }
//   };

//   const updateCartItem = (cartId, quantity) => {
//     if (quantity <= 0) {
//       removeFromCart(cartId);
//       return;
//     }

//     const updatedCart = cartItems.map(item =>
//       item.cartId === cartId ? { ...item, quantity } : item
//     );
//     setCartItems(updatedCart);
//   };

//   const removeFromCart = (cartId) => {
//     const updatedCart = cartItems.filter(item => item.cartId !== cartId);
//     setCartItems(updatedCart);
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   return (
//     <Routes>
//       <Navbar
//           cartItems={cartItems}
//         />
//       <Route path='/' element={<Home />} />
//       <Route path='/products' element={<Products onAddToCart={addToCart} />} />
//       <Route path='/categories' element={<Categories onAddToCart={addToCart} />} />
//       <Route path='/login' element={<Login />} />
//       <Route path='/register' element={<Register />} />
//       <Route path='/contact' element={<Contact />} />
//       <Route path='/cart' element={<Cart />} />
//       <Route path='/product' element={<ProductCard />} />
//     </Routes>
//   )
// }

// export default App

// import React, { useState, useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import './css/App.css';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Categories from './pages/Categories';
// import Products from './pages/Products';
// import Contact from './pages/Contact';
// import Cart from './pages/Cart';

// const App = () => {
//   const [cartItems, setCartItems] = useState(() => {
//     // ✅ Load from localStorage when app starts
//     const saved = localStorage.getItem('cart');
//     return saved ? JSON.parse(saved) : [];
//   });

//   useEffect(() => {
//     // ✅ Save to localStorage whenever cart changes
//     localStorage.setItem('cart', JSON.stringify(cartItems));
//   }, [cartItems]);

//   // ✅ Add item to cart
//   const addToCart = (product, selectedSize = null, selectedColor = null, quantity = 1) => {
//     const existingItemIndex = cartItems.findIndex(
//       item =>
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

//   // ✅ Update item quantity
//   const handleUpdateItem = (cartId, quantity) => {
//     if (quantity <= 0) {
//       handleRemoveItem(cartId);
//       return;
//     }

//     const updatedCart = cartItems.map(item =>
//       item.cartId === cartId ? { ...item, quantity } : item
//     );
//     setCartItems(updatedCart);
//   };

//   // ✅ Remove item from cart
//   const handleRemoveItem = (cartId) => {
//     const updatedCart = cartItems.filter(item => item.cartId !== cartId);
//     setCartItems(updatedCart);
//   };

//   // ✅ Clear all items
//   const clearCart = () => {
//     setCartItems([]);
//   };

//   return (
//     <>
//       <Navbar cartItems={cartItems} />

//       <Routes>
//         <Route path="/" element={<Home onAddToCart={addToCart} />} />
//         <Route path="/products" element={<Products onAddToCart={addToCart} />} />
//         <Route path="/categories" element={<Categories onAddToCart={addToCart} />} />
//         <Route path="/login" element={<Login />} />
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
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./css/App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";

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
