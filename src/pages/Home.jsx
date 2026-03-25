import React from "react";
import Hero from "../components/Hero";
import HeroCategories from "../components/HeroCategories";
import FeaturedCollection from "../components/FeaturedCollection";
import Featured from "../components/Featured";
import LifestyleBanner from "../components/LifestyleBanner";
import NewArrivals from "../components/NewArrivals";
import Testimonials from "../components/Testimonials";
import RecentlyViewed from "../components/RecentlyViewed";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useApp } from "../contexts/AppContext";

const Home = ({
  products,
  allProducts,
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
        <FeaturedCollection />
        <HeroCategories />
        <Featured />
        <LifestyleBanner />
        <NewArrivals
          allProducts={allProducts}
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
