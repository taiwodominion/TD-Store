import React from "react";
// import Navbar from "../components/Navbar";
import AllCategories from "../components/AllCategories";
import Footer from "../components/Footer";

// 1. Accept 'products' and 'onAddToCart' as props from App.jsx
const Categories = ({ products, onAddToCart }) => {
  return (
    <>
      <main>
        {/* 2. Pass those props down to AllCategories */}
        <AllCategories products={products} onAddToCart={onAddToCart} />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Categories;