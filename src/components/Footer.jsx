import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedinIn, faTwitter } from "@fortawesome/free-brands-svg-icons";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link to="/" className="brand-logo">TD-STORE</Link>
          <p className="brand-tagline">
            Elevating your lifestyle through curated quality and timeless design.
          </p>
          <div className="social-group">
            <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#"><FontAwesomeIcon icon={faLinkedinIn} /></a>
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="link-column">
            <h5>Navigation</h5>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Shop All</Link></li>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="link-column">
            <h5>Support</h5>
            <ul>
              <li><Link to="/faq">FAQs</Link></li>
              <li><Link to="/shipping">Shipping</Link></li>
              <li><Link to="/returns">Returns</Link></li>
              <li><Link to="/terms">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="link-column newsletter">
            <h5>Stay in Touch</h5>
            <p>Subscribe to receive updates and exclusive offers.</p>
            <div className="footer-input-group">
              <input type="email" placeholder="Email address" />
              <button>Join</button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <span>© {new Date().getFullYear()} TDStore.</span>
        <span className="divider">|</span>
        <span>Designed for the Modern Home</span>
      </div>
    </footer>
  );
};

export default Footer;