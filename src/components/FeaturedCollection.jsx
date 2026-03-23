import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import ProductCard from "./ProductCard";
import { ArrowRight } from "lucide-react";
import "../css/FeaturedCollection.css";

const FeaturedCollection = () => {
  const { allProducts, favorites, toggleFavorite, addToCart } = useApp();

  const featured = allProducts.slice(0, 4);

  return (
    <section className="featured-section">
      <div className="featured-top">
        <div className="featured-title">
          <span>Curated Selection</span>
          <h2>Featured Collection</h2>
        </div>
        <Link to="/products" className="view-all-link">
          View All <ArrowRight size={18} />
        </Link>
      </div>

      <div className="featured-grid">
        {featured.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedCollection;