import React from "react";
import Navbar from "../components/Navbar";
import SignupForm from "../components/SignupForm";
import Footer from "../components/Footer";

const Signup = () => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>
        <SignupForm />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Signup;