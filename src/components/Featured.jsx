import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useApp } from "../contexts/AppContext";
import "../css/Featured.css";

const Featured = () => {
  const { allProducts, addToCart, favorites, toggleFavorite } = useApp();
  const featuredProducts = allProducts.slice(0, 6);

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

        <div className="featured-masonry grid-3col">
          {featuredProducts.map((product) => (
            <div key={product.id} className="featured-item-wrapper">
              <ProductCard
                product={product}
                onAddToCart={addToCart}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;