import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  ArrowRight,
  User,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import "../css/Navbar.css";

const Navbar = () => {
  const { user, isAdmin, cartItems, allProducts } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const searchRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((acc, item) => acc + (item.qty || 0), 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        const results = allProducts
          .filter(
            (product) =>
              product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.category
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()),
          )
          .slice(0, 5);
        setFilteredResults(results);
        setIsSearchOpen(true);
      } else {
        setFilteredResults([]);
        setIsSearchOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, allProducts]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsProfileOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleResultClick = (productId) => {
    setSearchQuery("");
    setIsSearchOpen(false);
    navigate(`/product/${productId}`);
  };

  return (
    <nav className={`nav-root ${isScrolled ? "nav-sticky" : ""}`}>
      <div className="nav-container">
        <div className="nav-left">
          <button
            className="mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div
            className={`nav-links ${isMobileMenuOpen ? "mobile-active" : ""}`}
          >
            <NavLink
              to="/products"
              className="nav-item"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </NavLink>
            <NavLink
              to="/categories"
              className="nav-item"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Collections
            </NavLink>
            <NavLink
              to="/about"
              className="nav-item"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className="nav-item"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </NavLink>
          </div>
        </div>

        <Link to="/" className="nav-brand">
          TD<span className="brand-dot">.</span>STORE
        </Link>

        <div className="nav-right">
          <div className="nav-icon-group">
            <div className="search-wrapper desk-only" ref={searchRef}>
              <div className="search-input-container">
                <Search size={18} className="search-icon-inside" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery && setIsSearchOpen(true)}
                />
              </div>

              {isSearchOpen && filteredResults.length > 0 && (
                <div className="search-dropdown">
                  {filteredResults.map((product) => (
                    <div
                      key={product.id}
                      className="search-result-item"
                      onClick={() => handleResultClick(product.id)}
                    >
                      <img src={product.image} alt="" />
                      <div className="search-result-info">
                        <span className="search-result-name">
                          {product.name}
                        </span>
                        <span className="search-result-price">
                          ${product.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link to="/cart" className="nav-icon-btn cart-btn">
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>

            {user ? (
              <div className="profile-dropdown-container" ref={profileRef}>
                <button
                  className="nav-icon-btn profile-trigger"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <User size={20} />
                </button>

                {isProfileOpen && (
                  <div className="profile-menu">
                    <div className="profile-header">
                      <p className="profile-email">{user.email}</p>
                    </div>

                    {isAdmin && (
                      <Link
                        to="/xP6ONBgj/admin"
                        className="profile-link admin-highlight"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <ShieldCheck size={16} /> Admin Panel
                      </Link>
                    )}

                    <Link
                      to="/profile"
                      className="profile-link"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User size={16} /> My Account
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="profile-link logout-btn"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="nav-cta desk-only">
                Sign In <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
