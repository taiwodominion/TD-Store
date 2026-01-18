import React from "react";
// import Navbar from "../components/Navbar";
import AllProducts from "../components/AllProducts";
import Footer from "../components/Footer";

const Products = ({ products, onAddToCart, cartItems, favorites, onToggleFavorite }) => {
  return (
    <>
      <main>
        <AllProducts
          products={products} 
          onAddToCart={onAddToCart} 
          favorites={favorites}  
          onToggleFavorite={onToggleFavorite}
        /> 
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Products;