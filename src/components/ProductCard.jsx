import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../css/ProductCard.css";

/**
 * ProductCard Component
 * @param {Object} product - The product data object
 * @param {Function} onAddToCart - Function to handle adding items to cart
 * @param {Array} favorites - Array of product IDs currently liked by the user
 * @param {Function} onToggleFavorite - Global function from App.jsx to handle liking/unliking
 */
const ProductCard = ({ 
  product, 
  onAddToCart, 
  favorites = [], 
  onToggleFavorite 
}) => {
  const navigate = useNavigate();

  // This determine if this product is liked by checking the global favorites array
  const isLiked = favorites.includes(product.id);

  // This Handle the like button click
  const toggleLike = (e) => {
    e.stopPropagation(); 
    
    if (typeof onToggleFavorite === "function") {
      onToggleFavorite(product.id);
    } else {
      console.error("onToggleFavorite prop was not passed to ProductCard");
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="like-icon-container" onClick={toggleLike}>
        <FontAwesomeIcon
          icon={faHeart}
          className={`like-icon ${isLiked ? "liked" : ""}`}
        />
      </div>

      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        
        <div className="product-bottom">
          <span className="product-price">${product.price}</span>
          <button 
            className="add-btn" 
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;