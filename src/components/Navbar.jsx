import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = ({ cartItems, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

//   const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
const cartItemCount = (cartItems || []).reduce((total, item) => total + item.quantity, 0);


  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <span className="logo-text">ShopHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-links">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}
            >
              Products
            </Link>
            <Link 
              to="/categories" 
              className={`nav-link ${location.pathname === '/categories' ? 'active' : ''}`}
            >
              Categories
            </Link>
            <Link 
              to="/contact" 
              className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
            >
              Contact
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              🔍
            </button>
          </form>

          {/* Right Side Actions */}
          <div className="navbar-actions">
            {user ? (
              <div className="user-menu">
                <Link to="/profile" className="nav-link">
                  👤 {user.name}
                </Link>
                <Link to="/orders" className="nav-link">
                  Orders
                </Link>
                <button onClick={onLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="nav-link">Register</Link>
              </div>
            )}
            
            <Link to="/cart" className="cart-link">
              🛒
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <Link to="/" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/products" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              Products
            </Link>
            <Link to="/categories" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              Categories
            </Link>
            <Link to="/contact" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
            {user ? (
              <>
                <Link to="/profile" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                  Profile
                </Link>
                <Link to="/orders" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                  Orders
                </Link>
                <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="mobile-nav-link">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;