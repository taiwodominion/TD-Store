import React from "react";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import "../css/LifestyleBanner.css";

const LifestyleBanner = () => {
  return (
    <section className="lifestyle-viewport">
      <div className="lifestyle-container">
        <div className="lifestyle-image-frame">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070"
            alt="Lifestyle"
            className="lifestyle-img"
          />
          <div className="lifestyle-overlay-content">
            <span className="lifestyle-pre">THE SEASONAL EDIT</span>
            <h2 className="lifestyle-main-title">
              Minimalism Meets <br />
              <span className="italic-serif">Modern Living</span>
            </h2>
            <p className="lifestyle-description">
              A curated collection designed for those who value quality over
              quantity. Discover the beauty of purposeful simplicity.
            </p>
            <Link to="/products" className="lifestyle-action">
              <span>View the Collection</span>
              <MoveRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifestyleBanner;
