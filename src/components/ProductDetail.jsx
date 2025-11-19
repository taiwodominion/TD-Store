import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faArrowLeft, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { products } from "../data/products";
import "../css/ProductDetail.css";

const ProductDetail = ({ onAddToCart }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [liked, setLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(productId));
    setProduct(foundProduct);
  }, [productId]);

  const toggleLike = () => {
    setLiked(!liked);
  };

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        onAddToCart(product);
      }
      alert(`Added ${quantity} ${product.name}(s) to cart!`);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  if (!product) {
    return (
      <div className="product-detail loading">
        <div className="back-button" onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </div>
        <div className="loading-message">Product not found</div>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="back-button" onClick={handleBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
        Back to Products
      </div>

      <div className="product-detail-content">
        <div className="product-images">
          <div className="main-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="image-thumbnails">
            <div 
              className={`thumbnail ${selectedImage === 0 ? 'active' : ''}`}
              onClick={() => setSelectedImage(0)}
            >
              <img src={product.image} alt="Thumbnail 1" />
            </div>
          </div>
        </div>

        <div className="product-info">
          <div className="product-header">
            <h1 className="product-title">{product.name}</h1>
            <FontAwesomeIcon
              icon={faHeart}
              className={`like-icon ${liked ? "liked" : ""}`}
              onClick={toggleLike}
            />
          </div>

          <div className="product-price">${product.price}</div>

          {product.rating && (
            <div className="product-rating">
              <span className="stars">{"★".repeat(Math.floor(product.rating))}</span>
              <span className="rating-text">
                ({product.rating}) {product.reviews ? `• ${product.reviews} reviews` : ''}
              </span>
            </div>
          )}

          {product.description && (
            <div className="product-description">
              <p>{product.description}</p>
            </div>
          )}

          {product.features && product.features.length > 0 && (
            <div className="product-features">
              <h3>Features</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="product-meta">
            <div className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </div>
            {product.category && (
              <div className="category">Category: {product.category}</div>
            )}
          </div>

          <div className="add-to-cart-section">
            <div className="quantity-selector">
              <button onClick={decreaseQuantity}>-</button>
              <span>{quantity}</span>
              <button onClick={increaseQuantity}>+</button>
            </div>
            
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;