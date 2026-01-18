import React from "react";
import ProductCard from "../components/ProductCard";
import '../css/FavoriteCard.css'

const FavoriteCard = ({ allProducts, favorites, toggleFavorite, onAddToCart }) => {
  const favoriteProducts = Array.isArray(allProducts) && Array.isArray(favorites)
    ? allProducts.filter(product => favorites.includes(product.id))
    : [];

  return (
    <div className="fav-container">
      <h1>My Favorites</h1>
      {favoriteProducts.length === 0 ? (
        <p>You haven't liked any products yet.</p>
      ) : (
        <div className="products-grid">
          {favoriteProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteCard;