// import React, { useMemo } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Home, Search, ShoppingBag, Heart, User } from 'lucide-react';
// import { useApp } from '../contexts/AppContext';
// import '../css/BottomNav.css';

// const BottomNav = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { cartItems, favorites } = useApp();

//   const totalCartCount = useMemo(() => {
//     return cartItems.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
//   }, [cartItems]);

//   const navItems = [
//     { icon: <Home size={22} />, label: 'Home', path: '/' },
//     { icon: <Search size={22} />, label: 'Explore', path: '/products' },
//     { 
//       icon: <ShoppingBag size={22} />, 
//       label: 'Cart', 
//       path: '/cart', 
//       count: totalCartCount 
//     },
//     { 
//       icon: <Heart size={22} />, 
//       label: 'Saved', 
//       path: '/profile', 
//       count: favorites.length 
//     },
//     { icon: <User size={22} />, label: 'Profile', path: '/profile' },
//   ];

//   return (
//     <div className="bottom-nav">
//       {navItems.map((item) => (
//         <div
//           key={item.path}
//           className={`bottom-nav-item ${location.pathname === item.path ? 'active' : ''}`}
//           onClick={() => navigate(item.path)}
//         >
//           <div className="nav-icon-container">
//             {item.icon}
//             {item.count > 0 && <span className="nav-count-dot">{item.count}</span>}
//           </div>
//           <span>{item.label}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BottomNav;

import React, { useMemo, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Home, Search, ShoppingBag, Heart, User, Layers, Phone, Info, Plus } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import gsap from 'gsap';
import '../css/BottomNav.css';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, favorites } = useApp();

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
  }, [cartItems]);

  const navItems = [
    { icon: <Home size={22} />, label: 'Home', path: '/' },
    { 
      icon: <Search size={22} />, 
      label: 'Explore', 
      path: '/products',
      hasSubmenu: true 
    },
    { 
      icon: <ShoppingBag size={22} />, 
      label: 'Cart', 
      path: '/cart', 
      count: totalCartCount 
    },
    { 
      icon: <Heart size={22} />, 
      label: 'Saved', 
      path: '/favorites', 
      count: favorites.length 
    },
    { icon: <User size={22} />, label: 'Profile', path: '/profile' },
  ];

  const handleMouseEnter = () => {
    gsap.to(".flyout-link", {
      x: 0,
      opacity: 1,
      stagger: 0.05,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(".flyout-link", {
      x: -10,
      opacity: 0,
      duration: 0.2
    });
  };

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <div
          key={item.label}
          className={`bottom-nav-item ${location.pathname === item.path ? 'active' : ''} ${item.hasSubmenu ? 'has-explore' : ''}`}
          onClick={() => !item.hasSubmenu && navigate(item.path)}
          onMouseEnter={item.hasSubmenu ? handleMouseEnter : null}
          onMouseLeave={item.hasSubmenu ? handleMouseLeave : null}
        >
          <div className="nav-icon-container">
            {item.icon}
            {item.count > 0 && <span className="nav-count-dot">{item.count}</span>}
          </div>
          <span className="nav-label-wrapper">
            {item.label}
            {item.hasSubmenu && <Plus size={10} strokeWidth={3} className="label-plus" />}
          </span>

          {item.hasSubmenu && (
            <div className="explore-flyout">
              <Link to="/categories" className="flyout-link">
                <Layers size={16} /> Collection
              </Link>
              <Link to="/about" className="flyout-link">
                <Info size={16} /> About
              </Link>
              <Link to="/contact" className="flyout-link">
                <Phone size={16} /> Contact
              </Link>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default BottomNav;