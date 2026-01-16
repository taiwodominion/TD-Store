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

const Home = ({ products, onAddToCart, cartItems, user }) => {
  return (
    <>
      <main>
        <Hero />
        <HeroCategories />
        {/* Pass products down here */}
        <Featured onAddToCart={onAddToCart} products={products} />
        <LifestyleBanner />
        {/* Pass products down here too */}
        <NewArrivals onAddToCart={onAddToCart} products={products} />
        <Testimonials />
        <RecentlyViewed />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
};

export default Home;
