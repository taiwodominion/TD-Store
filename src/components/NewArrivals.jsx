import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import "../css/NewArrivals.css";
import {useApp} from "../contexts/AppContext"

const NewArrivals = ({ onAddToCart, favorites, onToggleFavorite }) => {
  const { allProducts } = useApp();
  const [arrivalProducts, setArrivalProducts] = useState([]);

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      setArrivalProducts(allProducts.slice(0, 8));
    }
  }, [allProducts]);

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

        <div className="arrivals-grid grid-3col">
          {arrivalProducts.length > 0 ? (
            arrivalProducts.map((item) => (
              <div key={item.id} className="arrival-item">
                <ProductCard
                  product={item}
                  onAddToCart={onAddToCart}
                  favorites={favorites}
                  onToggleFavorite={onToggleFavorite}
                />
              </div>
            ))
          ) : (
            <div className="empty-state">Loading latest arrivals...</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;