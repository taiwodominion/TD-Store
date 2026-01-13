import React from "react";
// import Navbar from "../components/Navbar";
import AllProducts from "../components/AllProducts";
import Footer from "../components/Footer";

const Products = ({ onAddToCart, cartItems }) => {
  return (
    <>
      {/* <nav>
        <Navbar cartItems={cartItems} />
      </nav> */}
      <main>
        <AllProducts onAddToCart={onAddToCart} /> {/* ✅ Pass it here */}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Products;
