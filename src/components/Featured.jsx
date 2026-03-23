import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "../css/Featured.css";

const Featured = ({ products, onAddToCart, favorites, onToggleFavorite }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setFeaturedProducts(products.slice(0, 6));
    }
  }, [products]);

  return (
    <section className="featured-viewport">
      <div className="featured-wrapper">
        <div className="featured-header">
          <div className="header-text">
            <span className="featured-pre">THE CURATED DROP</span>
            <h2 className="featured-main-title">
              The <span className="italic-serif">Forever</span> Collection
            </h2>
          </div>
          <Link to="/products" className="featured-action-link">
            See All Creations <span>→</span>
          </Link>
        </div>

        <div className="featured-masonry">
          {featuredProducts.map((product) => (
            <div key={product.id} className="featured-item-wrapper">
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                favorites={favorites}
                onToggleFavorite={onToggleFavorite}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
