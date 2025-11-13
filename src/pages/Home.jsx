// import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import Hero from "../components/Hero";
// import HeroCategories from "../components/HeroCategories";
// import Featured from "../components/Featured";
// import NewArrivals from "../components/NewArrivals";
// import Testimonials from "../components/Testimonials";
// import Footer from "../components/Footer";

// const Home = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [user, setUser] = useState(null);
//   const [orders, setOrders] = useState([]);

//   // Load data from localStorage on mount
//   useEffect(() => {
//     const savedCart = localStorage.getItem('cart');
//     const savedUser = localStorage.getItem('user');
//     const savedOrders = localStorage.getItem('orders');

//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//     if (savedOrders) {
//       setOrders(JSON.parse(savedOrders));
//     }
//   }, []);

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cartItems));
//   }, [cartItems]);

//   // Save orders to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem('orders', JSON.stringify(orders));
//   }, [orders]);

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
//         cartId: Date.now() + Math.random() // Unique ID for cart item
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
//     <>
//       <nav>
//         <Navbar />
//       </nav>
//       <main>
//         <Hero />
//         <HeroCategories />
//         <Featured onAddToCart={addToCart} />
//         <NewArrivals />
//         <Testimonials />
//       </main>
//       <footer>
//         <Footer />
//       </footer>
//     </>
//   );
// };

// export default Home;







// import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import Hero from "../components/Hero";
// import HeroCategories from "../components/HeroCategories";
// import Featured from "../components/Featured";
// import NewArrivals from "../components/NewArrivals";
// import Testimonials from "../components/Testimonials";
// import Footer from "../components/Footer";

// const Home = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [user, setUser] = useState(null);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     const savedUser = localStorage.getItem("user");
//     const savedOrders = localStorage.getItem("orders");

//     if (savedCart) setCartItems(JSON.parse(savedCart));
//     if (savedUser) setUser(JSON.parse(savedUser));
//     if (savedOrders) setOrders(JSON.parse(savedOrders));
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cartItems));
//   }, [cartItems]);

//   useEffect(() => {
//     localStorage.setItem("orders", JSON.stringify(orders));
//   }, [orders]);

//   const addToCart = (product, selectedSize = null, selectedColor = null, quantity = 1) => {
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

//   return (
//     <>
//       <Navbar cartItems={cartItems} user={user} />
//       <main>
//         <Hero />
//         <HeroCategories />
//         <Featured onAddToCart={addToCart} />
//         <NewArrivals />
//         <Testimonials />
//       </main>
//       <Footer />
//     </>
//   );
// };

// export default Home;







import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HeroCategories from "../components/HeroCategories";
import Featured from "../components/Featured";
import NewArrivals from "../components/NewArrivals";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const Home = ({ onAddToCart, cartItems, user }) => {
  return (
    <>
      <Navbar cartItems={cartItems} user={user} />
      <main>
        <Hero />
        <HeroCategories />
        <Featured onAddToCart={onAddToCart} />
        <NewArrivals onAddToCart={onAddToCart} />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
};

export default Home;
