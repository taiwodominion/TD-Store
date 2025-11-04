import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPlus } from "@fortawesome/free-solid-svg-icons";
import "../css/ProductCard.css";

const ProductCard = ({ product, addToCart }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="product-card">
      <FontAwesomeIcon icon={faHeart}
        className={`like-icon ${liked ? "liked" : ""}`}
        onClick={toggleLike}
      />

      <img src={product.image} alt={product.name} />

      <h3 className="product-title">{product.name}</h3>

      <div className="product-bottom">
        <span className="product-price">${product.price}</span>
        <button className="add-btn" onClick={() => addToCart(product)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
