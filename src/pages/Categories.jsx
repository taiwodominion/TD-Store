import React from "react";
import AllCategories from "../components/AllCategories";
import Footer from "../components/Footer";

const Categories = ({ products, onAddToCart, favorites, onToggleFavorite }) => {
  return (
    <>
      <main>
        <AllCategories 
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

export default Categories;