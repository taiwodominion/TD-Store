import React from "react";
import { Link } from "react-router-dom";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-section about">
          <h3 className="footer-title">TD Store</h3>
          <p>
            Your one-stop destination for premium fashion, electronics, and lifestyle essentials.
            We bring quality and style together for your everyday needs.
          </p>
        </div>

        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/categories">Shop</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section customer">
          <h4>Customer Service</h4>
          <ul>
            <li><Link to="/faq">FAQs</Link></li>
            <li><Link to="/returns">Returns</Link></li>
            <li><Link to="/shipping">Shipping Info</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>

        <div className="footer-section social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            {/* <a href="#"><FontAwesomeIcon icon={FaInstagram} /></a>
            <a href="#"><FontAwesomeIcon icon={FaLinkedinIn} /></a> */}
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} TDStore. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
