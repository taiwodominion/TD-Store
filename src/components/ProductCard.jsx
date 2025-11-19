import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../css/ProductCard.css";

const ProductCard = ({ product, onAddToCart }) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const toggleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
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
      <FontAwesomeIcon
        icon={faHeart}
        className={`like-icon ${liked ? "liked" : ""}`}
        onClick={toggleLike}
      />

      <img src={product.image} alt={product.name} />

      <h3 className="product-title">{product.name}</h3>

      <div className="product-bottom">
        <span className="product-price">${product.price}</span>
        <button className="add-btn" onClick={handleAddToCart}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;