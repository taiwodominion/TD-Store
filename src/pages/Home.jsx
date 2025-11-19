import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HeroCategories from "../components/HeroCategories";
import Featured from "../components/Featured";
import NewArrivals from "../components/NewArrivals";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const Home = ({ onAddToCart, cartItems, user }) => {
  return (
    <>
      <Navbar cartItems={cartItems} user={user} />
      <main>
        <Hero />
        <HeroCategories />
        <Featured onAddToCart={onAddToCart} />
        <NewArrivals onAddToCart={onAddToCart} />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
};

export default Home;
