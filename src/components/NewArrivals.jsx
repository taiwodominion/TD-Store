import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import "../css/NewArrivals.css";

const NewArrivals = ({ products, onAddToCart, favorites, onToggleFavorite }) => {
  const [arrivalProducts, setArrivalProducts] = useState([]);

  useEffect(() => {
      if (products && products.length > 0) {
        setArrivalProducts(products.slice(0, 7));
      }
    }, [products]);

  return (
    <section className="new-arrivals-section">
      <div className="new-arrivals-header">
        <h2>🆕 New Arrivals</h2>
        <p>Check out the latest additions to TD Store</p>
      </div>

      <div className="products-container">
        {arrivalProducts.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            onAddToCart={onAddToCart}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;