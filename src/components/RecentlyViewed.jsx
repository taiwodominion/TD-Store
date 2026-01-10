import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import '../css/RecentlyViewed.css';

const RecentlyViewed = ({ onAddToCart }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('viewedProducts')) || [];
    setHistory(saved.slice(0, 4)); // Show last 4
  }, []);

  if (history.length === 0) return null;

  return (
    <section className="recent-section">
      <div className="container">
        <h2 className="section-title">Recently Viewed</h2>
        <div className="recent-grid">
          {history.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;