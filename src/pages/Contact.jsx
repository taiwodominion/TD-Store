import React from "react";
import Navbar from "../components/Navbar";
import ContactCard from '../components/ContactCard'
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>
        <ContactCard />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Contact;
