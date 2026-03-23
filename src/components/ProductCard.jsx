import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import "../css/ProductCard.css";

const ProductCard = ({ 
  product, 
  onAddToCart, 
  favorites = [], 
  onToggleFavorite 
}) => {
  const navigate = useNavigate();
  const isLiked = favorites.includes(product.id);

  const toggleLike = (e) => {
    e.stopPropagation(); 
    if (typeof onToggleFavorite === "function") {
      onToggleFavorite(product.id);
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
    <div className="item-card" onClick={handleCardClick}>
      <div className="item-visual-wrapper">
        {product.onSale && <div className="product-badge sale">Sale</div>}
        {product.isNew && <div className="product-badge new">New</div>}
        {product.stock < 5 && product.stock > 0 && <div className="product-badge limited">Low Stock</div>}
        
        <button 
          className={`item-wish-btn ${isLiked ? "active" : ""}`} 
          onClick={toggleLike}
        >
          <Heart size={18} fill={isLiked ? "#ff4b5c" : "none"} />
        </button>
        
        <img src={product.image} alt={product.name} className="item-img" />
        
        <button className="item-quick-add" onClick={handleAddToCart}>
          <ShoppingBag size={16} />
          <span>Quick Add</span>
        </button>
      </div>

      <div className="item-details">
        <div className="item-meta">
          <h3 className="item-name">{product.name}</h3>
          <span className="item-price">${product.price}</span>
        </div>
        <p className="item-category">{product.category || "Collection"}</p>
      </div>
    </div>
  );
};

export default ProductCard;