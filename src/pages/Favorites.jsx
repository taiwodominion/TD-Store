import React from "react";
import Navbar from "../components/Navbar";
import FavoriteCard from "../components/FavoriteCard";
import Footer from "../components/Footer";

const Favorites = ({
  user,
  allProducts,
  favorites,
  toggleFavorite,
  onAddToCart,
  cartItems,
  onLogout,
}) => {
  return (
    <>
      <Navbar
        user={user}
        products={allProducts}
        favorites={favorites}
        cartItems={cartItems}
        onLogout={onLogout}
      />
      <main>
        <FavoriteCard
          allProducts={allProducts}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          onAddToCart={onAddToCart}
        />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Favorites;
