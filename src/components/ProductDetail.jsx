// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { 
//   faHeart, 
//   faArrowLeft, 
//   faShoppingCart, 
//   faStar,
//   faTruck,
//   faShieldAlt,
//   faUndo,
//   faChevronLeft,
//   faChevronRight
// } from "@fortawesome/free-solid-svg-icons";
// import { products } from "../data/products";
// import "../css/ProductDetail.css";

// export default function ProductDetail({ onAddToCart, cartItems = [] }) {
//   const { productId } = useParams();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);
//   const [liked, setLiked] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [imageLoading, setImageLoading] = useState(true);
//   const [addedToCart, setAddedToCart] = useState(false);
//   const [zoomImage, setZoomImage] = useState(false);
//   const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

//   const foundProduct = useMemo(() => 
//     products.find((p) => p.id === parseInt(productId, 10)),
//     [productId]
//   );

//   const images = useMemo(() => 
//     product?.images?.length ? product.images : [product?.image].filter(Boolean),
//     [product]
//   );

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setProduct(foundProduct || null);
//       setLoading(false);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [foundProduct]);

//   const toggleLike = useCallback(() => setLiked(s => !s), []);
  
//   const handleAddToCart = useCallback(() => {
//     if (!product || !product.inStock) return;
    
//     onAddToCart?.({ ...product, qty: quantity });
//     setAddedToCart(true);
    
//     setTimeout(() => setAddedToCart(false), 3000);
//   }, [product, quantity, onAddToCart]);

//   const handleBack = useCallback(() => navigate(-1), [navigate]);
//   const handleNavigateHome = () => navigate("/");
  
//   const increaseQuantity = useCallback(() => setQuantity(q => q + 1), []);
//   const decreaseQuantity = useCallback(() => setQuantity(q => Math.max(1, q - 1)), []);
  
//   const nextImage = useCallback(() => {
//     setSelectedImage(prev => (prev + 1) % images.length);
//   }, [images.length]);

//   const prevImage = useCallback(() => {
//     setSelectedImage(prev => (prev - 1 + images.length) % images.length);
//   }, [images.length]); 

//   const handleImageZoom = useCallback((e) => {
//     if (!zoomImage) return;
    
//     const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;
//     setZoomPosition({ x, y });
//   }, [zoomImage]);

//   const isInCart = useMemo(() => 
//     cartItems.some(item => item.id === product?.id),
//     [cartItems, product?.id]
//   );

//   const averageRating = useMemo(() => {
//     if (!product?.ratings?.length) return 0;
//     return product.ratings.reduce((a, b) => a + b, 0) / product.ratings.length;
//   }, [product?.ratings]);

//   if (loading) {
//     return (
//       <div className="product-detail-container" style={{ marginTop: '80px' }}>
//         <div className="loading-skeleton">
//           <div className="skeleton-image"></div>
//           <div className="skeleton-content">
//             <div className="skeleton-title"></div>
//             <div className="skeleton-price"></div>
//             <div className="skeleton-description"></div>
//             <div className="skeleton-actions"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="product-detail-container" style={{ marginTop: '80px' }}>
//         <div className="empty-state">
//           <h2>Product Not Found</h2>
//           <p>The product you're looking for doesn't exist.</p>
//           <button className="back-home-btn" onClick={handleNavigateHome}>
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="product-detail-container" style={{ marginTop: '80px' }}>
//       <nav className="breadcrumb-nav">
//         <button className="back-button" onClick={handleBack}>
//           <FontAwesomeIcon icon={faArrowLeft} />
//           Back
//         </button>
//         {/* <div className="breadcrumb">
//           <span>Home</span>
//           <span className="separator">/</span>
//           <span>Products</span>
//           <span className="separator">/</span>
//           <span className="current">{product.category}</span>
//           <span className="separator">/</span>
//           <span className="current">{product.name}</span>
//         </div> */}
//       </nav>

//       <div className="product-content">
//         <div className="product-gallery">
//           <div 
//             className={`main-image-wrapper ${zoomImage ? 'zoomed' : ''}`}
//             onMouseEnter={() => setZoomImage(true)}
//             onMouseLeave={() => setZoomImage(false)}
//             onMouseMove={handleImageZoom}
//           >
//             {imageLoading && <div className="image-loading"></div>}
//             <img 
//               src={images[selectedImage]} 
//               alt={product.name}
//               className="product-main-image"
//               onLoad={() => setImageLoading(false)}
//               style={{
//                 transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
//                 transform: zoomImage ? 'scale(2)' : 'scale(1)'
//               }}
//             />
            
//             {images.length > 1 && (
//               <>
//                 <button className="image-nav-btn prev" onClick={prevImage}>
//                   <FontAwesomeIcon icon={faChevronLeft} />
//                 </button>
//                 <button className="image-nav-btn next" onClick={nextImage}>
//                   <FontAwesomeIcon icon={faChevronRight} />
//                 </button>
//               </>
//             )}

//             {product.onSale && (
//               <div className="sale-badge">Sale</div>
//             )}
//           </div>

//           {images.length > 1 && (
//             <div className="thumbnail-row">
//               {images.map((img, i) => (
//                 <div 
//                   key={i} 
//                   className={`thumbnail-wrapper ${selectedImage === i ? 'active' : ''}`}
//                   onClick={() => setSelectedImage(i)}
//                 >
//                   <img 
//                     src={img} 
//                     alt={`${product.name} view ${i + 1}`}
//                     className="thumbnail"
//                   />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Product Info */}
//         <div className="product-info">
//           <div className="product-header">
//             <h1 className="product-title">{product.name}</h1>
//             <button 
//               className={`like-btn ${liked ? 'liked' : ''}`} 
//               onClick={toggleLike}
//               aria-label={liked ? "Remove from favorites" : "Add to favorites"}
//             >
//               <FontAwesomeIcon icon={faHeart} />
//             </button>
//           </div>

//           <div className="product-rating">
//             <div className="stars">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <FontAwesomeIcon 
//                   key={star}
//                   icon={faStar}
//                   className={star <= Math.round(averageRating) ? 'filled' : 'empty'}
//                 />
//               ))}
//               <span>({product.ratings?.length || 0} reviews)</span>
//             </div>
//           </div>

//           <div className="product-price">
//             {product.onSale && product.originalPrice ? (
//               <>
//                 <span className="current-price">${product.price.toFixed(2)}</span>
//                 <span className="original-price">${product.originalPrice.toFixed(2)}</span>
//                 <span className="discount-badge">
//                   {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
//                 </span>
//               </>
//             ) : (
//               <span className="current-price">${product.price.toFixed(2)}</span>
//             )}
//           </div>

//           <div className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
//             {product.inStock ? 
//               `✓ In Stock (${product.stockCount || 'Limited'} available)` : 
//               '✗ Out of Stock'
//             }
//           </div>

//           <div className="product-description">
//             <h3>Description</h3>
//             <p>{product.description}</p>
//             {product.features && (
//               <ul className="product-features">
//                 {product.features.map((feature, index) => (
//                   <li key={index}>{feature}</li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           <div className="product-actions">
//             <div className="quantity-section">
//               <label>Quantity:</label>
//               <div className="quantity-selector">
//                 <button onClick={decreaseQuantity} disabled={quantity <= 1}>-</button>
//                 <span>{quantity}</span>
//                 <button onClick={increaseQuantity}>+</button>
//               </div>
//             </div>

//             <button 
//               className={`add-to-cart-btn ${addedToCart ? 'added' : ''} ${isInCart ? 'in-cart' : ''}`}
//               onClick={handleAddToCart}
//               disabled={!product.inStock}
//             >
//               <FontAwesomeIcon icon={faShoppingCart} />
//               {addedToCart ? 'Added to Cart!' : 
//                isInCart ? 'Update Cart' : 
//                !product.inStock ? 'Out of Stock' : 'Add to Cart'}
//             </button>

//             {addedToCart && (
//               <div className="success-message">
//                 ✓ Added to cart successfully!
//               </div>
//             )}
//           </div>

//           {/* Trust Badges */}
//           <div className="trust-badges">
//             <div className="badge">
//               <FontAwesomeIcon icon={faTruck} />
//               <span>Free Shipping</span>
//             </div>
//             <div className="badge">
//               <FontAwesomeIcon icon={faUndo} />
//               <span>30-Day Returns</span>
//             </div>
//             <div className="badge">
//               <FontAwesomeIcon icon={faShieldAlt} />
//               <span>2-Year Warranty</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


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
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
// REMOVED: import { products } from "../data/products";
import "../css/ProductDetail.css";

// 1. Ensure 'products' is accepted as a prop
export default function ProductDetail({ products, onAddToCart, cartItems = [] }) {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [liked, setLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const [zoomImage, setZoomImage] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  // 2. Search through the 'products' prop. 
  // We compare IDs as strings because Firestore doc IDs are strings.
  const foundProduct = useMemo(() => 
    products.find((p) => p.id.toString() === productId.toString()),
    [productId, products]
  );

  const images = useMemo(() => 
    product?.images?.length ? product.images : [product?.image].filter(Boolean),
    [product]
  );

  // 3. Update the product whenever the 'foundProduct' is found
  useEffect(() => {
    if (foundProduct) {
      setProduct(foundProduct);
      setLoading(false);
    } else if (products.length > 0) {
      // If products have loaded but this specific ID isn't there
      setLoading(false);
    }
  }, [foundProduct, products]);

  const toggleLike = useCallback(() => setLiked(s => !s), []);
  
  const handleAddToCart = useCallback(() => {
    if (!product || !product.inStock) return;
    
    onAddToCart?.(product, null, null, quantity); // Matches your App.jsx addToCart signature
    setAddedToCart(true);
    
    setTimeout(() => setAddedToCart(false), 3000);
  }, [product, quantity, onAddToCart]);

  const handleBack = useCallback(() => navigate(-1), [navigate]);
  const handleNavigateHome = () => navigate("/");
  
  const increaseQuantity = useCallback(() => setQuantity(q => q + 1), []);
  const decreaseQuantity = useCallback(() => setQuantity(q => Math.max(1, q - 1)), []);
  
  const nextImage = useCallback(() => {
    setSelectedImage(prev => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setSelectedImage(prev => (prev - 1 + images.length) % images.length);
  }, [images.length]); 

  const handleImageZoom = useCallback((e) => {
    if (!zoomImage) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  }, [zoomImage]);

  const isInCart = useMemo(() => 
    cartItems.some(item => item.id.toString() === product?.id?.toString()),
    [cartItems, product?.id]
  );

  const averageRating = useMemo(() => {
    return product?.rating || 0; // Use the direct rating from your Firebase data
  }, [product]);

  if (loading) {
    return (
      <div className="product-detail-container" style={{ marginTop: '80px' }}>
        <div className="loading-skeleton">
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-price"></div>
            <div className="skeleton-description"></div>
            <div className="skeleton-actions"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-container" style={{ marginTop: '80px' }}>
        <div className="empty-state">
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist.</p>
          <button className="back-home-btn" onClick={handleNavigateHome}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-container" style={{ marginTop: '80px' }}>
      <nav className="breadcrumb-nav">
        <button className="back-button" onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </button>
      </nav>

      <div className="product-content">
        <div className="product-gallery">
          <div 
            className={`main-image-wrapper ${zoomImage ? 'zoomed' : ''}`}
            onMouseEnter={() => setZoomImage(true)}
            onMouseLeave={() => setZoomImage(false)}
            onMouseMove={handleImageZoom}
          >
            {imageLoading && <div className="image-loading"></div>}
            <img 
              src={images[selectedImage]} 
              alt={product.name}
              className="product-main-image"
              onLoad={() => setImageLoading(false)}
              style={{
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                transform: zoomImage ? 'scale(2)' : 'scale(1)'
              }}
            />
            
            {images.length > 1 && (
              <>
                <button className="image-nav-btn prev" onClick={prevImage}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button className="image-nav-btn next" onClick={nextImage}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </>
            )}

            {product.onSale && (
              <div className="sale-badge">Sale</div>
            )}
          </div>

          {images.length > 1 && (
            <div className="thumbnail-row">
              {images.map((img, i) => (
                <div 
                  key={i} 
                  className={`thumbnail-wrapper ${selectedImage === i ? 'active' : ''}`}
                  onClick={() => setSelectedImage(i)}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} view ${i + 1}`}
                    className="thumbnail"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="product-info">
          <div className="product-header">
            <h1 className="product-title">{product.name}</h1>
            <button 
              className={`like-btn ${liked ? 'liked' : ''}`} 
              onClick={toggleLike}
              aria-label={liked ? "Remove from favorites" : "Add to favorites"}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>

          <div className="product-rating">
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon 
                  key={star}
                  icon={faStar}
                  className={star <= Math.round(averageRating) ? 'filled' : 'empty'}
                />
              ))}
              <span>({product.reviews || 0} reviews)</span>
            </div>
          </div>

          <div className="product-price">
            {product.onSale && product.originalPrice ? (
              <>
                <span className="current-price">${Number(product.price).toFixed(2)}</span>
                <span className="original-price">${Number(product.originalPrice).toFixed(2)}</span>
                <span className="discount-badge">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              </>
            ) : (
              <span className="current-price">${Number(product.price).toFixed(2)}</span>
            )}
          </div>

          <div className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
            {product.inStock ? 
              `✓ In Stock` : 
              '✗ Out of Stock'
            }
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-actions">
            <div className="quantity-section">
              <label>Quantity:</label>
              <div className="quantity-selector">
                <button onClick={decreaseQuantity} disabled={quantity <= 1}>-</button>
                <span>{quantity}</span>
                <button onClick={increaseQuantity}>+</button>
              </div>
            </div>

            <button 
              className={`add-to-cart-btn ${addedToCart ? 'added' : ''} ${isInCart ? 'in-cart' : ''}`}
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              {addedToCart ? 'Added!' : isInCart ? 'Update Cart' : 'Add to Cart'}
            </button>
          </div>

          <div className="trust-badges">
            <div className="badge">
              <FontAwesomeIcon icon={faTruck} />
              <span>Free Shipping</span>
            </div>
            <div className="badge">
              <FontAwesomeIcon icon={faUndo} />
              <span>30-Day Returns</span>
            </div>
            <div className="badge">
              <FontAwesomeIcon icon={faShieldAlt} />
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}