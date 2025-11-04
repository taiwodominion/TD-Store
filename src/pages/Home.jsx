import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HeroCategories from "../components/HeroCategories";
import Featured from "../components/Featured";
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
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Home;
