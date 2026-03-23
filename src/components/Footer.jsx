import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Linkedin, ArrowUpRight } from "lucide-react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-root">
      <div className="footer-container">
        <div className="footer-top-row">
          <div className="footer-brand-side">
            <Link to="/" className="footer-logo">
              TD<span className="italic-serif">.</span>STORE
            </Link>
            <p className="footer-credo">
              Elevating your lifestyle through curated quality and{" "}
              <span className="italic-serif">timeless</span> design.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-circle">
                <Instagram size={18} />
              </a>
              <a href="#" className="social-circle">
                <Twitter size={18} />
              </a>
              <a href="#" className="social-circle">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div className="footer-links-grid">
            <div className="footer-col">
              <h5 className="footer-label">Navigation</h5>
              <ul className="footer-list">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/products">Shop All</Link>
                </li>
                <li>
                  <Link to="/about">Our Story</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h5 className="footer-label">Support</h5>
              <ul className="footer-list">
                <li>
                  <Link to="/faq">FAQs</Link>
                </li>
                <li>
                  <Link to="/shipping">Shipping</Link>
                </li>
                <li>
                  <Link to="/returns">Returns</Link>
                </li>
                <li>
                  <Link to="/terms">Privacy Policy</Link>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h5 className="footer-label">Direct Contact</h5>
              <ul className="footer-list">
                <li>
                  <a href="mailto:hello@tdstore.com" className="contact-link">
                    hello@tdstore.com <ArrowUpRight size={14} />
                  </a>
                </li>
                <li>
                  <span className="contact-info">Lagos, Nigeria</span>
                </li>
                <li>
                  <span className="contact-info">+234 800 TD STORE</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-legal">
            <span>
              © {new Date().getFullYear()} TD-STORE. ALL RIGHTS RESERVED.
            </span>
          </div>
          <div className="footer-tagline-end">
            DESIGNED FOR THE <span className="italic-serif">Modern</span>{" "}
            INDIVIDUAL
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
