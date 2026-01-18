import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "../css/Featured.css";

const Featured = ({ products, onAddToCart, favorites, onToggleFavorite }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setFeaturedProducts(products.slice(0, 7));
    }
  }, [products]);

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
              favorites={favorites} // Must pass this
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;