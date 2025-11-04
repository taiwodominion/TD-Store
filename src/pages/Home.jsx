import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HeroCategories from "../components/HeroCategories";
import Featured from "../components/Featured";
import NewArrivals from "../components/NewArrivals";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Hero />
        <HeroCategories />
        <Featured />
        <NewArrivals />
        <Testimonials />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Home;
