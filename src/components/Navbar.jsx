import React, { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faShoppingCart, 
  faSearch, 
  faTimes, 
  faUserCircle, 
  faSignOutAlt,
  faHeart 
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = ({ cartItems = [], user, onLogout, products = [], favorites = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Use item.qty to match App.jsx instead of item.quantity
  const totalCartCount = useMemo(() => 
    cartItems.reduce((total, item) => total + (item.qty || 0), 0),
    [cartItems]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-container")) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return products.filter(product => {
      const name = product?.name || "";
      const category = product?.category || "";
      return (
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }).slice(0, 5);
  }, [searchQuery, products]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setShowResults(false);
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", path: "/", id: "nav-home" },
    { name: "Products", path: "/products", id: "nav-products" },
    { name: "Categories", path: "/categories", id: "nav-categories" },
    { name: "Contact", path: "/contact", id: "nav-contact" },
    ...(user ? [{ 
      name: `Favorites ${favorites.length > 0 ? `(${favorites.length})` : ""}`, 
      path: "/favorites", 
      id: "nav-fav" 
    }] : [])
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
        <div className="container navbar-container">

          <Link to="/" className="navbar-logo">
            <span className="logo-text">TD-Store</span>
          </Link>

          <div className="navbar-links">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="search-container desktop-search">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>

            {showResults && filteredResults.length > 0 && (
              <div className="search-dropdown">
                {filteredResults.map(product => (
                  <Link 
                    key={product.id} 
                    to={`/product/${product.id}`}
                    className="dropdown-item"
                    onClick={() => {
                      setSearchQuery("");
                      setShowResults(false);
                    }}
                  >
                    <img src={product.image} alt="" className="dropdown-img" />
                    <div className="dropdown-info">
                      <span className="dropdown-name">{product.name}</span>
                      <span className="dropdown-price">${product.price}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="navbar-actions">
            <div className="desktop-auth">
              {user ? (
                <div className="user-logged-in">
                  <Link to="/profile" className="nav-icon-link">
                    <FontAwesomeIcon icon={faUserCircle} />
                    <span className="user-name-text">
                      {user.displayName?.split(' ')[0] || 'Profile'}
                    </span>
                  </Link>
                  <button onClick={onLogout} className="logout-icon-btn" title="Logout">
                    <FontAwesomeIcon icon={faSignOutAlt} />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="login-btn-link">Login</Link>
              )}
            </div>

            <Link to="/cart" className="cart-link">
              <FontAwesomeIcon icon={faShoppingCart} />
              {totalCartCount > 0 && (
                <span className="cart-badge animate-pop">{totalCartCount}</span>
              )}
            </Link>

            <button
              className={`mobile-menu-btn ${isMenuOpen ? "open" : ""}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="ham-line"></span>
              <span className="ham-line"></span>
              <span className="ham-line"></span>
            </button>
          </div>
        </div>
      </nav>

      <aside className={`mobile-sidebar ${isMenuOpen ? "active" : ""}`}>
        <div className="sidebar-header">
          <span className="logo-text">TD-Store</span>
          <button onClick={() => setIsMenuOpen(false)} className="close-btn">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <form onSubmit={handleSearchSubmit} className="mobile-search">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
        </form>

        <div className="mobile-links">
          {navLinks.map((link) => (
            <Link key={link.id} to={link.path} onClick={() => setIsMenuOpen(false)}>
              {link.name}
            </Link>
          ))}
          
          <hr className="sidebar-divider" />
          {user ? (
            <div className="mobile-user-actions">
              <Link to="/profile" onClick={() => setIsMenuOpen(false)}>My Profile</Link>
              <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="mobile-logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="mobile-login-link" onClick={() => setIsMenuOpen(false)}>
              Login / Register
            </Link>
          )}
        </div>
      </aside>
    </>
  );
};

export default Navbar;