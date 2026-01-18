import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faArrowLeft,
  faShoppingCart,
  faStar,
  faTruck,
  faShieldAlt,
  faUndo,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "../css/ProductDetail.css";

export default function ProductDetail({
  products = [],
  onAddToCart,
  favorites = [],
  onToggleFavorite,
}) {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  // This finds Product Safely
  const foundProduct = useMemo(
    () => products.find((p) => p?.id?.toString() === productId?.toString()),
    [productId, products],
  );

  useEffect(() => {
    if (foundProduct) {
      setProduct(foundProduct);
      setLoading(false);
    } else if (products.length > 0) {
      setLoading(false);
    }
  }, [foundProduct, products]);

  const isLiked = useMemo(() => {
    if (!favorites || !product) return false;
    return favorites.some(
      (fav) => fav?.id?.toString() === product?.id?.toString(),
    );
  }, [favorites, product]);

  const images = useMemo(
    () =>
      product?.images?.length
        ? product.images
        : [product?.image].filter(Boolean),
    [product],
  );

  const handleAddToCart = useCallback(() => {
    if (!product || !product.inStock) return;
    onAddToCart(product, null, null, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  }, [product, quantity, onAddToCart]);

  if (loading) return <div className="detail-loader">Loading Product...</div>;
  if (!product)
    return (
      <div className="error-view">
        <h2>Product not found.</h2>
      </div>
    );

  return (
    <div className="pd-wrapper">
      <header className="pd-nav">
        <button onClick={() => navigate(-1)} className="pd-back-btn">
          <FontAwesomeIcon icon={faArrowLeft} /> <span>Back to Shop</span>
        </button>
        <div className="pd-category-label">{product.category}</div>
      </header>

      <div className="pd-grid">
        <div className="pd-gallery-section">
          <div className="pd-main-frame">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="pd-hero-img"
            />
            {product.onSale && <span className="pd-sale-tag">Sale</span>}
          </div>
          <div className="pd-thumbnails">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="thumbnail"
                className={`pd-thumb ${selectedImage === i ? "active" : ""}`}
                onClick={() => setSelectedImage(i)}
              />
            ))}
          </div>
        </div>

        <div className="pd-details-section">
          <div className="pd-title-row">
            <h1>{product.name}</h1>
            <button
              className={`pd-wishlist ${isLiked ? "active" : ""}`}
              onClick={() => onToggleFavorite(product.id)} // This passes only product.id, not the whole product
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>

          <div className="pd-price-row">
            <span className="pd-current-price">
              ${Number(product.price || 0).toFixed(2)}
            </span>
            {product.onSale && (
              <span className="pd-old-price">
                ${Number(product.originalPrice || 0).toFixed(2)}
              </span>
            )}
          </div>

          <div className="pd-rating-bar">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={i < (product.rating || 0) ? "filled" : "empty"}
                />
              ))}
            </div>
            <span className="review-count">
              ({product.reviews || 0} reviews)
            </span>
          </div>

          <div className="pd-desc">
            <p>{product.description}</p>
          </div>

          <div className="pd-action-box">
            <div className="pd-quantity-control">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>

            <button
              className={`pd-cart-btn ${addedToCart ? "success" : ""}`}
              disabled={!product.inStock}
              onClick={handleAddToCart}
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              {addedToCart ? "Added!" : "Add to Cart"}
            </button>
          </div>

          <div className="pd-trust-footer">
            <div className="trust-item">
              <FontAwesomeIcon icon={faTruck} /> <span>Free Shipping</span>
            </div>
            <div className="trust-item">
              <FontAwesomeIcon icon={faUndo} /> <span>30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
