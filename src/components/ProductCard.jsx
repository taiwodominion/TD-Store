import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPlus } from "@fortawesome/free-solid-svg-icons";
import "../css/ProductCard.css";

const ProductCard = ({ product, onAddToCart }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <div className="product-card">
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
