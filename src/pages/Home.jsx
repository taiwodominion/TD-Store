import React from "react";
// import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HeroCategories from "../components/HeroCategories";
import Featured from "../components/Featured";
import LifestyleBanner from "../components/LifestyleBanner";
import NewArrivals from "../components/NewArrivals";
import Testimonials from "../components/Testimonials";
import RecentlyViewed from "../components/RecentlyViewed";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Home = ({
  products,
  onAddToCart,
  cartItems,
  user,
  favorites,
  onToggleFavorite,
}) => {
  return (
    <>
      <main>
        <Hero />
        <HeroCategories />
        <Featured
          products={products}
          onAddToCart={onAddToCart}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
        <LifestyleBanner />
        <NewArrivals
          products={products}
          onAddToCart={onAddToCart}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
        <Testimonials />
        <RecentlyViewed />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
};

export default Home;
