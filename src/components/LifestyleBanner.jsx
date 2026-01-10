import React from 'react';
import { Link } from 'react-router-dom';
import '../css/LifestyleBanner.css';

const LifestyleBanner = () => {
  return (
    <section className="lifestyle-section">
      <div className="lifestyle-image">
        <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" alt="Lifestyle" />
      </div>
      <div className="lifestyle-content">
        <span className="lifestyle-tag">The Autumn Edit</span>
        <h2 className="lifestyle-title">Minimalism Meets <br/> Modern Living</h2>
        <p>A collection designed for those who value quality over quantity. Discover the beauty of simplicity.</p>
        <Link to="/products" className="lifestyle-link">View the Collection</Link>
      </div>
    </section>
  );
};

export default LifestyleBanner;