import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import "../css/NewArrivals.css";

const NewArrivals = ({
  products,
  onAddToCart,
  favorites,
  onToggleFavorite,
}) => {
  const [arrivalProducts, setArrivalProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setArrivalProducts(products.slice(0, 8));
    }
  }, [products]);

  return (
    <section className="arrivals-viewport">
      <div className="arrivals-wrapper">
        <div className="arrivals-header">
          <div className="arrivals-title-stack">
            <span className="arrivals-pre">JUST LANDED</span>
            <h2 className="arrivals-main-title">
              Modern <span className="italic-serif">Arrivals</span>
            </h2>
          </div>
          <p className="arrivals-subtitle">
            Experience the latest evolution of our seasonal collection.
          </p>
        </div>

        <div className="arrivals-grid">
          {arrivalProducts.map((item) => (
            <div key={item.id} className="arrival-item">
              <ProductCard
                product={item}
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

export default NewArrivals;
