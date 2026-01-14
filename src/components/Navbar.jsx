// import React, { useState, useEffect, useMemo } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShoppingCart, faSearch, faTimes, faUserCircle } from "@fortawesome/free-solid-svg-icons";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import "../css/Navbar.css";

// const Navbar = ({ cartItems = [], user, onLogout }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
  
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 20) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Performance: Memoize cart count
//   const cartItemCount = useMemo(() => 
//     cartItems.reduce((total, item) => total + item.quantity, 0),
//     [cartItems]
//   );

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
//       setSearchQuery("");
//       setIsMenuOpen(false);
//     }
//   };

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "Products", path: "/products" },
//     { name: "Categories", path: "/categories" },
//     { name: "Contact", path: "/contact" },
//   ];

//   return (
//     <>
//       <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
//         <div className="container navbar-container">

//           <Link to="/" className="navbar-logo">
//             <span className="logo-text">TD-Store</span>
//           </Link>

//           <div className="navbar-links">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
//                 aria-current={location.pathname === link.path ? "page" : undefined}
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </div>

//           <form onSubmit={handleSearch} className="search-form desktop-search">
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="search-input"
//             />
//             <button type="submit" className="search-button" aria-label="Search">
//               <FontAwesomeIcon icon={faSearch} />
//             </button>
//           </form>

//           <div className="navbar-actions">
//             <div className="desktop-auth">
//               {user ? (
//                 <div className="user-dropdown-container">
//                   <Link to="/profile" className="nav-icon-link">
//                     <FontAwesomeIcon icon={faUserCircle} />
//                     <span className="user-name-text">{user.name.split(' ')[0]}</span>
//                   </Link>
//                 </div>
//               ) : (
//                 <Link to="/login" className="login-btn-link">Login</Link>
//               )}
//             </div>

//             <Link to="/cart" className="cart-link" aria-label="View Cart">
//               <FontAwesomeIcon icon={faShoppingCart} />
//               {cartItemCount > 0 && (
//                 <span className="cart-badge animate-pop">{cartItemCount}</span>
//               )}
//             </Link>

//             <button
//               className={`mobile-menu-btn ${isMenuOpen ? "open" : ""}`}
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               aria-label="Toggle Menu"
//             >
//               <span className="ham-line"></span>
//               <span className="ham-line"></span>
//               <span className="ham-line"></span>
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Drawer Overlay */}
//       {isMenuOpen && <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}></div>}

//       {/* Mobile Sidebar Menu */}
//       <aside className={`mobile-sidebar ${isMenuOpen ? "active" : ""}`}>
//         <div className="sidebar-header">
//           <span className="logo-text">TD-Store</span>
//           <button onClick={() => setIsMenuOpen(false)} className="close-btn">
//             <FontAwesomeIcon icon={faTimes} />
//           </button>
//         </div>

//         <form onSubmit={handleSearch} className="mobile-search">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
//         </form>

//         <div className="mobile-links">
//           {navLinks.map((link) => (
//             <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)}>
//               {link.name}
//             </Link>
//           ))}
//           <hr />
//           {user ? (
//             <>
//               <Link to="/profile" onClick={() => setIsMenuOpen(false)}>My Profile</Link>
//               <Link to="/orders" onClick={() => setIsMenuOpen(false)}>My Orders</Link>
//               <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="mobile-logout">
//                 Logout
//               </button>
//             </>
//           ) : (
//             <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login / Register</Link>
//           )}
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Navbar;



import React, { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faShoppingCart, 
  faSearch, 
  faTimes, 
  faUserCircle, 
  faSignOutAlt 
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = ({ cartItems = [], user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll effect to add a shadow or background when moving down
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Performance: Memoize cart count
  const cartItemCount = useMemo(() => 
    cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Categories", path: "/categories" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
        <div className="container navbar-container">

          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <span className="logo-text">TD-Store</span>
          </Link>

          {/* Desktop Links */}
          <div className="navbar-links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="search-form desktop-search">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button" aria-label="Search">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>

          {/* Actions: User Auth & Cart */}
          <div className="navbar-actions">
            
            {/* Desktop Auth Toggle */}
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

            {/* Cart Icon */}
            <Link to="/cart" className="cart-link">
              <FontAwesomeIcon icon={faShoppingCart} />
              {cartItemCount > 0 && (
                <span className="cart-badge animate-pop">{cartItemCount}</span>
              )}
            </Link>

            {/* Mobile Menu Button */}
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

      {/* Mobile Sidebar Overlay */}
      {isMenuOpen && <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}></div>}

      {/* Mobile Sidebar */}
      <aside className={`mobile-sidebar ${isMenuOpen ? "active" : ""}`}>
        <div className="sidebar-header">
          <span className="logo-text">TD-Store</span>
          <button onClick={() => setIsMenuOpen(false)} className="close-btn">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <form onSubmit={handleSearch} className="mobile-search">
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
            <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)}>
              {link.name}
            </Link>
          ))}
          
          <hr className="sidebar-divider" />

          {/* Mobile Auth Toggle */}
          {user ? (
            <div className="mobile-user-actions">
              {/* <Link to="/profile" onClick={() => setIsMenuOpen(false)}>My Profile</Link>
              <Link to="/orders" onClick={() => setIsMenuOpen(false)}>My Orders</Link> */}
              <button 
                onClick={() => { onLogout(); setIsMenuOpen(false); }} 
                className="mobile-logout-btn"
              >
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
