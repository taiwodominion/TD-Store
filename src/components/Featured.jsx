import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// REMOVED: import { products } from "../data/products"; <--- This was the error
import ProductCard from "../components/ProductCard";
import "../css/Featured.css";

const Featured = ({ products, onAddToCart }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // If products exist, take the first 7
    if (products && products.length > 0) {
      setFeaturedProducts(products.slice(0, 7));
    }
  }, [products]); // Added [products] here so it updates once the Firebase data arrives

  return (
    <section className="featured-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Products</h2>
          <Link to="/products" className="section-link">
            View All Products →
          </Link>
        </div>

        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;