import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HeroCategories from "../components/HeroCategories";

const Home = () => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Hero />
        <HeroCategories />
      </main>
    </>
  );
};

export default Home;
