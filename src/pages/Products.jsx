import React from "react";
// import Navbar from "../components/Navbar";
import AllProducts from "../components/AllProducts";
import Footer from "../components/Footer";

// 1. Add 'products' to the props received from App.jsx
const Products = ({ products, onAddToCart, cartItems }) => {
  return (
    <>
      <main>
        {/* 2. Pass 'products' down to AllProducts */}
        <AllProducts products={products} onAddToCart={onAddToCart} /> 
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Products;